import { createClient, type ClientConfig } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

const config: ClientConfig = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ?? '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2025-01-01',
  useCdn: process.env.NODE_ENV === 'production',
};

export const sanityClient = createClient(config);

const builder = imageUrlBuilder(sanityClient);

/** Build an optimized Sanity image URL. Pass width/height for exact crops. */
export function urlForImage(source: Parameters<typeof builder.image>[0]) {
  return builder.image(source);
}
