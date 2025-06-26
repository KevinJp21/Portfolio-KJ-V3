import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://kevinjp.dev';
  
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/es/', '/en/', '/es/blog/', '/en/blog/'],
        disallow: ['/api/', '/admin/', '/private/'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
} 