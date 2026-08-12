type ClassValue = string | false | null | undefined;

/** Minimal class-name joiner — keeps component markup readable. */
export function cn(...values: ClassValue[]): string {
  return values.filter(Boolean).join(' ');
}
