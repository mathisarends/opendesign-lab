// Reviewed public entry points. Implementations are copied from source.
export const components = [
  {
    tag: 'cta-button',
    file: 'src/shared/ui/cta-button.ts',
    purpose: 'Primary action button',
  },
  {
    tag: 'text-input',
    file: 'src/shared/ui/text-input.ts',
    purpose: 'Labeled text field with native validation',
  },
  {
    tag: 'app-checkbox',
    file: 'src/shared/ui/checkbox/app-checkbox.ts',
    purpose: 'Checkbox for an on/off choice',
  },
  {
    tag: 'pill-tabs',
    file: 'src/shared/ui/pill-tabs.ts',
    purpose: 'Tabbed content with named slots',
  },
];

export const styleImports = [
  ['controls', 'src/shared/styles/controls.ts'],
  ['ctaButtonStyles', 'src/shared/ui/cta-button.ts'],
  ['textInputStyles', 'src/shared/ui/text-input.ts'],
  ['appCheckboxStyles', 'src/shared/ui/checkbox/app-checkbox.styles.ts'],
];
