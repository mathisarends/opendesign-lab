import assert from 'node:assert/strict';
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import test from 'node:test';
import vm from 'node:vm';
import { exportLibrary } from '../exporter/export.mjs';
import { library, temp, write } from './fixture.mjs';

test('exports a configured library into the opendesign folder by convention', async () => {
  const source = await temp('export');
  await write(source, library());

  const result = await exportLibrary({ source });
  const out = path.join(source, 'opendesign');
  const read = (file) => readFile(path.join(out, file), 'utf8');

  assert.deepEqual(
    result.config.components.map(({ tag }) => tag),
    ['demo-button', 'demo-field'],
  );
  const lock = JSON.parse(await read('source-lock.json'));
  assert.equal(lock.name, 'demo');
  assert.match(lock.snapshot, /^[0-9a-f]{12}$/);
  assert.deepEqual(lock.components, [
    { tag: 'demo-button', file: 'src/ui/button.ts' },
    { tag: 'demo-field', file: 'src/ui/field/field.ts' },
  ]);
  assert(
    lock.inputs.some(({ path: file }) => file === 'src/ui/tone.ts'),
    'transitive input',
  );

  const skill = await read('SKILL.md');
  assert.match(skill, /^name: demo-compose$/m);
  assert.match(skill, /real Demo components \(demo-button, demo-field\)/);
  const sync = await read('sync/SKILL.md');
  assert.match(sync, /^name: demo-sync$/m);
  assert.match(sync, /node <skill-dir>\/sync.mjs --library demo$/m);
  assert.match(await read('sync/sync.mjs'), /export async function syncComponents/);
  assert(lock.outputs['sync/sync.mjs'], 'the sync script is part of the verified snapshot');
  assert.match(
    await read('components/INDEX.md'),
    /\[demo-button\]\(src\/ui\/button.ts\) \(\d+ lines\)/,
  );
  assert.equal(await read('components/src/ui/tone.ts'), `export const tone = '!';\n`);
  assert.doesNotMatch(await read('assets/tokens.css'), /body/);
  assert.match(await read('assets/tokens.css'), /--color-text: #111;/);

  // The runtime registers the real elements and exposes its snapshot identity.
  const defined = [];
  const head = [];
  const context = {
    HTMLElement: class {},
    customElements: { define: (tag) => defined.push(tag) },
    document: {
      createElement: () => ({ dataset: {} }),
      head: { append: (node) => head.push(node) },
    },
  };
  context.globalThis = context;
  vm.runInNewContext(await read('assets/ui.js'), context);
  assert.deepEqual(defined.sort(), ['demo-button', 'demo-field']);
  assert.equal(head[0].textContent, 'demo-button { display: block; }');
  assert.equal(context.OPENDESIGN_COMPONENTS.snapshot, lock.snapshot);
});

test('check mode is read-only and reports drift; unchanged sources reproduce the snapshot', async () => {
  const source = await temp('drift');
  await write(source, library());
  const first = await exportLibrary({ source });

  const again = await exportLibrary({ source, check: true });
  assert.deepEqual([again.changed, again.removed], [[], []]);
  assert.equal(again.snapshot, first.snapshot);

  const component = path.join(source, 'src/ui/button.ts');
  await writeFile(component, (await readFile(component, 'utf8')).replace('"Go"', '"Start"'));
  const drift = await exportLibrary({ source, check: true });
  assert(drift.changed.includes('components/src/ui/button.ts'));
  assert(drift.changed.includes('assets/ui.js'));
  assert.notEqual(drift.snapshot, first.snapshot);
  const copied = await readFile(
    path.join(source, 'opendesign/components/src/ui/button.ts'),
    'utf8',
  );
  assert.match(copied, /"Go"/, 'check must not write');
});

test('removes generated files that left the library and keeps user files', async () => {
  const source = await temp('cleanup');
  await write(source, library());
  await exportLibrary({ source });
  await write(source, { 'opendesign/notes.md': 'Keep me.\n' });

  const config = JSON.parse(await readFile(path.join(source, 'opendesign.config.json'), 'utf8'));
  config.components = [{ tag: 'demo-button', file: 'src/ui/button.ts' }];
  await write(source, { 'opendesign.config.json': JSON.stringify(config) });
  const result = await exportLibrary({ source });

  assert(result.removed.includes('components/src/ui/field/field.ts'));
  assert.equal(await readFile(path.join(source, 'opendesign/notes.md'), 'utf8'), 'Keep me.\n');
});

test('rejects an output folder that would contain the source', async () => {
  const source = await temp('unsafe-out');
  await write(source, library());
  const config = JSON.parse(await readFile(path.join(source, 'opendesign.config.json'), 'utf8'));
  await write(source, { 'opendesign.config.json': JSON.stringify({ ...config, out: '.' }) });

  await assert.rejects(exportLibrary({ source }), /dedicated folder/);
});
