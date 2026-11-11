---
name: sync-components
description: Update a configured local UI-library checkout and refresh its OpenDesign component package. Use when the designer asks to sync components or get the latest controls from their private source repository.
od:
  mode: utility
  design_system:
    requires: false
---

# Sync components

Use the local source checkout, lab checkout and adapter configured by the user or established in the current session. Reuse the machine's existing Git authentication. Ask once for a missing path rather than guessing a machine-specific location.

Verify the lab's `package.json` exposes the configured adapter's sync command. If it has exactly one script ending in `:sync`, use that adapter; otherwise resolve the intended adapter with the user. The per-run staged skill directory is not the lab checkout and does not contain exporter dependencies. Each adapter owns its source-specific build and export details.

Run the deterministic exporter with separate command arguments:

```text
pnpm --dir <lab-checkout> run <adapter>:sync --source <source-checkout> --pull
```

This first runs `git pull --ff-only` in the source checkout, then refreshes the component build, original source snapshot, index and tokens. Obsolete generated files from the previous snapshot are removed; user-authored files stay intact. Dependencies are a one-time setup (`pnpm install --frozen-lockfile` in the lab and the source frontend's normal dependency install). If the update changes dependency requirements, report the required dependency refresh rather than inventing replacements for missing components.

Stop on local source changes, a diverged branch, authentication failure or build failure. Preserve those changes; do not stash, reset, switch branches, push or change repository visibility. The adapter refreshes only its generated component package; existing project screens and their copied component versions stay untouched. Updated components are available to the next run using that package's compose skill. Upgrading an existing project's assets is a separate, explicit request.

Reply briefly with the source revision and whether anything changed. Do not read the generated runtime bundle into the prompt or write a design report. This skill updates available building blocks; it does not prescribe layouts or product UX.
