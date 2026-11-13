import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export const CONFIG_FILE = 'opendesign.config.json';
export const SNAPSHOT_DIR = 'opendesign';

const NAME = /^[a-z][a-z0-9-]*$/;
const TAG = /^[a-z][a-z0-9]*-[a-z0-9-]*$/;
const SKIPPED_FILE = /\.(test|spec|stories|d)\.[cm]?[jt]sx?$/;
const SOURCE_FILE = /\.[cm]?[jt]sx?$/;
const REGISTRATION =
  /(?:@customElement\(\s*|customElements\.define\(\s*)(['"`])([a-z][a-z0-9]*-[a-z0-9-]*)\1/g;

/**
 * Load a library configuration. Paths in `root` resolve against the source
 * repository; `out` resolves against the configuration file's directory.
 */
export async function loadConfig({ source, config }) {
  const file = path.resolve(config ?? path.join(source, CONFIG_FILE));
  let raw;
  try {
    raw = JSON.parse(await readFile(file, 'utf8'));
  } catch (error) {
    throw new Error(`Cannot read library configuration ${file}: ${error.message}`, {
      cause: error,
    });
  }
  const fail = (message) => {
    throw new Error(`${file}: ${message}`);
  };
  if (!NAME.test(raw.name ?? '')) {
    fail('"name" must be a lowercase identifier such as "acme"');
  }
  for (const key of ['tokens']) {
    if (typeof raw[key] !== 'string') {
      fail(`"${key}" must be a path relative to "root"`);
    }
  }
  if (!(typeof raw.components === 'string' || Array.isArray(raw.components))) {
    fail('"components" must be a component directory or a list of { tag, file, purpose }');
  }
  const root = path.resolve(source, raw.root ?? '.');
  const resolved = {
    file,
    name: raw.name,
    title: raw.title ?? raw.name,
    source,
    root,
    tsconfig: raw.tsconfig ?? 'tsconfig.json',
    tokens: raw.tokens,
    tokenSummary: raw.tokenSummary ?? [],
    styles: Object.entries(raw.styles ?? {}),
    out: path.resolve(path.dirname(file), raw.out ?? SNAPSHOT_DIR),
    components: [],
  };
  if (Array.isArray(raw.components)) {
    resolved.components = raw.components.map((entry) => {
      if (!TAG.test(entry?.tag ?? '') || typeof entry.file !== 'string') {
        fail(`invalid component entry ${JSON.stringify(entry)}`);
      }
      return { tag: entry.tag, file: toPosix(entry.file), purpose: entry.purpose ?? '' };
    });
  } else {
    resolved.components = await discoverComponents(root, raw.components, {
      exclude: [resolved.out],
    });
  }
  if (!resolved.components.length) {
    fail('no components found');
  }
  const tags = resolved.components.map(({ tag }) => tag);
  const duplicate = tags.find((tag, index) => tags.indexOf(tag) !== index);
  if (duplicate) {
    fail(`component tag "${duplicate}" is registered more than once`);
  }
  return resolved;
}

/**
 * Find custom-element registrations in a directory. Tests, stories and type
 * declarations are skipped. A JSDoc `@summary` becomes the index purpose.
 */
export async function discoverComponents(root, directory, { exclude = [] } = {}) {
  const skipped = new Set(exclude.map((dir) => path.resolve(dir)));
  const files = [];
  const walk = async (dir) => {
    for (const entry of await readdir(dir, { withFileTypes: true })) {
      const absolute = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        if (
          entry.name !== 'node_modules' &&
          !entry.name.startsWith('.') &&
          !skipped.has(absolute)
        ) {
          await walk(absolute);
        }
      } else if (entry.isFile() && SOURCE_FILE.test(entry.name) && !SKIPPED_FILE.test(entry.name)) {
        files.push(absolute);
      }
    }
  };
  await walk(path.resolve(root, directory));
  files.sort();
  const components = [];
  for (const absolute of files) {
    const text = await readFile(absolute, 'utf8');
    for (const match of text.matchAll(REGISTRATION)) {
      components.push({
        tag: match[2],
        file: toPosix(path.relative(root, absolute)),
        purpose: summaryBefore(text, match.index),
      });
    }
  }
  return components.sort((a, b) => a.tag.localeCompare(b.tag));
}

function summaryBefore(text, index) {
  const before = text.slice(0, index);
  const start = before.lastIndexOf('/**');
  const end = before.indexOf('*/', start);
  if (start === -1 || end === -1 || before.slice(end + 2).trim()) {
    return '';
  }
  const summary = before.slice(start + 3, end).match(/@summary\s+([^@]*)/);
  return summary ? summary[1].replace(/\s*\*\s*/g, ' ').trim() : '';
}

export const toPosix = (value) => value.replaceAll('\\', '/');
