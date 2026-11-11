---
name: sync-components
description: Update the local Maximus component checkout and refresh the OpenDesign component snapshot. Use when the designer asks to sync components or get the latest frontend controls from the configured local repository.
od:
  mode: utility
  design_system:
    requires: false
---

# Sync components

Use the local source checkout configured by the user. For this project's current Maximus integration it is `C:/FH/FEP/maximus-trading`; use a different path when supplied. Reuse the machine's existing Git authentication.

Use the configured Vision Design Lab checkout, currently `C:/code/opendesign-lab`. Verify its `package.json` exposes `maximus:sync`. Use a different path when supplied. The per-run staged skill directory is not the lab checkout and does not contain the exporter dependencies. If either configured checkout is unavailable, ask for its local path.

Run the deterministic exporter with separate command arguments:

```text
pnpm --dir <lab-checkout> run maximus:sync --source <source-checkout> --pull
```

This first runs `git pull --ff-only` in the source checkout, then rebuilds the existing components, tokens and API references. Dependencies are a one-time setup (`pnpm install --frozen-lockfile` in the lab and the source frontend's normal dependency install). If the update changes dependency requirements, report the required dependency refresh rather than inventing replacements for missing components.

Stop on local source changes, a diverged branch, authentication failure or build failure. Preserve those changes; do not stash, reset, switch branches, push or change repository visibility. The exporter refreshes only its generated snapshot in `skills/maximus-compose`; existing project screens and their copied component versions stay untouched. Updated components are available to the next run using the compose skill. Upgrading an existing project's assets is a separate, explicit request.

Reply briefly with the source revision and whether anything changed. Do not read the generated runtime bundle into the prompt or write a design report. This skill updates available building blocks; it does not prescribe layouts or product UX.
