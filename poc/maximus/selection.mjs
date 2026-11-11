// Reviewed scope and usage knowledge; API tables are generated from source.
export const components = [
  {
    tag: 'cta-button',
    file: 'src/shared/ui/cta-button.ts',
    note: 'label supplies the visible text. type defaults to submit; use type="button" for local actions. disabled is a presence-only boolean attribute.',
  },
  {
    tag: 'text-input',
    file: 'src/shared/ui/text-input.ts',
    note: 'Use a unique name for native input/label IDs. Listen to value-change; event.detail is the string value. It participates in native form validation.',
  },
  {
    tag: 'app-checkbox',
    file: 'src/shared/ui/checkbox/app-checkbox.ts',
    note: 'The inner native checkbox participates in forms. Read host.checked or FormData; the native change event bubbles. No custom value-change event is declared.',
  },
  {
    tag: 'pill-tabs',
    file: 'src/shared/ui/pill-tabs.ts',
    note: 'Set host.tabs = [{ id: "profile", label: "Profile" }, ...] in JavaScript. Slot children with slot="profile", matching those IDs. tab-change detail is the selected ID. Shadow DOM internals belong to the component.',
  },
];

export const styleImports = [
  ['controls', 'src/shared/styles/controls.ts'],
  ['ctaButtonStyles', 'src/shared/ui/cta-button.ts'],
  ['textInputStyles', 'src/shared/ui/text-input.ts'],
  ['appCheckboxStyles', 'src/shared/ui/checkbox/app-checkbox.styles.ts'],
];
