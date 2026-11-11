import { getLocale, type Locale } from "./locale";

type Message = string | ((params: never) => string);

export type Catalog = { readonly [key: string]: Message | Catalog };

export function defineMessages<C extends Catalog>(catalogs: Record<Locale, C>): C {
  return catalogs[getLocale()];
}
