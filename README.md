# OpenDesign Lab

**Use the same UI components in code and design.**

AI design tools usually redraw buttons and inputs that only look like the real ones. OpenDesign Lab brings the actual component library into [OpenDesign](https://github.com/nexu-io/open-design): prototypes run the real components, and the agent reads their real sources, both from the same snapshot. Designers keep control of layouts, content and UX flows.

```text
Developer:  source repo ── export ──> opendesign/ (committed)
Designer:   /…-sync ── git pull + verify ──> OpenDesign uses the new components
```

Developers do the setup once in the source repository. Designers only clone that repository once and then type a single slash command. They never build, install dependencies or edit configuration.

## Conventions

Two things live in the source repository. The developer writes `opendesign.config.json`, which describes the library. The exporter generates `opendesign/`, the package designers install. Both are committed.

```text
opendesign/
├── SKILL.md              /<name>-compose: how the agent builds screens with these components
├── assets/
│   ├── ui.js             the real components, built for the browser; copied into each prototype
│   └── tokens.css        the real design tokens (every :root rule of the token stylesheet)
├── components/
│   ├── INDEX.md          tags, purposes and source links; the agent's starting point
│   └── src/…             original sources, read on demand to learn attributes, slots and events
├── references/DESIGN.md  short token overview
├── sync/                 /<name>-sync: skill and dependency-free sync script
└── source-lock.json      hashes of every package file and source input
```

Runtime and sources come from the same build, so the agent never documents a different version than the browser runs. The agent reads the index and individual sources, never the bundle. Components own their rendered internals; designers edit layout wrappers, slot content and public properties.

The checkout path is machine-specific and never committed. The sync skill asks for it once and remembers it per library in the user's configuration folder (`%APPDATA%`, `~/Library/Application Support` or `~/.config`, under `opendesign-components/sources.json`).

## Developer: set up a library once

1. Add `opendesign.config.json` to the source repository root:

   ```json
   {
     "name": "acme",
     "title": "Acme",
     "root": "frontend",
     "components": "src/ui",
     "tokens": "src/styles/tokens.css"
   }
   ```

2. Export and commit the package:

   ```sh
   pnpm --dir <opendesign-lab> run export --source <source-repo>
   git -C <source-repo> add opendesign.config.json opendesign
   ```

3. Re-export when components change. In CI, add `--check`: it is read-only and fails when the committed snapshot no longer matches the sources.

| Field          | Meaning                                                                                                                                                                         |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`         | Library id. Skills become `<name>-compose` and `<name>-sync`.                                                                                                                   |
| `title`        | Display name used in skill descriptions and the index. Defaults to `name`.                                                                                                      |
| `root`         | Frontend folder inside the repository, holding `package.json`, `tsconfig.json` and `node_modules`. Defaults to `.`.                                                             |
| `components`   | A folder: every `@customElement(...)` / `customElements.define(...)` is found automatically, tests and stories excluded. Or an explicit list of `{ "tag", "file", "purpose" }`. |
| `tokens`       | Stylesheet whose `:root` rules form the token contract, including theme variants and `:root` rules inside media queries.                                                        |
| `tokenSummary` | Optional token names shown with values in `references/DESIGN.md`.                                                                                                               |
| `styles`       | Optional named CSS exports (`{ "exportName": "file" }`) that light-DOM components need globally.                                                                                |
| `tsconfig`     | Relative to `root`. Defaults to `tsconfig.json`; aliases are resolved from it.                                                                                                  |
| `out`          | Package folder relative to the config file. Defaults to `opendesign`.                                                                                                           |

A JSDoc `@summary` directly above a registration becomes the component's purpose in the index. Index entries never contain invented descriptions.

## Designer: one setup, then one command

1. Clone the source repository once (a developer can help). In the browser console inside OpenDesign, install both skills, using the absolute checkout path on the daemon's machine:

   ```js
   const pkg = '/absolute/path/to/source-repo/opendesign';
   for (const path of [pkg, `${pkg}/sync`]) {
     const response = await fetch('/api/skills/install', {
       method: 'POST',
       headers: { 'Content-Type': 'application/json' },
       body: JSON.stringify({ source: 'local', path }),
     });
     if (!response.ok) throw new Error(await response.text());
   }
   ```

   For a workspace-scoped installation, add the `x-od-workspace-id` and `x-od-workspace-member-id` headers from an existing OpenDesign request.

2. Run **`/<name>-sync`**, for example `/acme-sync`. The first time, the agent asks where the checkout is; after that it never asks again.
3. Compose with **`/<name>-compose`**: describe screens and flows, and the agent builds them from the real components.

The sync skill runs `git pull --ff-only` and then checks every package file against the lock; it needs only Git and Node. It stops without touching anything when the checkout has local changes or diverged history. It reports a package that does not match its lock, and it warns when developers forgot to re-export. Existing prototypes keep their copied component version until an explicit upgrade.

## Repository

```text
exporter/                 Generic, config-driven exporter (developer side)
skills/
  compose-components/     Composition workflow template
  sync-components/        Sync skill template and dependency-free sync script
examples/maximus/         Reference integration: config, generated package, settings page, browser checks
test/                     Exporter, sync and Git fixture tests
```

The exporter turns both skill templates into library-specific skills inside the package, so the templates themselves never contain library knowledge.

## Try the example

[Open the settings page](examples/maximus/settings/index.html) directly in a browser. It uses four real Lit components from the checked-in Maximus package; no server is needed. See the [Maximus reference guide](examples/maximus/README.md).

## Development

```sh
pnpm install --frozen-lockfile
pnpm run lint
pnpm run format:check
pnpm test
```

## Status and limits

- The direction is code to design. Prototypes are not converted back into application code.
- The exporter bundles with esbuild and the source `tsconfig`. Bundler-specific imports such as Vite's `?inline` CSS or worker imports are not supported yet. Pointing `components` at Maximus's whole `shared/ui` folder finds 89 components, but the build stops at such an import in the PDF preview. A native `build:design` command in the source repository is the planned next step.
- Font files are not bundled; font stacks fall back to locally available fonts.
- Native OpenDesign installation has been checked. Whether a live OpenDesign agent session can run the sync script and invoke skills as slash commands still needs to be tested.
