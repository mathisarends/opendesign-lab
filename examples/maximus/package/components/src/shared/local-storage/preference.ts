export interface Preference<T> {
  read(): T;
  write(value: T): boolean;
}

export function isBoolean(value: unknown): value is boolean {
  return typeof value === "boolean";
}

export function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function isNullable<T>(
  validate: (value: unknown) => value is T,
): (value: unknown) => value is T | null {
  return (value): value is T | null => value === null || validate(value);
}

export function isOneOf<const T extends readonly string[]>(
  values: T,
): (value: unknown) => value is T[number] {
  return (value): value is T[number] => isString(value) && values.includes(value);
}

export function isInRange(min: number, max: number): (value: unknown) => value is number {
  return (value): value is number =>
    typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

export function isNullableString(value: unknown): value is string | null {
  return value === null || typeof value === "string";
}

export function isNullableNumber(value: unknown): value is number | null {
  return value === null || (typeof value === "number" && Number.isFinite(value));
}

export function preference<T>(
  key: string,
  fallback: T | (() => T),
  isValid: (value: unknown) => value is T,
  options: { legacyRaw?: boolean } = {},
): Preference<T> {
  return {
    read() {
      try {
        const raw = localStorage.getItem(key);
        if (raw !== null) {
          let value: unknown;
          try {
            value = JSON.parse(raw);
          } catch {
            if (!options.legacyRaw || !isValid(raw)) {
              throw new Error("Invalid preference encoding");
            }
            value = raw;
            this.write(raw);
          }
          if (isValid(value)) {
            return value;
          }
        }
      } catch {
        // Unavailable storage or a corrupt entry falls back to the default.
      }
      return typeof fallback === "function" ? (fallback as () => T)() : fallback;
    },
    write(value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch {
        // Persistence is optional.
        return false;
      }
    },
  };
}
