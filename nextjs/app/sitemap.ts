import type { MetadataRoute } from 'next';
import { projects } from '@/data/caseStudies';

export const dynamic = 'force-static';

const site = 'https://dipeshshrestha69.com.np';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site, changeFrequency: 'monthly', priority: 1 },
    ...Object.keys(projects).map((project) => ({
      url: `${site}/case-study/${project}`,
      changeFrequency: 'yearly' as const,
      priority: 0.7,
    })),
  ];
}
