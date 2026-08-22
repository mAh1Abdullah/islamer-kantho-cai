import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const rawProjectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID?.trim() ?? '';
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET?.trim() ?? 'production';

const isValidSanityProjectId = (id: string): boolean => /^[a-z0-9-]+$/.test(id);
export const isSanityConfigured = Boolean(rawProjectId && isValidSanityProjectId(rawProjectId));

const config: ClientConfig = {
  projectId: isSanityConfigured ? rawProjectId : 'dummy-project-id',
  dataset,
  apiVersion: '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export interface SanityClientLike {
  fetch<T = unknown>(query: string, params?: Record<string, unknown>): Promise<T>;
}

export const sanityClient: SanityClientLike = isSanityConfigured
  ? (createClient(config) as SanityClientLike)
  : {
      fetch: async <T = unknown>(_query: string, _params?: Record<string, unknown>) => [] as T,
    };

const builder = isSanityConfigured ? imageUrlBuilder(sanityClient as never) : null;

export async function fetchSanity<T = unknown>(
  query: string,
  params?: Record<string, unknown>,
  fallback?: T
): Promise<T> {
  try {
    return await sanityClient.fetch<T>(query, params);
  } catch {
    return (fallback ?? ([] as T)) as T;
  }
}

/** Build an optimized Sanity image URL. Pass width/height for exact crops. */
export function urlForImage(source: unknown) {
  if (!builder || !isSanityConfigured) return '';
  return builder.image(source as never);
}
