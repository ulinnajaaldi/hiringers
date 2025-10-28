export const preprocessStringToNumber = (val: any) => {
  if (!val) {
    return undefined;
  }

  if (typeof val === "string" && !isNaN(Number(val))) {
    return Number(val);
  }

  return val;
};

export function formatNumber(value: number | string): string {
  if (value === "" || value === null || value === undefined) return "";

  const numValue = typeof value === "string" ? parseFloat(value) : value;

  if (isNaN(numValue)) return "";

  return numValue.toLocaleString("id-ID");
}

export function parseFormattedNumber(value: string): number {
  if (!value) return 0;

  const cleaned = value.replace(/\./g, "");
  const parsed = parseFloat(cleaned);

  return isNaN(parsed) ? 0 : parsed;
}
