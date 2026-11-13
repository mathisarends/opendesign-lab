import assert from 'node:assert/strict';
import { access, readFile, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import test from 'node:test';
import { discoverComponents } from '../exporter/config.mjs';
import { writeSnapshot } from '../exporter/snapshot.mjs';
import { extractTokens } from '../exporter/tokens.mjs';
import { library, temp, write } from './fixture.mjs';

test('extracts :root rules, theme variants and media-wrapped tokens only', () => {
  const css = [
    '/* tokens { not a rule } */',
    ':root {',
    '  --space: 4px; /* } */',
    "  --font: 'A}B', sans-serif;",
    '}',
    ':root[data-theme="light"] { --color: #fff; }',
    '@media (prefers-color-scheme: light) {',
    '  :root { --color: #eee; }',
    '  .card { color: red; }',
    '}',
    'body { margin: 0; }',
  ].join('\n');
  const { css: out, tokens } = extractTokens(css);

  assert.match(out, /--space: 4px/);
  assert.match(out, /:root\[data-theme="light"\]/);
  assert.match(
    out,
    /@media \(prefers-color-scheme: light\) \{\n {2}:root \{ --color: #eee; \}\n\}/,
  );
  assert.doesNotMatch(out, /\.card|body/);
  assert.deepEqual(
    [...tokens],
    [
      ['--space', '4px'],
      ['--font', "'A}B', sans-serif"],
      ['--color', '#fff'],
    ],
  );
});

test('discovers registered elements and skips tests, stories and the output folder', async () => {
  const root = await temp('discover');
  await write(root, {
    ...library(),
    'src/ui/card.stories.ts': `customElements.define('story-card', class {});\n`,
    'src/ui/lit.ts': `@customElement("lit-card")\nexport class Card {}\n`,
    'src/ui/out/copy.ts': `customElements.define('demo-button', class {});\n`,
  });

  const found = await discoverComponents(root, 'src/ui', {
    exclude: [path.join(root, 'src/ui/out')],
  });

  assert.deepEqual(found, [
    { tag: 'demo-button', file: 'src/ui/button.ts', purpose: '' },
    { tag: 'demo-field', file: 'src/ui/field/field.ts', purpose: '' },
    { tag: 'lit-card', file: 'src/ui/lit.ts', purpose: '' },
  ]);
});

test('reads a JSDoc @summary directly above the registration', async () => {
  const root = await temp('summary');
  await write(root, {
    'ui/a.ts':
      '/**\n * Long text.\n * @summary Compact action\n *   button\n */\n@customElement("x-a")\nclass A {}\n',
  });
  const [component] = await discoverComponents(root, 'ui');
  assert.equal(component.purpose, 'Compact action button');
});

test('snapshot writer: read-only check, obsolete files removed, user files kept, paths bounded', async () => {
  const root = await temp('snapshot');
  const current = 'components/src/current.ts';
  const obsolete = ['references/old-api.md', 'components/src/removed.ts'];
  await writeSnapshot(
    root,
    snapshot([[current, 'v1\n'], ...obsolete.map((file) => [file, 'old\n'])]),
  );
  await writeFile(path.join(root, 'designer-notes.md'), 'Keep my notes.\n');
  const next = snapshot([
    [current, 'v2\n'],
    ['components/INDEX.md', 'New index\n'],
  ]);

  const checked = await writeSnapshot(root, next, { check: true });
  assert.deepEqual(checked.removed.sort(), obsolete.sort());
  assert.equal(await readFile(path.join(root, current), 'utf8'), 'v1\n');

  await writeSnapshot(root, next);
  assert.equal(await readFile(path.join(root, current), 'utf8'), 'v2\n');
  for (const file of obsolete) {
    await assert.rejects(access(path.join(root, file)), { code: 'ENOENT' });
  }
  assert.equal(await readFile(path.join(root, 'designer-notes.md'), 'utf8'), 'Keep my notes.\n');

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
});

function snapshot(entries) {
  const files = new Map(entries);
  const outputs = Object.fromEntries(
    entries.map(([file, content]) => [file, createHash('sha256').update(content).digest('hex')]),
  );
  files.set('source-lock.json', JSON.stringify({ outputs }));
  return files;
}
