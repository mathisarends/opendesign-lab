import type { de } from "./de";

export const en: typeof de = {
  breadcrumb: "Breadcrumb",
  brand: "Maximus Trading",
  brandName: "maximus",
  brandSuffix: "TRADING",
  close: "Close",
  withShortcut: ({ label, shortcut }) => (shortcut ? `${label} · ${shortcut}` : label),
  closeItem: ({ name }) => `Close ${name}`,
  itemAction: ({ item, action }) => `${item} · ${action}`,
  pageTitle: ({ title }) => `${title} · Maximus Trading`,
  cancel: "Cancel",
  save: "Save",
  pagination: {
    label: "Pagination",
    previous: "Previous",
    next: "Next",
    pageNumber: ({ current, total }) => `Page ${current} of ${total}`,
  },
  language: "Select language",
  languageNames: { de: "Deutsch", en: "English" },
  showPassword: "Show password",
  hidePassword: "Hide password",
  validation: {
    required: "Please fill in this field.",
    email: "Please enter a valid email address, e.g. name@example.com.",
    tooShort: ({ min, length }) => `At least ${min} characters, currently ${length}.`,
    invalid: "Please check this entry.",
  },
};
