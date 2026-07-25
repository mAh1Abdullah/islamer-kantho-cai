export interface SanityImage {
  asset: { _ref: string; _id?: string };
  alt?: string;
  hotspot?: { x: number; y: number };
}

export interface Category {
  _id: string;
  title: string;
  slug: string;
  description?: string;
}

export interface Author {
  _id: string;
  name: string;
  slug: string;
  avatar?: SanityImage;
  bio?: unknown[]; // Portable Text
}

export interface PortableTextBlock {
  _type: string;
  _key: string;
  [key: string]: unknown;
}

export interface Post {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  coverImage: SanityImage;
  category: Category;
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  body: PortableTextBlock[];
  featured?: boolean;
}

/** Lightweight shape used on cards/lists — avoids fetching full `body`. */
export type PostSummary = Omit<Post, 'body'>;

export interface PaginatedResult<T> {
  items: T[];
  total: number;
  hasMore: boolean;
}
