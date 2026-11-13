import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { cp, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import { exportLibrary } from '../exporter/export.mjs';
import {
  SyncError,
  linksFile,
  summarize,
  syncComponents,
} from '../skills/sync-components/sync.mjs';
import { configureAuthor, git, library, temp, write } from './fixture.mjs';

// All pushes and pulls use a disposable local remote, never the user's repository.
// Remembered checkout paths go to a temporary file, never the user's profile.
async function setup() {
  const root = await temp('sync');
  process.env.OPENDESIGN_COMPONENTS_LINKS = path.join(root, 'links', 'sources.json');
  const remote = path.join(root, 'remote.git');
  const developer = path.join(root, 'developer');
  const designer = path.join(root, 'designer');
  git(root, 'init', '--bare', remote);
  git(root, 'clone', remote, developer);
  configureAuthor(developer);
  await write(developer, library());
  await publish(developer, 'Initial components');
  git(root, 'clone', remote, designer);
  configureAuthor(designer);
  return { root, developer, designer };
}

// Runs the copy of the sync script that ships inside the package, as OpenDesign would.
function runSync(script, ...args) {
  return spawnSync(process.execPath, [script, '--library', 'demo', ...args], {
    encoding: 'utf8',
    env: { ...process.env },
  });
}

async function publish(developer, message, { exportSnapshot = true } = {}) {
  if (exportSnapshot) {
    await exportLibrary({ source: developer });
  }
  git(developer, 'add', '-A');
  git(developer, 'commit', '-m', message);
  git(developer, 'push', 'origin', 'HEAD');
}

async function edit(repository, file, from, to) {
  const target = path.join(repository, file);
  await writeFile(target, (await readFile(target, 'utf8')).replace(from, to));
}

test('fast-forwards, verifies the committed snapshot and reports changed components', async () => {
  const { developer, designer } = await setup();

  const first = await syncComponents({ source: designer });
  assert.equal(first.before, first.after);
  assert.deepEqual(first.components, ['demo-button', 'demo-field']);
  assert.deepEqual(first.stale, []);
  assert.match(summarize(first), /already up to date/);

  await edit(developer, 'src/ui/button.ts', '"Go"', '"Start"');
  await publish(developer, 'Rename button');
  const second = await syncComponents({ source: designer });

  assert.notEqual(second.before, second.after);
  assert.deepEqual(second.changes.changed, ['demo-button']);
  assert.match(summarize(second), /changed demo-button/);
  const copied = await readFile(
    path.join(designer, 'opendesign/components/src/ui/button.ts'),
    'utf8',
  );
  assert.match(copied, /"Start"/);
});

test('stops on local changes and diverged history without touching them', async () => {
  const { developer, designer } = await setup();
  await edit(designer, 'src/ui/tone.ts', '!', '?');

  await assert.rejects(syncComponents({ source: designer }), /local changes/);
  assert.match(await readFile(path.join(designer, 'src/ui/tone.ts'), 'utf8'), /\?/);

  git(designer, 'commit', '-am', 'Local tone');
  await edit(developer, 'src/ui/tone.ts', '!', '.');
  await publish(developer, 'Remote tone');
  const head = git(designer, 'rev-parse', 'HEAD');

  await assert.rejects(syncComponents({ source: designer }), SyncError);
  assert.equal(git(designer, 'rev-parse', 'HEAD'), head);
});

test('rejects an incomplete snapshot and warns about a stale one', async () => {
  const { developer, designer } = await setup();

  // Source changed without a new export: components still match each other.
  await edit(developer, 'src/ui/tone.ts', '!', '.');
  await publish(developer, 'Forgot to export', { exportSnapshot: false });
  const stale = await syncComponents({ source: designer });
  assert.deepEqual(stale.stale, ['src/ui/tone.ts']);
  assert.match(summarize(stale), /older than the source/);

  // A snapshot file that differs from its lock must not be used.
  await edit(developer, 'opendesign/components/src/ui/tone.ts', "'!'", "'?'");
  await publish(developer, 'Hand-edited snapshot', { exportSnapshot: false });
  await assert.rejects(
    syncComponents({ source: designer }),
    /do not match[\s\S]*components\/src\/ui\/tone.ts/,
  );
});

test('explains a missing snapshot folder', async () => {
  const { designer } = await setup();
  await assert.rejects(
    syncComponents({ source: designer, snapshot: 'missing', pull: false }),
    /No component snapshot at missing\/source-lock.json/,
  );
});

test('asks for the checkout once, then remembers it per library', async () => {
  const { root, designer } = await setup();
  // A staged copy of the skill does not know where the checkout is.
  const staged = path.join(root, 'staged-skill');
  await cp(path.join(designer, 'opendesign/sync'), staged, { recursive: true });
  const script = path.join(staged, 'sync.mjs');

  const unknown = runSync(script);
  assert.equal(unknown.status, 3);
  assert.match(unknown.stderr, /NOT_LINKED/);

  const first = runSync(script, '--source', designer);
  assert.equal(first.status, 0, first.stderr);
  assert.match(first.stdout, /demo snapshot [0-9a-f]{12}: 2 components/);
  const links = JSON.parse(await readFile(linksFile(), 'utf8'));
  assert.equal(path.resolve(links.demo), path.resolve(designer));

  const later = runSync(script);
  assert.equal(later.status, 0, later.stderr);
  assert.match(later.stdout, /already up to date/);
});

test('finds its checkout when run from the installed folder, and rejects a wrong library', async () => {
  const { designer } = await setup();
  const installed = runSync(path.join(designer, 'opendesign/sync/sync.mjs'));
  assert.equal(installed.status, 0, installed.stderr);

  await assert.rejects(
    syncComponents({ source: designer, library: 'other', pull: false }),
    /contains the "demo" components, not "other"/,
  );
});
