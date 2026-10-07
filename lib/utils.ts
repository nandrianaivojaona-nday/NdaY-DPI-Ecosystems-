export type ClassValue = string | number | null | false | undefined | ClassValue[] | { [key: string]: unknown };

function toClasses(value: ClassValue): string[] {
  if (!value) return [];
  if (typeof value === "string" || typeof value === "number") return [String(value)];
  if (Array.isArray(value)) return value.flatMap(toClasses);
  return Object.entries(value).filter(([, v]) => Boolean(v)).map(([k]) => k);
}

export function cn(...inputs: ClassValue[]): string {
  return inputs.flatMap(toClasses).join(" ");
}
