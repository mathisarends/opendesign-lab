import { execFileSync } from 'node:child_process';
import { mkdir, mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

export const temp = (prefix) => mkdtemp(path.join(os.tmpdir(), `opendesign-${prefix}-`));

export async function write(root, files) {
  for (const [file, content] of Object.entries(files)) {
    await mkdir(path.dirname(path.join(root, file)), { recursive: true });
    await writeFile(path.join(root, file), content);
  }
}

export function git(cwd, ...args) {
  return execFileSync('git', ['-c', 'commit.gpgsign=false', ...args], {
    cwd,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}

export function configureAuthor(repository) {
  git(repository, 'config', 'user.name', 'Component fixture');
  git(repository, 'config', 'user.email', 'fixture@example.invalid');
}

/** A small library without third-party dependencies. */
export function library({ label = 'Go' } = {}) {
  const element = (tag, text, tone = './tone') =>
    [
      `import { tone } from '${tone}';`,
      `export class Element extends HTMLElement {`,
      `  connectedCallback() { this.textContent = ${JSON.stringify(text)} + tone; }`,
      `}`,
      `customElements.define('${tag}', Element);`,
      '',
    ].join('\n');
  return {
    'opendesign.config.json': JSON.stringify(
      {
        name: 'demo',
        title: 'Demo',
        components: 'src/ui',
        tokens: 'src/style.css',
        styles: { buttonStyles: 'src/ui/button.styles.ts' },
      },
      null,
      2,
    ),
    'tsconfig.json': '{ "compilerOptions": { "target": "es2022" } }\n',
    'package.json': '{ "name": "demo-app", "private": true }\n',
    'src/style.css': ':root {\n  --color-text: #111;\n}\n\nbody {\n  margin: 0;\n}\n',
    'src/ui/tone.ts': `export const tone = '!';\n`,
    'src/ui/button.ts': element('demo-button', label),
    'src/ui/button.styles.ts': `export const buttonStyles = 'demo-button { display: block; }';\n`,
    'src/ui/button.test.ts': `customElements.define('test-only', class extends HTMLElement {});\n`,
    'src/ui/field/field.ts': element('demo-field', 'Field', '../tone'),
  };
}
