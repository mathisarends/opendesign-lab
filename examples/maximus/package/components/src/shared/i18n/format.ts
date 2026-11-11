import { getLocale } from "./locale";

const time = new Intl.DateTimeFormat(getLocale(), { hour: "2-digit", minute: "2-digit" });
const date = new Intl.DateTimeFormat(getLocale(), { dateStyle: "medium" });
const dateTime = new Intl.DateTimeFormat(getLocale(), { dateStyle: "medium", timeStyle: "short" });
const number = new Intl.NumberFormat(getLocale());
const relative = new Intl.RelativeTimeFormat(getLocale(), { numeric: "auto" });

const relativeUnits: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 31_536_000],
  ["month", 2_592_000],
  ["week", 604_800],
  ["day", 86_400],
  ["hour", 3_600],
  ["minute", 60],
];

function relativeTime(value: Date | number | string): string {
  const seconds = (new Date(value).getTime() - Date.now()) / 1000;
  const [unit, size] = relativeUnits.find(([, size]) => Math.abs(seconds) >= size) ?? ["second", 1];
  return relative.format(Math.round(seconds / size), unit);
}

export const format = {
  time: (value: Date | number) => time.format(value),
  date: (value: Date | number | string) => date.format(new Date(value)),
  dateTime: (value: Date | number | string) => dateTime.format(new Date(value)),
  relative: relativeTime,
  number: (value: number) => number.format(value),
};
