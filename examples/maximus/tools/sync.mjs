import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, version as esbuildVersion } from 'esbuild';
import { components, styleImports } from './selection.mjs';
import { pullComponents } from './pull.mjs';
import { writeSnapshot } from './snapshot.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..');
const skill = path.join(repo, 'examples/maximus/package');
const sourceArg = process.argv.indexOf('--source');
if (sourceArg === -1 || !process.argv[sourceArg + 1]) {
  throw new Error('Usage: pnpm run maximus:sync --source <maximus-repository> [--pull | --check]');
}
const source = path.resolve(process.argv[sourceArg + 1]);
const frontend = path.join(source, 'frontend');
const check = process.argv.includes('--check');
if (process.argv.includes('--pull')) {
  if (check) {
    throw new Error('--check is read-only and cannot be combined with --pull');
  }
  pullComponents(source);
}
const read = async (file) => (await readFile(file, 'utf8')).replace(/\r\n?/g, '\n');
const hash = (data) => createHash('sha256').update(data).digest('hex');
const json = (data) => JSON.stringify(data, null, 2) + '\n';
const slash = (value) => value.replaceAll('\\', '/');
const cell = (value = '') => String(value).replaceAll('|', '\\|').replaceAll('\n', ' ');
const commit = execFileSync('git', ['rev-parse', 'HEAD'], { cwd: source, encoding: 'utf8' }).trim();

// A browser asset is built from real imports. No component source is reimplemented.
const entry = [
  ...components.map(({ file }) => `import ${JSON.stringify('./' + file)};`),
  ...styleImports.map(([name, file]) => `import { ${name} } from ${JSON.stringify('./' + file)};`),
  `const style = document.createElement('style');`,
  `style.dataset.maximusUi = 'snapshot';`,
  `style.textContent = [${styleImports.map(([name]) => name).join(',')}].map(value => value.cssText).join(${JSON.stringify('\n')});`,
  'document.head.append(style);',
  `globalThis.MAXIMUS_UI_SNAPSHOT = Object.freeze(${JSON.stringify({ commit, tags: components.map(({ tag }) => tag) })});`,
].join('\n');
const compiled = await build({
  stdin: {
    contents: entry,
    resolveDir: frontend,
    sourcefile: 'maximus-preview-entry.ts',
    loader: 'ts',
  },
  absWorkingDir: frontend,
  tsconfig: path.join(frontend, 'tsconfig.json'),
  nodePaths: [path.join(frontend, 'node_modules')],
  bundle: true,
  write: false,
  minify: true,
  format: 'iife',
  platform: 'browser',
  target: 'es2022',
  charset: 'utf8',
  legalComments: 'eof',
  metafile: true,
  banner: { js: `/* Generated from Maximus ${commit}. Do not edit. */` },
});
const runtime = compiled.outputFiles[0].text;
const files = new Map();
const workflow = await read(path.join(repo, 'skills/compose-components/SKILL.md'));
files.set('SKILL.md', workflow.replace(/^name: compose-components$/m, 'name: maximus-compose'));
files.set('assets/ui.js', runtime);

// Keep the source folder structure so relative imports and aliases remain discoverable.
const buildInputs = Object.keys(compiled.metafile.inputs).filter(
  (file) => file !== 'maximus-preview-entry.ts',
);
const localInputs = buildInputs.filter((file) => !slash(file).split('/').includes('node_modules'));
const sourceFiles = [...new Set([...localInputs, 'src/style.css', 'tsconfig.json'])].sort();
for (const file of sourceFiles) {
  const relative = slash(path.relative(frontend, path.resolve(frontend, file)));
  if (relative.startsWith('../') || path.isAbsolute(relative)) {
    throw new Error(`Local dependency is outside the frontend snapshot: ${file}`);
  }
  files.set(`components/${relative}`, await read(path.join(frontend, file)));
}
for (const { file } of components) {
  if (!files.has(`components/${file}`)) {
    throw new Error(`Missing selected component source: ${file}`);
  }
}
files.set(
  'components/INDEX.md',
  [
    '# Maximus components',
    '',
    `Source snapshot: \`${commit.slice(0, 12)}\`. Read only the components you need.`,
    '',
    ...components.map(({ tag, file, purpose }) => {
      const lines = files.get(`components/${file}`).trimEnd().split('\n').length;
      return `- [${tag}](${file}) - ${purpose} (${lines} lines)`;
    }),
    '',
    'Small component: read its source. Large component: first locate public properties, types, slots and events; read implementation details only when needed.',
    'Follow local imports here. TypeScript aliases are recorded in [tsconfig.json](tsconfig.json). Third-party packages are bundled for the browser and are not copied as source.',
    '[Design foundations](../references/DESIGN.md) gives a short token overview. Layouts remain open-ended.',
    '',
  ].join('\n'),
);

