# pill-tabs

Generated from `frontend/src/shared/ui/pill-tabs.ts` at `e6858c59ab4b`.

Set host.tabs = [{ id: "profile", label: "Profile" }, ...] in JavaScript. Slot children with slot="profile", matching those IDs. tab-change detail is the selected ID. Shadow DOM internals belong to the component.

| Property | HTML attribute | Type | Default |
| --- | --- | --- | --- |
| tabs | JS property only | readonly PillTab[] | [] |
| label | label | string | "" |
| active | active | string | "" |
| variant | variant | "pill" \| "underline" | "pill" |
| scrollable | scrollable | boolean | false |
| compact | compact | boolean | false |

## Referenced source types

```ts
export interface PillTab {
  id: string;
  label: string;
}
```

## Declared custom events

- `tab-change`: CustomEvent.
