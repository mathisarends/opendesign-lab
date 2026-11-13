# OpenDesign Lab vision

Use the same UI components in application code and OpenDesign. Developers own the components and their browser build; designers own layouts, content and UX flows. The agent composes real controls and reads original sources only when needed.

This document describes the target workflow. The current Maximus example is a proof of concept, not the completed integration.

## Developer experience

Describe the library once in `opendesign.config.json` at the source repository root: component directory, token stylesheet and frontend root. Export the package into `opendesign/` and commit it; CI checks it with `--check`. Longer term, provide a reproducible `build:design` command in the source repository. Use the frontend's existing toolchain to handle TypeScript, decorators, aliases, styles, fonts, workers and dynamic imports.

Discover custom-element tags from registrations such as `@customElement(...)` and `customElements.define(...)`. Include new components automatically; exclude tests and helpers from the component index. Do not maintain a second component list or invent purpose descriptions.

The design build produces browser-ready JavaScript, CSS and required assets, for example under `dist/design/`. A single bundle is optional; multiple modules and worker files are valid. Component implementations remain unchanged. Components with application dependencies need explicit inputs or preview providers with local sample data.

## Designer experience

Clone the source repository once and install its `opendesign/` package and sync skill in OpenDesign; a developer can help. The checkout path is asked once by the sync skill and kept in the user's configuration folder, outside version control. Designers never see the library configuration.

The intended interactions are:

1. **Sync components:** `/<library>-sync` pulls the checkout, verifies the committed snapshot and reports added, changed or removed components. Nothing is built on the designer's machine.
2. **Compose components:** describe the desired screens and interactions. The agent selects real components and freely designs the surrounding experience.
3. **Iterate:** change only affected screens and preserve manual edits.

The exact OpenDesign invocation syntax remains to be validated. The designer should not need to choose build tools or maintain export files.

## Stable skills, replaceable library data

Keep the `sync-components` and `compose-components` templates unchanged across projects. The exporter turns them into library-specific skills inside the package from the configuration's data. Library paths, source context and build output are data, not hand-written skill instructions.

```text
Developer: source + opendesign.config.json -> export -> committed opendesign/ snapshot
Designer:  /<library>-sync -> git pull --ff-only + hash check -> OpenDesign
```

Sync runs `git pull --ff-only` with existing authentication and verifies the committed snapshot against its lock. Preserve local changes and stop on dirty or diverged checkouts and on snapshots that do not match their lock; warn when the snapshot is older than the source. No public registry or public package is required.

Export a small index containing tags, source links and line counts, plus matching original sources, browser assets and revision/hash metadata. The agent reads individual sources on demand; generated runtime files never become prompt context. Sync is deterministic scripting, not LLM-generated build code.

New prototypes receive their own library snapshot. Sync updates the available library without changing existing prototypes. Upgrading a prototype is a separate, explicit action, followed by browser checks. Source and runtime must always come from the same export; hashes detect drift but do not guarantee API compatibility.

## Scope and validation

Use OpenDesign's preview and visual editing capabilities. Component properties, authored wrappers and slots are the supported editing surfaces; runtime-owned internals may be replaced on rerender. No application backend, custom editor or continuously running component server is required by this workflow.

For Maximus, allow roughly half a day for an initial checked integration; a first build may take 1–2 hours. This is an estimate. A full-folder ES-module build has been exercised, but complete OpenDesign preview, worker/asset loading and prototype upgrade behavior still need end-to-end validation. Additions within the configured folder should require no export-list maintenance; toolchain changes may require build updates.
