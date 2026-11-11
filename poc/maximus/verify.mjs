import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { execFileSync, spawnSync } from 'node:child_process';
import { readFile, writeFile, mkdir, mkdtemp, cp } from 'node:fs/promises';
import path from 'node:path';
import os from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';
import { createHash } from 'node:crypto';
import { verifyPull } from './verify-pull.mjs';

const repo = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const sourceIndex = process.argv.indexOf('--source');
assert(sourceIndex !== -1 && process.argv[sourceIndex + 1], 'Pass --source <maximus-repository>');
const source = path.resolve(process.argv[sourceIndex + 1]);
const requireFromSource = createRequire(path.join(source, 'frontend/package.json'));
const { chromium } = requireFromSource('playwright');
const skill = path.join(repo, 'skills/maximus-compose');
const starter = path.join(skill, 'assets/starter');
const hash = (value) => createHash('sha256').update(value).digest('hex');
const sourceStatus = () =>
  execFileSync('git', ['status', '--porcelain'], { cwd: source, encoding: 'utf8' });
const before = sourceStatus();

await verifyPull();
await verifySnapshot();
await verifyBrowser();

assert.equal(sourceStatus(), before, 'The source repository must remain unchanged');
console.log('PASS source repository unchanged');

async function verifySnapshot() {
  const sync = path.join(repo, 'poc/maximus/sync.mjs');
  const check = () =>
    spawnSync(process.execPath, [sync, '--source', source, '--check'], {
      cwd: repo,
      encoding: 'utf8',
    });
  assert.equal(check().status, 0, 'Snapshot must match source before browser verification');

  // Corrupt generated documentation: check must fail without changing or repairing it.
  const apiPath = path.join(skill, 'references/cta-button.md');
  const originalApi = await readFile(apiPath, 'utf8');
  try {
    const changedApi = originalApi + '\nUnreviewed drift\n';
    await writeFile(apiPath, changedApi);
    const result = check();
    assert.equal(result.status, 1);
    assert(result.stderr.includes('references/cta-button.md'));
    assert.equal(await readFile(apiPath, 'utf8'), changedApi);
  } finally {
    await writeFile(apiPath, originalApi);
  }
  const lock = JSON.parse(await readFile(path.join(skill, 'source-lock.json'), 'utf8'));
  for (const [file, expected] of Object.entries(lock.outputs)) {
    assert.equal(
      hash(await readFile(path.join(skill, file))),
      expected,
      `Output mismatch: ${file}`,
    );
  }
  assert(
    lock.inputs.some(({ path: file }) => file.endsWith('pill-tabs.styles.ts')),
    'Transitive style input must be tracked',
  );
  assert(
    lock.inputs.some(({ path: file }) => file.endsWith('src/shared/i18n/locale.ts')),
    'Transitive behavior input must be tracked',
  );
  console.log(
    'PASS deterministic snapshot and read-only drift detection, including transitive source inputs',
  );
}

async function verifyBrowser() {
  // Stage into a different directory, as an OpenDesign agent run does.
  const staged = await mkdtemp(path.join(os.tmpdir(), 'maximus-composition-'));
  await cp(starter, staged, { recursive: true });
  const executablePath = process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE;
  const browser = await chromium.launch({
    headless: true,
    ...(executablePath ? { executablePath } : {}),
  });
  try {
    const page = await browser.newPage({ viewport: { width: 1100, height: 850 } });
    const errors = [];
    const requests = [];
    page.on('pageerror', (error) => errors.push(error.message));
    page.on('request', (request) => {
      if (/^https?:/.test(request.url())) {
        requests.push(request.url());
      }
    });
    await page.goto(pathToFileURL(path.join(staged, 'index.html')).href);
    await page.waitForFunction(() =>
      window.MAXIMUS_UI_SNAPSHOT?.tags.every((tag) => customElements.get(tag)),
    );
    await verifyForms(page);
    await verifyComponentRendering(page);
    await verifyLayoutPreservation(page, staged);
    await verifyResponsiveLayout(page);
    assert.equal(requests.length, 0, 'The staged prototype must work offline');
    assert.equal(errors.length, 0, errors.join('\n'));
    console.log(
      'PASS real components offline after staging: forms, values, checkbox, tab keyboard navigation, wrapper edit/reload, desktop/mobile',
    );
  } finally {
    await browser.close();
  }
}