// Export the original token contract, independent of any example composition.
const sourceCss = await read(path.join(frontend, 'src/style.css'));
const rootMatch = /:root\s*\{([\s\S]*?)\r?\n\}/.exec(sourceCss);
if (!rootMatch) {
  throw new Error('Expected one top-level :root token block in src/style.css');
}
const rootBody = rootMatch[1].replace(/\/\*[\s\S]*?\*\//g, '');
const declarations = [...rootBody.matchAll(/([\w-]+)\s*:\s*([^;]+);/g)].map((match) => [
  match[1],
  match[2].trim(),
]);
const sourceTokens = new Map(declarations.filter(([name]) => name.startsWith('--')));
files.set(
  'assets/tokens.css',
  [
    `/* Original Maximus :root contract at ${commit.slice(0, 12)}. Do not edit. */`,
    rootMatch[0],
    '',
  ].join('\n'),
);
files.set(
  'references/DESIGN.md',
  [
    '# Maximus UI foundations',
    '',
    `Generated from \`frontend/src/style.css\` at \`${commit.slice(0, 12)}\`.`,
    '',
    'Use the original runtime and its source tokens. Component appearance is supplied by the library; author only surrounding layout CSS. System font fallbacks remain available; webfont binaries are not included in this PoC.',
    '',
    '| Source token | Value |',
    '| --- | --- |',
    ...[
      '--color-background',
      '--color-panel',
      '--color-text',
      '--color-muted',
      '--color-accent',
      '--font-sans',
      '--font-size-body',
      '--font-size-page-title',
      '--radius-control',
      '--radius-pill',
    ].map((name) => `| ${name} | ${cell(sourceTokens.get(name))} |`),
    '',
    'tokens.css contains the original :root contract so free compositions can use any source token. Keep it together with the matching component build. Layout wrappers and slotted content may be freely composed; rendered component internals are owned by Lit.',
    '',
  ].join('\n'),
);

// Track contributing dependencies and all application inputs. Exclude thousands
// of unused Lucide exports; changes to resolution still change the rebuilt asset.
const contributing = new Set(
  Object.values(compiled.metafile.outputs).flatMap((output) =>
    Object.entries(output.inputs)
      .filter(([, input]) => input.bytesInOutput > 0)
      .map(([file]) => file),
  ),
);
const inputPaths = Object.keys(compiled.metafile.inputs).filter(
  (file) =>
    file !== 'maximus-preview-entry.ts' &&
    (!file.includes('node_modules') || contributing.has(file)),
);
const inputs = await Promise.all(
  [...new Set([...inputPaths, 'src/style.css', 'tsconfig.json', 'package.json'])]
    .sort()
    .map(async (file) => {
      const absolute = path.resolve(frontend, file);
      return { path: slash(path.relative(source, absolute)), sha256: hash(await read(absolute)) };
    }),
);
const dependencies = {};
for (const name of ['lit', 'lucide']) {
  dependencies[name] = JSON.parse(
    await read(path.join(frontend, 'node_modules', name, 'package.json')),
  ).version;
}
const exporterInputs = {};
for (const file of [
  'examples/maximus/tools/sync.mjs',
  'examples/maximus/tools/pull.mjs',
  'examples/maximus/tools/snapshot.mjs',
  'examples/maximus/tools/selection.mjs',
  'skills/compose-components/SKILL.md',
  'pnpm-lock.yaml',
]) {
  exporterInputs[file] = hash(await readFile(path.join(repo, file)));
}
files.set(
  'source-lock.json',
  json({
    source: 'maximus-trading',
    commit,
    textEncoding: 'utf8-lf',
    dependencies,
    tools: { esbuild: esbuildVersion },
    exporterInputs,
    inputs,
    outputs: Object.fromEntries([...files].map(([file, content]) => [file, hash(content)])),
  }),
);

const { changed, removed } = await writeSnapshot(skill, files, { check });
if (check && (changed.length || removed.length)) {
  console.error(
    `Snapshot drift; run maximus:sync for an intentional refresh:\n${[
      ...changed,
      ...removed.map((file) => `remove ${file}`),
    ].join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `${check ? 'Verified' : 'Synced'} ${components.length} components, ${sourceFiles.length} source files, ${sourceTokens.size} source tokens; ${changed.length} changed, ${removed.length} removed.`,
  );
}
