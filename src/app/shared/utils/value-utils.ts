export function normalizeCurrencyValue(
  value: string,
  toUrl: boolean = false
): string {
  if (!value) return '';

  if (toUrl) {
    return value.replace(/\./g, '').replace(',', '.');
  } else {
    return value.replace('.', ',');
  }
}
