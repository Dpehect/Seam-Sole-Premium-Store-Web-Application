import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://seam-and-sole.example.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/checkout', '/order-success', '/admin']
    },
    sitemap: `${baseUrl}/sitemap.xml`
  };
}
