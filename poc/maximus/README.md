# Real-component context PoC

Four unchanged Maximus components: `cta-button`, `text-input`, `app-checkbox`, `pill-tabs`. No backend or API calls. The browser runs their actual Lit implementation; the agent only composes their public APIs.

```powershell
npm ci
npm run maximus:sync -- --source C:/FH/FEP/maximus-trading
npm run maximus:check -- --source C:/FH/FEP/maximus-trading
npm run maximus:verify -- --source C:/FH/FEP/maximus-trading
```

The source frontend must have its dependencies installed. Sync reads it without modifying it. Verify uses its Playwright installation; set `PLAYWRIGHT_CHROMIUM_EXECUTABLE` if Chromium is installed elsewhere.

Open [`../../skills/maximus-compose/assets/starter/index.html`](../../skills/maximus-compose/assets/starter/index.html) directly in a browser. No server needed. Install `skills/maximus-compose` with the existing OpenDesign local-skill `/install` flow and select **maximus-compose**. Its runtime assets are automatically staged by OpenDesign with the skill.

## Agent context

| File | Purpose |
| --- | --- |
| `SKILL.md` | Small workflow: copy starter, compose tags, preserve edits. |
| `references/INDEX.md` | Generated component index; read individual APIs on demand. |
| `references/DESIGN.md` | Generated theme/typography summary from source tokens. |
| `references/<tag>.md` | Generated public properties, attributes, defaults and events. |
| `assets/starter/assets/maximus-ui.js` | Generated runtime; execute/copy, never read into the prompt. |
| `assets/starter/assets/tokens.css` | Only needed source tokens and their dependencies. |
| `source-lock.json` | Source commit, build inputs, hashes, dependency versions and output hashes. |

`sync.mjs` derives API docs with the standard Custom Elements Manifest analyzer and bundles the exact source imports with esbuild. No component implementations are copied into hand-maintained files. `--check` rebuilds in memory and fails on source, dependency or generated-output drift; it writes nothing. Run it in CI against the intended source revision. Existing projects keep their copied snapshot until an explicit upgrade.

Generated files use LF line endings. Source-input hashes normalize text line endings to LF so Windows/Linux checkouts do not cause false drift.

Component usage notes and the starter composition are hand-authored; code extraction cannot infer UX intent. `pill-tabs.tabs` is a JavaScript property, not an HTML attribute. Its tab IDs select named light-DOM slots. Three components use light DOM; `pill-tabs` uses Shadow DOM. Edit host attributes/properties and slotted content: Lit can overwrite manual edits to rendered internals.

This is a native **skill bundle**, not a second OpenDesign design-system importer. It opts out of injected brand context so the existing grayscale system cannot override Maximus tokens. The skill includes its own runtime, source tokens and API references and remains portable after staging.

Verified with the official OpenDesign installer, registry and resource-staging code, plus Chromium desktop/mobile checks. A full agent session in the running OpenDesign application has not been exercised.

The generator selects four components explicitly. Adding a component is a reviewed change to `selection.mjs`. Sync replaces only its named generated files; it does not rewrite the starter, workflow or user prototypes. Generated third-party license notices stay in the runtime bundle. Do not publish the source snapshot without the source owner's approval.
