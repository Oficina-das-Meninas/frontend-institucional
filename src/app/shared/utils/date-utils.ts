export function toLocalDate(date: Date) {
  return date.toISOString().split('T')[0];
}
