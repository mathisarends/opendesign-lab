import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { access, mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { writeSnapshot } from './snapshot.mjs';

export async function verifySnapshotLifecycle() {
  const root = await mkdtemp(path.join(os.tmpdir(), 'component-snapshot-'));
  const current = 'components/src/current.ts';
  const obsolete = ['references/old-api.md', 'components/src/removed.ts'];
  const initial = snapshot([[current, 'v1\n'], ...obsolete.map((file) => [file, 'old\n'])]);
  await writeSnapshot(root, initial);
  await writeFile(path.join(root, 'designer-notes.md'), 'Keep my notes.\n');

  const next = snapshot([
    [current, 'v2\n'],
    ['components/INDEX.md', 'New index\n'],
  ]);
  await verifyReadOnlyCheck(root, next, current, obsolete);
  await verifyCleanup(root, next, current, obsolete);
  await verifyPathBoundary(root);

  console.log(
    'PASS snapshot cleanup: read-only checks, obsolete generated files removed, user files preserved',
  );
}

async function verifyReadOnlyCheck(root, next, current, obsolete) {
  const result = await writeSnapshot(root, next, { check: true });

  assert.deepEqual(result.removed.sort(), obsolete.sort());
  assert(result.changed.includes(current));
  assert.equal(await readFile(path.join(root, current), 'utf8'), 'v1\n');
  for (const file of obsolete) {
    assert.equal(await readFile(path.join(root, file), 'utf8'), 'old\n');
  }
  await assert.rejects(access(path.join(root, 'components/INDEX.md')), { code: 'ENOENT' });
}

async function verifyCleanup(root, next, current, obsolete) {
  await writeSnapshot(root, next);

  assert.equal(await readFile(path.join(root, current), 'utf8'), 'v2\n');
  for (const file of obsolete) {
    await assert.rejects(access(path.join(root, file)), { code: 'ENOENT' });
  }
  assert.equal(await readFile(path.join(root, 'designer-notes.md'), 'utf8'), 'Keep my notes.\n');
  assert.deepEqual(await writeSnapshot(root, next, { check: true }), { changed: [], removed: [] });
}

async function verifyPathBoundary(root) {
  // Even stale paths from a malformed ownership manifest must stay inside the snapshot.
  await writeFile(
    path.join(root, 'source-lock.json'),
    JSON.stringify({ outputs: { '../outside.ts': 'hash' } }),
  );

  await assert.rejects(
    writeSnapshot(root, new Map([['components/INDEX.md', 'replace']])),
    /Unsafe snapshot path/,
  );
  assert.equal(await readFile(path.join(root, 'components/INDEX.md'), 'utf8'), 'New index\n');
}

function snapshot(entries) {
  const files = new Map(entries);
  const outputs = Object.fromEntries(
    entries.map(([file, content]) => [file, createHash('sha256').update(content).digest('hex')]),
  );
  files.set('source-lock.json', JSON.stringify({ outputs }));
  return files;
}
