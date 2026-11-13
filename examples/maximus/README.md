# Maximus reference integration

A working example of the OpenDesign Lab pattern using four real Lit components: `cta-button`, `text-input`, `app-checkbox` and `pill-tabs`.

- [`opendesign.config.json`](opendesign.config.json) describes the library: an explicit component list, global component styles and the token stylesheet.
- [`package/`](package/) is the generated, installable package, including the `maximus-compose` and `maximus-sync` skills.
- [`settings/`](settings/index.html) is a separate UI example; open it directly in a browser.
- [`verify.mjs`](verify.mjs) checks the package against the real source in a browser.

In a real setup, the config sits at the root of `maximus-trading` and the package is committed there as `opendesign/`. This reference keeps both in the lab so the source repository stays untouched. That is why the bundled `maximus-sync` skill only works once the package lives in the source repository.

## Export from source

```sh
pnpm install --frozen-lockfile
pnpm run maximus:export --source /path/to/maximus-trading
pnpm run maximus:check --source /path/to/maximus-trading
```

The source frontend must already have its normal dependencies installed. The exporter reads `frontend/`, builds the configured components with the source `tsconfig` and copies their original sources and local dependencies with LF line endings. It also exports every `:root` token rule from `frontend/src/style.css`. Check is read-only and reports drift.

## Install and use

Follow the [designer steps](../../README.md#designer-one-setup-then-one-command) with `pkg` set to the absolute path of [`package/`](package/); in a real setup that is `<maximus-checkout>/opendesign`. Then select **maximus-compose**. The [package layout](../../README.md#conventions) is the same for every library. The settings example is never copied into new projects.

Lit owns component-rendered internals. Change public attributes and properties, authored layout wrappers and slotted content. `pill-tabs` uses Shadow DOM; the other three controls use light DOM. Internal DOM edits may be overwritten on rerender.

## Verify

```sh
pnpm run maximus:verify --source /path/to/maximus-trading
```

Verify uses the source frontend's Playwright installation and an installed Chromium; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` when needed. It checks source parity, drift detection, the example page and a separate free composition that uses only the runtime assets. The source checkout remains unchanged. Generic exporter, cleanup and Git sync behavior is covered by `pnpm test`.

Keep the source owner's permissions in mind before publishing generated source or runtime snapshots.
