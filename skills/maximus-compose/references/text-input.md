# text-input

Generated from `frontend/src/shared/ui/text-input.ts` at `e6858c59ab4b`.

Use a unique name for native input/label IDs. Listen to value-change; event.detail is the string value. It participates in native form validation.

| Property | HTML attribute | Type | Default |
| --- | --- | --- | --- |
| label | label | string | "" |
| name | name | string | "" |
| value | value | string | "" |
| icon | icon | IconName \| undefined | unset |
| type | type | InputType | "text" |
| autocomplete | autocomplete | Autocomplete \| undefined | unset |
| prefix | prefix | string | "" |
| placeholder | placeholder | string | "" |
| pattern | pattern | string \| undefined | unset |
| patternMessage | patternMessage | string | "" |
| hint | hint | string | "" |
| required | required | boolean | false |
| minlength | minlength | number \| undefined | unset |
| maxlength | maxlength | number \| undefined | unset |
| noAutocorrect | no-autocorrect | boolean | false |

## Referenced source types

```ts
export type InputType = "text" | "email" | "password" | "search" | "tel" | "url";
export type Autocomplete =
  "off" | "name" | "email" | "username" | "current-password" | "new-password";
```

## Declared custom events

- `value-change`: CustomEvent.
