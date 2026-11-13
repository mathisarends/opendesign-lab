#!/usr/bin/env node
// Designer-side sync. Pulls a private source checkout and verifies the
// component snapshot that the developer committed under `opendesign/`.
// Uses only Node built-ins: no lab checkout, build tools or dependencies.
// The checkout path is asked once and remembered per library on this machine.
import { execFileSync } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const SNAPSHOT_DIR = 'opendesign';
export const LOCK_FILE = 'source-lock.json';

/**
 * Find the checkout for a library: an explicit path, the remembered link, or
 * the checkout this script was installed from. Returns null when unknown.
 */
export async function resolveSource({ library, source, scriptDir }) {
  if (source) {
    return { source: path.resolve(source), remember: true };
  }
  const linked = library ? (await readLinks())[library] : undefined;
  if (linked) {
    return { source: linked, remember: false };
  }
  // Run from `<checkout>/opendesign/sync/` rather than a staged copy.
  if (scriptDir && (await readText(path.join(scriptDir, '..', LOCK_FILE))) !== null) {
    return { source: path.resolve(scriptDir, '..', '..'), remember: true };
  }
  return null;
}

export async function syncComponents({
  source,
  library,
  remember = false,
  snapshot = SNAPSHOT_DIR,
  pull = true,
}) {
  const checkout = git(source, 'rev-parse', '--show-toplevel');
  const dirty = git(checkout, 'status', '--porcelain', '--untracked-files=no');
  if (dirty) {
    throw new SyncError(
      'Source checkout has local changes. Keep them intact and resolve them before syncing.',
    );
  }
  const before = git(checkout, 'rev-parse', 'HEAD');
  if (pull) {
    try {
      execFileSync('git', ['pull', '--ff-only'], {
        cwd: checkout,
        stdio: ['ignore', 'ignore', 'pipe'],
        encoding: 'utf8',
      });
    } catch (error) {
      throw new SyncError(
        `git pull --ff-only failed; the checkout was left unchanged.\n${error.stderr ?? error.message}`.trim(),
      );
    }
  }
  const after = git(checkout, 'rev-parse', 'HEAD');
  const folder = path.join(checkout, snapshot);
  const lock = await readLock(path.join(folder, LOCK_FILE));
  if (!lock) {
    throw new SyncError(
      `No component snapshot at ${snapshot}/${LOCK_FILE}. The developer exports it with OpenDesign Lab.`,
    );
  }
  if (library && lock.name !== library) {
    throw new SyncError(
      `${checkout} contains the "${lock.name}" components, not "${library}". Check the path.`,
    );
  }
  if (remember && lock.name) {
    await saveLink(lock.name, checkout);
  }

  // Source and runtime must come from the same export.
  const corrupt = [];
  for (const [file, expected] of Object.entries(lock.outputs ?? {})) {
    const content = await readText(path.join(folder, safe(file)));
    if (content === null || hash(content) !== expected) {
      corrupt.push(file);
    }
  }
  if (corrupt.length) {
    throw new SyncError(
      `Snapshot files do not match ${snapshot}/${LOCK_FILE}; ask the developer to re-export:\n${corrupt.join('\n')}`,
    );
  }

  // Inputs outside node_modules can be compared without installing anything.
  const stale = [];
  for (const { path: file, sha256 } of lock.inputs ?? []) {
    if (file.split('/').includes('node_modules')) {
      continue;
    }
    const content = await readText(path.join(checkout, safe(file)));
    if (content === null || hash(content) !== sha256) {
      stale.push(file);
    }
  }

  const previous = before === after ? lock : await lockAt(checkout, before, snapshot);
  return {
    name: lock.name,
    snapshot: lock.snapshot,
    before,
    after,
    components: lock.components?.map(({ tag }) => tag) ?? [],
    changes: compare(previous, lock),
    stale,
  };
}

function compare(previous, current) {
  const tags = (lock) => new Map((lock?.components ?? []).map((entry) => [entry.tag, entry.file]));
  const sources = (lock) =>
    new Map((lock?.inputs ?? []).map(({ path: file, sha256 }) => [file, sha256]));
  const [oldTags, newTags] = [tags(previous), tags(current)];
  const [oldSources, newSources] = [sources(previous), sources(current)];
  const added = [...newTags.keys()].filter((tag) => !oldTags.has(tag));
  const removed = [...oldTags.keys()].filter((tag) => !newTags.has(tag));
  const changed = [...newTags]
    .filter(([tag]) => oldTags.has(tag))
    .filter(([, file]) => oldSources.get(file) !== newSources.get(file))
    .map(([tag]) => tag);
  const runtimeChanged = previous?.outputs?.['assets/ui.js'] !== current.outputs?.['assets/ui.js'];
  return { added, removed, changed, runtimeChanged, firstSync: !previous };
}

