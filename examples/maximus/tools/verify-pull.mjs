import assert from 'node:assert/strict';
import { execFileSync } from 'node:child_process';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { pullComponents } from './pull.mjs';

export async function verifyPull() {
  // All pushes and pulls use this disposable local remote, not the user's repository.
  const { writer, designer } = await createFixture();

  await verifyFastForward(writer, designer);
  await verifyLocalChangesPreserved(designer);
  await verifyDivergedBranchesPreserved(writer, designer);

  console.log('PASS local Git update: fast-forward works; dirty and diverged checkouts preserved');
}

async function createFixture() {
  const root = await mkdtemp(path.join(os.tmpdir(), 'component-pull-'));
  const remote = path.join(root, 'remote.git');
  const writer = path.join(root, 'writer');
  const designer = path.join(root, 'designer');

  git(root, 'init', '--bare', remote);
  git(root, 'clone', remote, writer);
  configureAuthor(writer);

  await writeFile(path.join(writer, '.gitattributes'), '*.txt text eol=lf\n');
  await writeComponent(writer, 'v1');
  git(writer, 'add', '.gitattributes', 'component.txt');
  git(writer, 'commit', '-m', 'Initial component');
  git(writer, 'branch', '-M', 'main');
  git(writer, 'push', '-u', 'origin', 'main');

  git(root, 'clone', '--branch', 'main', remote, designer);
  configureAuthor(designer);

  return { writer, designer };
}

async function verifyFastForward(writer, designer) {
  await commitComponent(writer, 'v2', 'Update component');
  git(writer, 'push');

  pullComponents(designer);

  assert.equal(await readComponent(designer), 'v2\n');
}

async function verifyLocalChangesPreserved(designer) {
  await writeComponent(designer, 'local edit');

  assert.throws(() => pullComponents(designer), /local changes/);
  assert.equal(await readComponent(designer), 'local edit\n');
}

async function verifyDivergedBranchesPreserved(writer, designer) {
  await commitComponent(designer, 'local branch', 'Local component change');
  await commitComponent(writer, 'v3', 'Remote component change');
  git(writer, 'push');

  const localHead = git(designer, 'rev-parse', 'HEAD');

  assert.throws(() => pullComponents(designer));
  assert.equal(git(designer, 'rev-parse', 'HEAD'), localHead);
  assert.equal(await readComponent(designer), 'local branch\n');
}

async function commitComponent(repository, content, message) {
  await writeComponent(repository, content);
  git(repository, 'commit', '-am', message);
}

function configureAuthor(repository) {
  git(repository, 'config', 'user.name', 'Component fixture');
  git(repository, 'config', 'user.email', 'fixture@example.invalid');
}

function writeComponent(repository, content) {
  return writeFile(path.join(repository, 'component.txt'), content + '\n');
}

function readComponent(repository) {
  return readFile(path.join(repository, 'component.txt'), 'utf8');
}

function git(repository, ...args) {
  return execFileSync('git', ['-c', 'commit.gpgsign=false', ...args], {
    cwd: repository,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'pipe'],
  }).trim();
}
