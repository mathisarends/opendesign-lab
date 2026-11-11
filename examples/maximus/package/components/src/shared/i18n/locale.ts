import { isOneOf, preference } from "@local-storage";

export type Locale = "de" | "en";

export const locales: readonly Locale[] = ["de", "en"];

function detectLocale(): Locale {
  if (typeof navigator !== "undefined" && navigator.language?.toLowerCase().startsWith("de")) {
    return "de";
  }
  return "en";
}

const localePreference = preference("maximus.locale", detectLocale, isOneOf(locales), {
  legacyRaw: true,
});
const locale = localePreference.read();
if (typeof document !== "undefined") {
  document.documentElement.lang = locale;
}

export function getLocale(): Locale {
  return locale;
}

// Catalogs resolve once per page load, so a switch reloads instead of re-rendering every host.
export function setLocale(next: Locale): void {
  if (next === locale) {
    return;
  }
  if (!localePreference.write(next)) {
    return;
  }
  location.reload();
}
