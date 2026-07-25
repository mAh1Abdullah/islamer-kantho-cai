/**
 * Shared GROQ field fragments. Every query module below composes these
 * instead of re-listing fields, so a schema change is a one-file edit.
 */

export const categoryFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  description
`;

export const authorFragment = /* groq */ `
  _id,
  name,
  "slug": slug.current,
  avatar
`;

/** Fields needed for card/list views — no `body`, keeps list queries light. */
export const postSummaryFragment = /* groq */ `
  _id,
  title,
  "slug": slug.current,
  excerpt,
  coverImage,
  publishedAt,
  updatedAt,
  featured,
  category->{ ${categoryFragment} },
  author->{ ${authorFragment} }
`;

/** Full fields for a single article page. */
export const postDetailFragment = /* groq */ `
  ${postSummaryFragment},
  body
`;
