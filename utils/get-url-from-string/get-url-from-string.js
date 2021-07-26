export function getUrlFromString(string) {
  if (!string) return '';

  return string
    .toLowerCase()
    .trim()
    .replace(/_/g, '-')
    .replace(/\s/g, '-')
    .replace(/[^\w-]/gi, '')
    .replace(/-{2,}/g, '-');
}
