export function truncate(text: string): string {
  const maxLength = 92; // can be changed, don't set over 200 to avoid ui problems!
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + '...';
}