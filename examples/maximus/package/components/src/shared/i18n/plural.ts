import { getLocale, type Locale } from "./locale";

type PluralForms = Partial<Record<Intl.LDMLPluralRule, string>> & { one: string; other: string };

export function plural(count: number, forms: PluralForms, locale: Locale = getLocale()): string {
  const category = new Intl.PluralRules(locale).select(count);
  return forms[category] ?? forms.other;
}
