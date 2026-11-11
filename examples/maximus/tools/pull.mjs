import { execFileSync } from 'node:child_process';

export function pullComponents(source) {
  const dirty = execFileSync('git', ['status', '--porcelain', '--untracked-files=no'], {
    cwd: source,
    encoding: 'utf8',
  }).trim();
  if (dirty) {
    throw new Error(
      'Source checkout has local changes. Keep them intact and resolve them before syncing.',
    );
  }
  execFileSync('git', ['pull', '--ff-only'], { cwd: source, stdio: 'inherit' });
}
