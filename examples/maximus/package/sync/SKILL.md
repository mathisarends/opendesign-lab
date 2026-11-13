---
name: maximus-sync
description: "Get the latest Maximus components. Pulls the designer's local checkout of the source repository and verifies the committed component snapshot. Use when the designer asks to sync or update components."
od:
  mode: utility
  design_system:
    requires: false
---

# Sync components

Developers export the component package into the source repository's `opendesign/` folder and commit it. Syncing only pulls that checkout and verifies the snapshot; nothing is built on the designer's machine and no configuration is edited.

Run the bundled script from this skill's staged directory:

```text
node <skill-dir>/sync.mjs --library maximus
```

If it exits with `NOT_LINKED`, ask the designer once where their local checkout of the source repository is, then run it again with `--source <path>` as a separate argument. The path is remembered on this machine; do not ask again in later sessions. Do not search the disk for it.

The script stops on local changes in tracked files, a diverged branch or an authentication failure. Otherwise it runs `git pull --ff-only` and checks every snapshot file against `opendesign/source-lock.json`. Explain failures in plain words:

- Local changes or diverged history: the checkout needs a developer's help; nothing was changed.
- Files do not match the lock: the developers' export is incomplete; ask them to re-export.
- Snapshot older than the source: the components still work together; developers should re-export soon.

Do not stash, reset, switch branches, push, rebuild or edit snapshot files yourself. Existing prototypes keep their copied component assets; updated components are used by the next composition. Upgrading an existing project's assets is a separate, explicit request.

Reply in one or two short sentences: whether anything changed and which components were added, changed or removed. Do not read the generated runtime bundle into the prompt.
