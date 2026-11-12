import { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/dhbvn-config';
import { NON_FARIDABAD_SLUGS } from '@/lib/district-slug';

export const revalidate = 3600;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = SITE_URL.replace(/\/+$/, '');

  const districtPages: MetadataRoute.Sitemap = NON_FARIDABAD_SLUGS.map((slug) => ({
    url: `${baseUrl}/${slug}`,
    lastModified: now,
    changeFrequency: 'hourly' as const,
    priority: 0.8,
  }));

  const historyPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/history`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.7,
    },
    ...NON_FARIDABAD_SLUGS.map((slug) => ({
      url: `${baseUrl}/${slug}/history`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 0.6,
    })),
  ];

  return [
    {
      url: `${baseUrl}/`,
      lastModified: now,
      changeFrequency: 'hourly' as const,
      priority: 1.0,
    },
    ...districtPages,
    ...historyPages,
  ];
}
