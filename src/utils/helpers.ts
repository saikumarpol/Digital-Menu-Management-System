export function groupBy<T>(array: T[], key: keyof T): Record<string, T[]> {
  const result: Record<string, T[]> = {};
  for (const item of array) {
    const group = String(item[key]);
    result[group] ??= [];
    result[group].push(item);
  }
  return result;
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
