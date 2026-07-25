/** Slugifies a heading's text for use as an anchor id, kept stable across renders. */
export function slugify(text: string): string {
  return text
    .trim()
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^\w\u0980-\u09FF-]/g, ''); // keep word chars, Bangla Unicode block, and hyphens
}
