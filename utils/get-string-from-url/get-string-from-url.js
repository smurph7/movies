export function getStringFromUrl(string) {
  const splitString = string?.split('-');
  return (
    splitString?.map(word => word[0].toUpperCase() + word.slice(1)).join(' ') ??
    ''
  );
}
