import fs from 'fs';
import path from 'path';
import { getAllPosts } from '../app/lib/posts';

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
  alternateRefs?: Array<{
    href: string;
    hreflang: string;
  }>;
}

function generateRobotsTxt(): void {
  const baseUrl = 'https://kevinjp.dev';

  const robotsTxt = `User-agent: *
Allow: /

# Disallow error pages
Disallow: /404
Disallow: /500

# Sitemap
Sitemap: ${baseUrl}/sitemap.xml
`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  fs.writeFileSync(path.join(publicDir, 'robots.txt'), robotsTxt);
  console.log('✅ robots.txt generado');
}

function generateSitemap(): void {
  const baseUrl = 'https://kevinjp.dev';
  const sitemapUrls: SitemapUrl[] = [];

  // URLs estáticas - prioridad a las páginas de idioma específico
  const staticUrls = [
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

  // Agregar URLs estáticas al sitemap
  for (const staticUrl of staticUrls) {
    sitemapUrls.push({
      loc: staticUrl.url,
      lastmod: staticUrl.lastModified.toISOString(),
      changefreq: staticUrl.changeFrequency,
      priority: staticUrl.priority,
      alternateRefs: [
        { href: `${baseUrl}/en`, hreflang: 'en' },
        { href: `${baseUrl}/es`, hreflang: 'es' },
      ],
    });
  }

  // URLs de posts con manejo de errores - exactamente como en tu ejemplo
  let postUrlsEs: SitemapUrl[] = [];
  let postUrlsEn: SitemapUrl[] = [];

  try {
    const postsEs = getAllPosts('es');
    postUrlsEs = postsEs.map((post) => ({
      loc: `${baseUrl}/es/blog/${post.slug}`,
      lastmod: new Date(post.modifiedTime).toISOString(),
      changefreq: 'monthly',
      priority: 0.6,
      alternateRefs: [
        { href: `${baseUrl}/en/blog/${post.slug}`, hreflang: 'en' },
        { href: `${baseUrl}/es/blog/${post.slug}`, hreflang: 'es' },
      ],
    }));
  } catch (error) {
    console.error('Error getting Spanish posts:', error);
  }

  try {
    const postsEn = getAllPosts('en');
    postUrlsEn = postsEn.map((post) => ({
      loc: `${baseUrl}/en/blog/${post.slug}`,
      lastmod: new Date(post.modifiedTime).toISOString(),
      changefreq: 'monthly',
      priority: 0.6,
      alternateRefs: [
        { href: `${baseUrl}/en/blog/${post.slug}`, hreflang: 'en' },
        { href: `${baseUrl}/es/blog/${post.slug}`, hreflang: 'es' },
      ],
    }));
  } catch (error) {
    console.error('Error getting English posts:', error);
  }

  // Combinar todas las URLs
  const allUrls = [...sitemapUrls, ...postUrlsEs, ...postUrlsEn];

  // Generar XML
  let xml = `<?xml version="1.0" encoding="UTF-8"?>\n`;
  xml += `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"\n`;
  xml += `        xmlns:xhtml="http://www.w3.org/1999/xhtml">\n`;

  for (const url of allUrls) {
    xml += `  <url>\n`;
    xml += `    <loc>${url.loc}</loc>\n`;
    xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
    xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
    xml += `    <priority>${url.priority}</priority>\n`;

    if (url.alternateRefs) {
      for (const alt of url.alternateRefs) {
        xml += `    <xhtml:link rel="alternate" hreflang="${alt.hreflang}" href="${alt.href}" />\n`;
      }
    }

    xml += `  </url>\n`;
  }

  xml += `</urlset>\n`;

  const publicDir = path.join(process.cwd(), 'public');
  if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), xml);
  console.log('sitemap.xml generado');
  console.log(`Total de URLs: ${allUrls.length}`);

  generateRobotsTxt();
}

if (require.main === module) {
  generateSitemap();
}

export { generateSitemap, generateRobotsTxt };
