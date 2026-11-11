---
name: maximus-compose
description: Compose and iterate OpenDesign prototypes with the real Maximus frontend components. Use the bundled runtime and read generated component APIs on demand instead of recreating their HTML or CSS.
od:
  mode: prototype
  surface: web
  category: product-prototypes
  preview:
    type: html
  design_system:
    requires: false
---

# Compose Maximus

For a new prototype, copy the contents of this skill's `assets/starter/` into the OpenDesign project workspace using the skill's staged path advertised by OpenDesign. This provides `index.html`, small composition-only CSS/JS and the already built component runtime. No server, backend or dependency installation is needed for the resulting prototype.

Read `references/INDEX.md`, then only the API files for components you need. Use `references/DESIGN.md` when choosing layout tokens. Keep `assets/starter/assets/maximus-ui.js` out of the prompt: it is executable output, not context. The bundle and tokens are an immutable source snapshot; `source-lock.json` records its provenance. Read usage details from the staged skill, not installation-relative sibling folders.

Compose real custom elements and regular layout containers. Change labels, public attributes/properties, slot content and the small composition script. Keep components intact; do not imitate their internal markup or CSS. `pill-tabs.tabs` must be assigned in JavaScript. Boolean attributes express presence; `disabled="false"` still means disabled. Use local mock content and explicit UI transitions; do not connect product APIs.

Layouts remain open-ended. Add wrappers or new compositions when needed. Keep stable, screen-prefixed `data-od-id` values on authored containers and content. Lit owns the DOM it renders: preserve manual layout/slot edits, and express changes to generated controls through their public API. Do not promise that edits inside a component's rendered internals survive a rerender.

On iteration, read the current artifact first and patch only affected regions. Preserve other screens, route state and saved inline styles. Keep the project's copied component version until an explicit upgrade; do not silently resync the library. Check the actual browser preview, keyboard/form behavior and narrow layout. Report the result and material limitations briefly.
