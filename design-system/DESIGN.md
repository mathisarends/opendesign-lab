# Vision Wireframe

> Category: Wireframes

Low-fidelity UX wireframes for information architecture, task flows and navigation. Product rules come from the user's brief.

## Use the package

Use the active OpenDesign package context: this file, `tokens.css` and the component index. `tokens.css` also contains the small shared primitive rules so the injected context is directly usable. Inline this stylesheet in the artifact; `components.html` is the human-readable markup reference. Package files are not automatically staged in the project; do not link to their installation paths.

## Neutral hierarchy

White canvas, light-gray sections, dark text, gray borders. `--accent` is charcoal for the primary action. Status tokens are grayscale aliases: communicate success, warnings and errors with explicit text. No product colors, shadows, imagery or decoration.

## Type

System fonts only. Body 16px, labels 14px, section headings 20px, screen headings 28px. Use weight 600 for headings and actions, body leading 1.5 and heading leading 1.2. Other shared OpenDesign type slots remain available when content needs them.

## Space and composition

Spacing scale: 4, 8, 12, 16, 20, 24, 32, 48px. Default gap/padding 16px; screen padding 32px on desktop, 24px on tablet and 16px on phone. `--container-max` is a starting point, not a required screen width. Flex and grid express structure. Compose freely; add layouts when they serve the task.

## Primitive reference

`components.html` demonstrates screen/container, stack/row/grid, card/section, button, labeled input, navigation, list, placeholder and divider. These are ordinary HTML/CSS patterns, not registered editor components or a closed catalog. Retain their tokens while changing composition, density and layout. Use a single solid 1px border and 2px radius; a dashed border identifies a placeholder.

## Navigation and states

Connect screens with real links and explicit destinations. Actions use native buttons; forms use labels and native fields. Show selected, disabled, empty and error states when the requested flow needs them. Use short, meaningful labels instead of lorem ipsum. No animated transitions.

## Visual editing and preservation

Keep visible elements as static DOM nodes with unique, stable `data-od-id` values, prefixed by screen id. Add `data-od-edit="container"` to layout boxes and `data-od-edit="text"` to simple text leaves; links can use `link`. Keep label text directly editable. Avoid canvas, shadow DOM and runtime DOM regeneration. OpenDesign can persist text, link, attribute and inline-style changes, including dimensions and drag transforms. Preserve these attributes, inline styles and any editor override blocks during later agent edits.

## Accessibility

Use landmarks, ordered headings, visible labels and keyboard focus. Disabled controls remain recognizable; state meaning also appears in text. Keep content readable at narrow widths and avoid horizontal overflow. Honor reduced motion by having no animation. A wireframe still needs usable controls and meaningful navigation.
