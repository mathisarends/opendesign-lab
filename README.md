# Vision Design Lab

Compose prototypes in [OpenDesign](https://github.com/nexu-io/open-design) with real Maximus UI components. The agent uses the bundled controls and reads short generated API references on demand. Layouts, content and UX flows remain open-ended.

[Open the prototype](skills/maximus-compose/assets/starter/index.html) directly in a browser. No backend or server is needed.

## OpenDesign setup

Keep this checkout locally. In the browser console **inside OpenDesign**, adjust the path on the daemon's machine and run:

```js
const repo = 'C:/code/opendesign-lab';
for (const name of ['maximus-compose', 'sync-components']) {
  const response = await fetch('/api/skills/install', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'local', path: `${repo}/skills/${name}` }),
  });
  if (!response.ok) throw new Error(await response.text());
}
```

For workspace-scoped installation, add `x-od-workspace-id` and `x-od-workspace-member-id` from an existing OpenDesign request to the headers. Installation links these folders; keep their paths stable. Existing installations return a conflict.

Refresh the skill library. Use **maximus-compose** to design with the components and **sync-components** to refresh the available library from the configured local source checkout. Existing prototypes retain their copied component version until explicitly upgraded.

## Local development

```powershell
pnpm install --frozen-lockfile
pnpm run maximus:sync --source C:/FH/FEP/maximus-trading --pull
pnpm run lint
pnpm run format:check
```

The source frontend must already have its dependencies installed. Sync uses existing Git authentication, performs `git pull --ff-only`, and exports the runtime, tokens and API references. A private source checkout is sufficient; no registry is required.

Use `pnpm run format` to apply formatting. Generated snapshots are excluded from automatic formatting. See [the PoC guide](poc/maximus/README.md) for the context structure, drift checks and browser verification.

Targets OpenDesign **0.25.1** ([skill format](https://github.com/nexu-io/open-design/blob/614795896e09a2c1682b24cc1406529baf531bd7/docs/skills-protocol.md)). Installation, registry discovery and staging were checked against the official source; a full agent session in the running app remains untested.
