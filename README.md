# OpenDesign Lab

**Use the same UI components in code and design.**

A reusable workflow for bringing a component library into [OpenDesign](https://github.com/nexu-io/open-design). The agent reads original component sources on demand; the browser runs the matching build. Designers keep control of layouts, content and UX flows.

```text
UI source -> deterministic export -> versioned component package -> OpenDesign
```

## How it works

1. **Export together.** Bundle selected components and tokens alongside a readable source snapshot.
2. **Keep context small.** Start with a component index; inspect only the sources needed for the task.
3. **Compose freely.** Copy runtime assets into a project and build the requested screens around the real components.
4. **Sync deliberately.** Refresh from a private local checkout. Existing prototypes keep their version until explicitly upgraded.

No public registry, application backend or custom editor is required.

## Repository

```text
skills/
  compose-components/     Reusable composition workflow
  sync-components/        Reusable local-sync workflow
examples/
  maximus/
    package/              Generated, installable reference package
    settings/             Optional working UI example
    tools/                Library-specific exporter and verification
```

The exporter combines the reusable composition workflow with a selected library's sources and assets. Install that resulting package in OpenDesign; the bare workflow template contains no component library.

## Try the example

[Open the settings page](examples/maximus/settings/index.html) directly in a browser. It uses four real Lit components and the checked-in browser build; no server is needed.

For setup, source refresh and OpenDesign installation, see the [Maximus reference guide](examples/maximus/README.md). Maximus-specific code and generated assets live entirely under `examples/`.

## Use your own library

Adapt the reference exporter to your source layout, public component exports and token file. Its output follows a small contract: `SKILL.md`, `components/INDEX.md`, original sources, runtime `assets/` and a revision/hash lockfile. Layout examples remain separate from the installable package.

## Development

```sh
pnpm install --frozen-lockfile
pnpm run lint
pnpm run format:check
```

Apply formatting with `pnpm run format`. Generated packages retain their deterministic output. The reference checks cover source parity, drift, cleanup, Git updates and offline browser behavior. Native OpenDesign installation and staging have been checked; a full live agent session remains to be exercised.
