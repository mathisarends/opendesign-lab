import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function writeSnapshot(root, files, { check = false } = {}) {
  const lock = await readOptional(path.join(root, 'source-lock.json'));
  const previous = lock ? Object.keys(JSON.parse(lock).outputs) : [];
  const removed = previous.filter((file) => !files.has(file));
  const changed = [];

  // Validate every path before writing or deleting any generated file.
  const targets = new Map(
    [...new Set([...files.keys(), ...removed])].map((file) => [file, snapshotPath(root, file)]),
  );
  for (const [file, content] of files) {
    if ((await readOptional(targets.get(file))) !== content) {
      changed.push(file);
    }
  }
  if (check) {
    return { changed, removed };
  }

  for (const file of changed.filter((file) => file !== 'source-lock.json')) {
    await mkdir(path.dirname(targets.get(file)), { recursive: true });
    await writeFile(targets.get(file), files.get(file), 'utf8');
  }
  for (const file of removed) {
    await unlink(targets.get(file)).catch((error) => {
      if (error.code !== 'ENOENT') {
        throw error;
      }
    });
  }
  // Record ownership only after the generated files have been refreshed.
  if (changed.includes('source-lock.json')) {
    await mkdir(root, { recursive: true });
    await writeFile(targets.get('source-lock.json'), files.get('source-lock.json'), 'utf8');
  }
  return { changed, removed };
}

function snapshotPath(root, file) {
  if (
    typeof file !== 'string' ||
    path.isAbsolute(file) ||
    /^[A-Za-z]:/.test(file) ||
    file.includes('\\') ||
    file.split('/').some((part) => !part || part === '.' || part === '..')
  ) {
    throw new Error(`Unsafe snapshot path: ${file}`);
  }
  const target = path.resolve(root, file);
  if (!target.startsWith(path.resolve(root) + path.sep)) {
    throw new Error(`Snapshot path escapes its root: ${file}`);
  }
  return target;
}

async function readOptional(file) {
  try {
    return (await readFile(file, 'utf8')).replace(/\r\n?/g, '\n');
  } catch (error) {
    if (error.code === 'ENOENT') {
      return null;
    }
    throw error;
  }
}
