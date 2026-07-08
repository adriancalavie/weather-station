export function compact<T extends Record<string, unknown>>(obj: T) {
  return Object.fromEntries(Object.entries(obj).filter(([, v]) => v != null)) as {
    [K in keyof T]: NonNullable<T[K]>;
  };
}
