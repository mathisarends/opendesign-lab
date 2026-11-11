---
name: maximus-compose
description: Compose and iterate OpenDesign prototypes with a configured UI component library. Use the bundled runtime and inspect matching original component sources on demand instead of recreating controls.
od:
  mode: prototype
  surface: web
  category: product-prototypes
  preview:
    type: html
  design_system:
    requires: false
---

# Compose components

This workflow is packaged by an exporter with a selected library's sources and assets. If those files are absent, resolve the intended exported package or sync it before designing. Do not fabricate replacements for missing controls.

For a new prototype, copy this skill's `assets/` directory into the OpenDesign project's `assets/` using the staged skill path advertised by OpenDesign. It contains only the component runtime and source tokens. Create the project's `index.html`, layout CSS and interaction code from the user's brief; there is no default page or required layout. No server, backend or dependency installation is needed for the resulting prototype.

Load the copied assets with `<link rel="stylesheet" href="assets/tokens.css">` and `<script src="assets/ui.js" defer></script>`. Configure JavaScript properties and event handlers after the runtime has loaded.

Read `components/INDEX.md` to choose components, then inspect only their linked sources. Small file: read it fully. Large file: first locate public properties, types, slots and events with targeted search and line ranges; read implementation details only when needed. Follow local imports inside `components/` and consult the package's alias configuration when provided. These are original sources from the same snapshot as the runtime, not files to compile or edit. No access to the original checkout is needed for composition.

Use `references/DESIGN.md` when choosing layout tokens. Copy `assets/ui.js` as a file; never read the generated bundle into the prompt. The browser executes it. `source-lock.json` records the shared source/build provenance. Use the staged skill paths advertised by OpenDesign rather than installation-relative siblings.

Compose real custom elements and regular layout containers. Change labels, public attributes/properties, slot content and the small composition script. Keep components intact; do not imitate their internal markup or CSS. Configure JavaScript-only properties in the composition script. Boolean attributes express presence; `disabled="false"` still means disabled. Use local mock content and explicit UI transitions; do not connect product APIs.

Layouts remain open-ended. Add wrappers or new compositions when needed. Keep stable, screen-prefixed `data-od-id` values on authored containers and content. The component runtime owns its generated DOM: preserve manual layout/slot edits, and express changes to generated controls through their public API. Do not promise that edits inside a component's rendered internals survive a rerender.

On iteration, read the current artifact first and patch only affected regions. Preserve other screens, route state and saved inline styles. Keep the project's copied component version until an explicit upgrade; do not silently resync the library. Check the actual browser preview, keyboard/form behavior and narrow layout. Report the result and material limitations briefly.
