# Vision Design Lab

Minimal, freely composable wireframes for [OpenDesign](https://github.com/nexu-io/open-design): grayscale tokens, editable HTML primitives and a skill for navigable screen flows. No app, backend or prototype build step.

## Setup

Keep this repository locally. Open the browser console **inside OpenDesign**, set the absolute repository path on the daemon's machine, and run:

```js
const repo = 'C:/code/opendesign-lab';
for (const [kind, path] of [
  ['design-systems', `${repo}/design-system`],
  ['skills', `${repo}/skills/wireframe-design`],
]) {
  const r = await fetch(`/api/${kind}/install`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ source: 'local', path }),
  });
  if (!r.ok) throw new Error(await r.text());
}
```

Refresh the libraries and select **Vision Wireframe** and **wireframe-design**. Installation links the folders; keep their paths stable. Existing installations return a conflict. The design-system ID is `user:design-system`; its folder name and `manifest.id` must match. Workspace access rules apply.

For a workspace-scoped installation, include `x-od-workspace-id` and `x-od-workspace-member-id` from an existing OpenDesign request in `headers`. Omitting them installs an unbound local resource.

Use `/install` as shown: **Import local project** / `od design-systems import-local` extracts a new system and replaces the component fixture with generated defaults.

## Use

Describe your goal and flow in OpenDesign. The skill creates linked screens in `index.html` and patches affected screens during iterations. Save visual edits before asking the agent to continue.

- `design-system/DESIGN.md`: concise design guidance.
- `design-system/tokens.css`: shared tokens and primitive styles, injected into the agent context.
- `design-system/components.html`: open locally to inspect the markup reference.
- `skills/wireframe-design/SKILL.md`: OpenDesign workflow and edit-preservation rules.

The reference guides composition; it does not register an editor palette. Stable `data-od-id` attributes support saved text, link and style edits. Movement uses CSS transforms; sizing uses width/height styles, within OpenDesign's editor capabilities.

## Compatibility

Targets OpenDesign **0.25.1**, commit [`6147958`](https://github.com/nexu-io/open-design/tree/614795896e09a2c1682b24cc1406529baf531bd7), using its [v1 package schema](https://github.com/nexu-io/open-design/blob/614795896e09a2c1682b24cc1406529baf531bd7/design-systems/_schema/manifest.schema.ts), [local installer](https://github.com/nexu-io/open-design/blob/614795896e09a2c1682b24cc1406529baf531bd7/apps/daemon/src/library-install.ts) and [skill format](https://github.com/nexu-io/open-design/blob/614795896e09a2c1682b24cc1406529baf531bd7/docs/skills-protocol.md). OpenDesign indexes fixture markup without following external CSS; shared rules therefore live in the injected stylesheet.

Validated with Stylelint's standard config, the official installer/registry and editor patch/drag code, plus Chromium at desktop/mobile widths. These isolated checks do not replace a full session in the running OpenDesign app.

## Real-component PoC

[Maximus composition](poc/maximus/README.md) bundles four actual Lit components from a local source checkout and generates short API references with a drift check. Open [the composed prototype](skills/maximus-compose/assets/starter/index.html) in a browser. The self-contained `maximus-compose` skill copies that runtime instead of recreating controls.
