import { MetadataRoute } from 'next';
import { getAllPosts } from './lib/posts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://kevinjp.dev';
  
  // URLs estáticas
  const staticUrls = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/es`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/en`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/es/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
  ];

  // URLs de posts con manejo de errores
  let postUrlsEs: MetadataRoute.Sitemap = [];
  let postUrlsEn: MetadataRoute.Sitemap = [];

  try {
    const postsEs = getAllPosts('es');
    postUrlsEs = postsEs.map((post) => ({
      url: `${baseUrl}/es/blog/${post.slug}`,
      lastModified: new Date(post.publishedTime),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error getting Spanish posts:', error);
  }

  try {
    const postsEn = getAllPosts('en');
    postUrlsEn = postsEn.map((post) => ({
      url: `${baseUrl}/en/blog/${post.slug}`,
      lastModified: new Date(post.publishedTime),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    }));
  } catch (error) {
    console.error('Error getting English posts:', error);
  }

  return [...staticUrls, ...postUrlsEs, ...postUrlsEn];
} 