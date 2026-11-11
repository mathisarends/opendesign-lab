# Maximus reference integration

A working example of the OpenDesign Lab pattern using four real Lit components: `cta-button`, `text-input`, `app-checkbox` and `pill-tabs`.

- [`package/`](package/) is the generated, installable OpenDesign package.
- [`settings/`](settings/index.html) is a separate UI example; open it directly in a browser.
- [`tools/`](tools/) contains this library's exporter, component selection and checks.

## Refresh from source

```sh
pnpm install --frozen-lockfile
pnpm run maximus:sync --source /path/to/maximus-trading --pull
```

The source frontend must already have its normal dependencies installed. `--pull` performs `git pull --ff-only` before exporting. Omit it to export the current checkout without updating Git. Local edits or diverged history stop a pull; existing Git authentication is reused.

The adapter reads the source `frontend/` tree, builds the selected components and copies their original sources/local dependencies with LF line endings. It also exports the original `:root` tokens. Browser assets execute unchanged component implementations; they are not prompt context. Webfont binaries are not included; source system-font fallbacks remain available.

## Install in OpenDesign

The reusable workflow in `skills/compose-components` is a template. This adapter packages it with the library and gives the resulting skill the example-specific ID `maximus-compose`.

In the browser console inside OpenDesign, set the absolute path to this lab checkout on the daemon's machine:

```js
const checkout = '/absolute/path/to/opendesign-lab';
for (const relative of ['examples/maximus/package', 'skills/sync-components']) {
  const response = await fetch('/api/skills/install', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'local', path: `${checkout}/${relative}` }),
  });
  if (!response.ok) throw new Error(await response.text());
}
```

For workspace-scoped installation, add `x-od-workspace-id` and `x-od-workspace-member-id` from an existing OpenDesign request to the headers. Installation links these folders, so keep the checkout path stable. Existing installations return a conflict. If an older installation points at `skills/maximus-compose`, uninstall that library entry and reinstall from `examples/maximus/package`; existing project files can stay in place.

Refresh the skill library and select **maximus-compose**. Configure **sync-components** with the local source/lab paths and the `maximus` adapter. New projects receive the runtime assets and use their own HTML, styles and interactions. The settings example is never copied automatically.

## Context and versioning

| Package file                                  | Purpose                                                            |
| --------------------------------------------- | ------------------------------------------------------------------ |
| `SKILL.md`                                    | Generated from the reusable composition workflow.                  |
| `components/INDEX.md`                         | Component tag, short purpose, source link and line count.          |
| `components/src/`, `components/tsconfig.json` | Original sources and alias configuration, read selectively.        |
| `references/DESIGN.md`                        | Short token overview.                                              |
| `assets/ui.js`, `assets/tokens.css`           | Shared browser runtime and original token contract.                |
| `source-lock.json`                            | Source revision, input/output hashes and generated-file ownership. |

Index purposes are hand-maintained in `tools/selection.mjs`. Sources are copied directly; there are no generated API tables. Sync removes obsolete generated files recorded in the previous lock while preserving examples, workflow templates and user prototypes. Existing projects keep their copied library version until explicitly upgraded.

Lit owns component-rendered internals. Change public attributes/properties, authored layout wrappers and slotted content. `pill-tabs` uses Shadow DOM; the other three controls use light DOM. Internal DOM edits may be overwritten on rerender.

## Verify

```sh
pnpm run maximus:check --source /path/to/maximus-trading
pnpm run maximus:verify --source /path/to/maximus-trading
```

Check is read-only. Verify uses the source frontend's Playwright installation and an installed Chromium; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` when needed. It checks source parity, drift, generated-file cleanup, temporary local Git fixtures, the example page and a separate free composition using only runtime assets. The source checkout remains unchanged.

The package was checked against OpenDesign 0.25.1's native installer, registry and staging code. A full live agent session remains untested. Keep the source owner's permissions in mind before publishing generated source or runtime snapshots.