async function verifyForms(page) {
  const tabs = page.getByRole('tab', { name: 'Notifications', exact: true });
  const profileTab = page.getByRole('tab', { name: 'Profile', exact: true });
  const name = page.getByRole('textbox', { name: 'Workspace name', exact: true });
  const email = page.getByRole('textbox', { name: 'Email address', exact: true });
  const save = page.getByRole('button', { name: 'Save profile', exact: true });
  await save.click();
  assert.equal(await email.evaluate((input) => input.validity.valid), false);
  await email.fill('designer@example.com');
  await name.fill('Component proof');
  await save.click();
  assert.equal(
    await page.locator('#profile-notice').textContent(),
    'Saved locally for this preview: Component proof.',
  );
  await tabs.click();
  const notifications = page.getByRole('checkbox', {
    name: 'Email me when a workspace update is ready',
    exact: true,
  });
  await notifications.uncheck();
  const savePreferences = page.getByRole('button', { name: 'Save preferences', exact: true });
  await savePreferences.click();
  assert.equal(
    await page.locator('#notification-notice').textContent(),
    'Email updates disabled in this preview.',
  );
  await tabs.press('ArrowLeft');
  assert.equal(await profileTab.getAttribute('aria-selected'), 'true');
  assert.equal(await name.inputValue(), 'Component proof');
}

async function verifyComponentRendering(page) {
  const runtime = await page.evaluate(() => ({
    shadowTabs: Boolean(document.querySelector('pill-tabs').shadowRoot),
    lightInput: document.querySelector('text-input').shadowRoot === null,
    lightButton: document.querySelector('cta-button').shadowRoot === null,
    tags: window.MAXIMUS_UI_SNAPSHOT.tags,
  }));
  assert(runtime.shadowTabs && runtime.lightInput && runtime.lightButton);
  assert.equal(runtime.tags.length, 4);
}

async function verifyLayoutPreservation(page, staged) {
  // Verify a visual layout edit survives Lit rerender and file reload.
  const wrapper = page.locator('[data-od-id="profile-name-layout"]');
  await wrapper.evaluate((node) => {
    node.style.transform = 'translate(8px, 0px)';
  });
  const field = page.locator('text-input[name="workspace-name"]');
  await field.evaluate(async (node) => {
    node.label = 'Updated workspace name';
    await node.updateComplete;
  });
  assert.equal(await wrapper.evaluate((node) => node.style.transform), 'translate(8px, 0px)');
  let savedHtml = await readFile(path.join(staged, 'index.html'), 'utf8');
  savedHtml = savedHtml.replace(
    'data-od-id="profile-name-layout"',
    'data-od-id="profile-name-layout" style="transform: translate(8px, 0px)"',
  );
  await writeFile(path.join(staged, 'index.html'), savedHtml);
  await page.reload();
  assert.equal(await wrapper.evaluate((node) => node.style.transform), 'translate(8px, 0px)');
  assert.equal(await page.locator('[data-od-id="settings-title"]').textContent(), 'Your workspace');
}

async function verifyResponsiveLayout(page) {
  const tabs = page.getByRole('tab', { name: 'Notifications', exact: true });
  const notifications = page.getByRole('checkbox', {
    name: 'Email me when a workspace update is ready',
    exact: true,
  });
  await mkdir(path.join(repo, '.preview/maximus'), { recursive: true });
  await page.screenshot({ path: path.join(repo, '.preview/maximus/desktop.png'), fullPage: true });
  await page.setViewportSize({ width: 375, height: 812 });
  assert(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
  await tabs.click();
  assert.equal(await notifications.isVisible(), true);
  await page.screenshot({ path: path.join(repo, '.preview/maximus/mobile.png'), fullPage: true });
}
