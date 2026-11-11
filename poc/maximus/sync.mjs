import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { readFile, writeFile, mkdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, version as esbuildVersion } from 'esbuild';
import { create, ts } from '@custom-elements-manifest/analyzer';
import { litPlugin } from '@custom-elements-manifest/analyzer/src/features/framework-plugins/lit/lit.js';
import { components, styleImports } from './selection.mjs';
import { pullComponents } from './pull.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const skill = path.join(repo, 'skills/maximus-compose');
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
const modules = await Promise.all(
  components.map(async ({ file }) =>
    ts.createSourceFile(file, await read(path.join(frontend, file)), ts.ScriptTarget.Latest, true),
  ),
);
const manifest = create({ modules, plugins: litPlugin() });
const files = new Map();
files.set('assets/starter/assets/maximus-ui.js', runtime);
files.set('references/custom-elements.json', json(manifest));

for (const component of components) {
  const module = modules.find((item) => item.fileName === component.file);
  const classNode = module.statements.find(
    (item) =>
      ts.isClassDeclaration(item) &&
      item.modifiers?.some(
        (modifier) =>
          ts.isDecorator(modifier) && modifier.expression.getText().startsWith('customElement('),
      ),
  );
  if (!classNode) {
    throw new Error(`No custom element class in ${component.file}`);
  }
  const reactive = new Set(
    classNode.members
      .filter((member) =>
        ts
          .getDecorators(member)
          ?.some((decorator) => decorator.expression.getText().startsWith('property(')),
      )
      .map((member) => member.name.getText()),
  );
  const declaration = manifest.modules
    .flatMap((item) => item.declarations ?? [])
    .find((item) => item.tagName === component.tag);
  if (!declaration) {
    throw new Error(`Analyzer could not find ${component.tag}`);
  }
  const properties = (declaration.members ?? []).filter((member) => reactive.has(member.name));
  if (properties.length !== reactive.size) {
    throw new Error(`Incomplete API extraction for ${component.tag}`);
  }
  const propertyTypes = properties.map((member) => member.type?.text ?? '').join(' ');
  const types = module.statements.filter(
    (item) =>
      (ts.isTypeAliasDeclaration(item) || ts.isInterfaceDeclaration(item)) &&
      new RegExp(`\\b${item.name.text}\\b`).test(propertyTypes),
  );
  const rows = properties.map((member) => {
    const attribute = (declaration.attributes ?? []).find(
      (item) => item.fieldName === member.name || item.name === member.name,
    );
    return `| ${cell(member.name)} | ${cell(attribute?.name ?? 'JS property only')} | ${cell(member.type?.text ?? 'unspecified')} | ${cell(member.default ?? 'unset')} |`;
  });
  files.set(
    `references/${component.tag}.md`,
    [
      `# ${component.tag}`,
      '',
      `Generated from \`frontend/${component.file}\` at \`${commit.slice(0, 12)}\`.`,
      '',
      component.note,
      '',
      '| Property | HTML attribute | Type | Default |',
      '| --- | --- | --- | --- |',
      ...rows,
      '',
      ...(types.length
        ? [
            '## Referenced source types',
            '',
            '```ts',
            ...types.map((item) => item.getText()),
            '```',
            '',
          ]
        : []),
      '## Declared custom events',
      '',
      ...(declaration.events?.length
        ? declaration.events.map(
            (event) => `- \`${event.name}\`: ${event.type?.text ?? 'CustomEvent'}.`,
          )
        : ['None found by the analyzer; native DOM events may still bubble.']),
      '',
    ].join('\n'),
  );
}
files.set(
  'references/INDEX.md',
  [
    '# Maximus components',
    '',
    `Generated from source commit \`${commit.slice(0, 12)}\`. Read only the API file you need.`,
    '',
    '[Design foundations](DESIGN.md) lists the source theme and typography tokens.',
    '',
    ...components.map(({ tag }) => `- [${tag}](${tag}.md)`),
    '',
    'Implementation and styles execute from the bundled runtime. Do not load that bundle or custom-elements.json into the prompt.',
    '',
    'Layout and task flows remain free-form. The starter is one composition, not a mandatory screen layout.',
    '',
  ].join('\n'),
);

// Select source tokens by actual bundle/layout references, then close over aliases.
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
const rootStyles = declarations.filter(([name]) => !name.startsWith('--'));
const layout = await read(path.join(skill, 'assets/starter/layout.css'));
const references = (value) => [...value.matchAll(/var\(\s*(--[\w-]+)/g)].map((match) => match[1]);
const selected = new Set();
function include(name) {
  if (selected.has(name) || !sourceTokens.has(name)) {
    return;
  }
  selected.add(name);
  references(sourceTokens.get(name)).forEach(include);
}
references(runtime + layout + rootStyles.map(([, value]) => value).join('\n')).forEach(include);
files.set(
  'assets/starter/assets/tokens.css',
  [
    `/* Generated subset of Maximus src/style.css at ${commit.slice(0, 12)}. Do not edit. */`,
    ':root {',
    ...declarations
      .filter(([name]) => selected.has(name))
      .map(([name, value]) => `  ${name}: ${value};`),
    ...rootStyles.map(([name, value]) => `  ${name}: ${value};`),
    '}',
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
    'The generated tokens.css also includes the referenced alias dependencies. Keep its values together with the matching component build. Layout wrappers and slotted content may be freely composed; rendered component internals are owned by Lit.',
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
  'poc/maximus/sync.mjs',
  'poc/maximus/pull.mjs',
  'poc/maximus/selection.mjs',
  'pnpm-lock.yaml',
]) {
  exporterInputs[file] = hash(await readFile(path.join(repo, file)));
}
const analyzerPackage = JSON.parse(
  await read(
    new URL('../../node_modules/@custom-elements-manifest/analyzer/package.json', import.meta.url),
  ),
);
files.set(
  'source-lock.json',
  json({
    source: 'maximus-trading',
    commit,
    textEncoding: 'utf8-lf',
    dependencies,
    tools: { esbuild: esbuildVersion, analyzer: analyzerPackage.version },
    exporterInputs,
    inputs,
    outputs: Object.fromEntries([...files].map(([file, content]) => [file, hash(content)])),
  }),
);

const changed = [];
for (const [file, content] of files) {
  const target = path.join(skill, file);
  const existing = await read(target).catch((error) => {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  });
  if (existing === content) {
    continue;
  }
  changed.push(file);
  if (!check) {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, content, 'utf8');
  }
}
if (check && changed.length) {
  console.error(
    `Snapshot drift; run maximus:sync for an intentional refresh:\n${changed.join('\n')}`,
  );
  process.exitCode = 1;
} else {
  console.log(
    `${check ? 'Verified' : 'Synced'} ${components.length} real components, ${selected.size} source tokens, ${inputs.length} tracked inputs; ${changed.length} changed files.`,
  );
}