async function lockAt(checkout, revision, snapshot) {
  try {
    return JSON.parse(git(checkout, 'show', `${revision}:${snapshot}/${LOCK_FILE}`));
  } catch {
    return null;
  }
}

async function readLock(file) {
  const text = await readText(file);
  return text === null ? null : JSON.parse(text);
}

async function readText(file) {
  try {
    return (await readFile(file, 'utf8')).replace(/\r\n?/g, '\n');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}

function safe(file) {
  if (
    typeof file !== 'string' ||
    path.isAbsolute(file) ||
    /^[A-Za-z]:/.test(file) ||
    file.includes('\\') ||
    file.split('/').some((part) => !part || part === '.' || part === '..')
  ) {
    throw new SyncError(`Unsafe path in snapshot lock: ${file}`);
  }
  return file;
}

function git(cwd, ...args) {
  try {
    return execFileSync('git', args, {
      cwd,
      encoding: 'utf8',
      stdio: ['ignore', 'pipe', 'pipe'],
    }).trim();
  } catch (error) {
    throw new SyncError(
      `git ${args[0]} failed in ${cwd}: ${(error.stderr ?? error.message).trim()}`,
    );
  }
}

/** Machine-specific checkout paths, kept outside every repository. */
export function linksFile() {
  if (process.env.OPENDESIGN_COMPONENTS_LINKS) {
    return process.env.OPENDESIGN_COMPONENTS_LINKS;
  }
  const home = os.homedir();
  const base =
    process.platform === 'win32'
      ? (process.env.APPDATA ?? path.join(home, 'AppData', 'Roaming'))
      : process.platform === 'darwin'
        ? path.join(home, 'Library', 'Application Support')
        : (process.env.XDG_CONFIG_HOME ?? path.join(home, '.config'));
  return path.join(base, 'opendesign-components', 'sources.json');
}

async function readLinks() {
  const text = await readText(linksFile());
  return text === null ? {} : JSON.parse(text);
}

async function saveLink(library, checkout) {
  const links = await readLinks();
  if (links[library] === checkout) {
    return;
  }
  links[library] = checkout;
  await mkdir(path.dirname(linksFile()), { recursive: true });
  await writeFile(linksFile(), JSON.stringify(links, null, 2) + '\n');
}

const hash = (data) => createHash('sha256').update(data).digest('hex');

export class SyncError extends Error {}

export function summarize(result) {
  const short = (revision) => revision.slice(0, 7);
  const { changes } = result;
  const lines = [
    result.before === result.after
      ? `Source already up to date at ${short(result.after)}.`
      : `Source updated ${short(result.before)} -> ${short(result.after)}.`,
    `${result.name} snapshot ${result.snapshot}: ${result.components.length} components.`,
  ];
  if (!changes.firstSync) {
    const parts = [
      changes.added.length && `added ${changes.added.join(', ')}`,
      changes.removed.length && `removed ${changes.removed.join(', ')}`,
      changes.changed.length && `changed ${changes.changed.join(', ')}`,
    ].filter(Boolean);
    lines.push(
      parts.length
        ? `Components: ${parts.join('; ')}.`
        : changes.runtimeChanged
          ? 'Component sources unchanged; runtime rebuilt.'
          : 'No component changes.',
    );
  }
  if (result.stale.length) {
    lines.push(
      `Warning: the snapshot is older than the source (${result.stale.length} input files differ). ` +
        'Ask the developer to re-export it. Source and runtime still match each other.',
    );
  }
  return lines.join('\n');
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const arg = (name) => {
    const at = process.argv.indexOf(name);
    return at === -1 ? undefined : process.argv[at + 1];
  };
  const library = arg('--library');
  try {
    const resolved = await resolveSource({
      library,
      source: arg('--source'),
      scriptDir: path.dirname(fileURLToPath(import.meta.url)),
    });
    if (!resolved) {
      console.error(
        `NOT_LINKED: the ${library ?? 'component'} source checkout is not known on this machine yet. ` +
          'Ask the user once where it is, then rerun with --source <path>; it is remembered afterwards.',
      );
      process.exit(3);
    }
    const result = await syncComponents({
      ...resolved,
      library,
      snapshot: arg('--snapshot') ?? SNAPSHOT_DIR,
      pull: !process.argv.includes('--no-pull'),
    });
    console.log(summarize(result));
  } catch (error) {
    if (!(error instanceof SyncError)) {
      throw error;
    }
    console.error(error.message);
    process.exitCode = 1;
  }
}
