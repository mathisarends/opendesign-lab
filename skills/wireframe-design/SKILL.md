---
name: wireframe-design
description: Create and iterate navigable low-fidelity UX wireframes in OpenDesign with shared grayscale tokens and editable HTML primitives. Use for screen flows, information architecture and wireframe revisions.
od:
  mode: prototype
  surface: web
  category: wireframes
  preview:
    type: html
  fidelity: wireframe
  design_system:
    requires: true
---

# Wireframe design

Use the active Vision Wireframe design-system context. If another system is active, resolve the intended system before generating. Consume injected `DESIGN.md`, `tokens.css` (including shared primitive CSS), and the component index. `components.html` is a markup reference, not an automatically registered palette. Installation-relative sibling paths are unavailable after skill staging. The reference is a starting point: reuse suitable primitives and freely compose new layouts with the same tokens.

## Create

1. Identify the user's goal, entry point, essential screens and transitions. Infer from the brief; ask only about missing decisions that materially change the flow. Keep any screen/transition plan short.
2. Work in the OpenDesign project workspace. For a new prototype, write `index.html` with the inline shared stylesheet, and static semantic HTML. Group each screen in a uniquely identified section (`id`, `data-screen-label`, `data-od-id`). Prefix all editable element IDs with their screen id. Do not generate a framework, server or build pipeline.
3. Connect screens with real hash links and a small hash router that toggles existing sections using `hidden`, handles initial load and `hashchange`, falls back to the entry screen for unknown hashes, and updates focus/current navigation. Ensure `[hidden] { display: none !important; }` wins over layout display rules. Support browser back/forward. A form action may navigate after local validation. Keep DOM nodes stable; do not render screens from JavaScript strings. Preserve an existing project's routing structure when iterating.
4. Keep text, controls, placeholders and boxes as separate DOM elements. Give layout boxes `data-od-edit="container"`, simple text leaves `text`, and anchors `link`. Retain native labels, keyboard interaction, focus indicators and readable responsive layouts. Flat button/link labels simplify visual text editing. Unique stable `data-od-id` values let OpenDesign persist changes.
5. Use grayscale, the shared spacing/type/border tokens and meaningful short copy. Add only states needed to explain the task. Avoid decorative details, animation and unrelated product rules.

## Iterate without losing edits

Read the current artifact from disk before every change; it may contain saved visual edits. Locate the affected screen and elements by stable IDs. Patch only those nodes and narrowly scoped styles. Keep unaffected screens, IDs, routes, inline styles (including drag transforms/dimensions), attributes, editor override blocks and user-authored content. Do not regenerate the document or recopy the reference. If a token/shared-rule change would affect other screens, prefer a screen-scoped override unless the user requests a global change. Preserve manual edits outside the requested change; resolve directly conflicting edits with the user when intent is unclear.

## Check and hand off

Open the OpenDesign preview when available. Check every screen is reachable, links and back/forward work, forms behave as intended, and narrow screens remain usable. Check unique IDs and no missing token references. After an iteration, compare the changed regions and confirm unrelated screens and manual edits survived. Verify representative text, box and button edits can be saved/reloaded when the editor is available; state any validation limit briefly. Reply with the result and necessary limitations, without a long design explanation.
