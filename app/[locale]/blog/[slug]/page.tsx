import { getPostBySlug } from "@/app/lib/posts";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import { Components } from "react-markdown";
import Layout from "@/app/components/layout/Layout";
import LinkDemo from "@/app/components/blog-slug/linkDemo";
import LinkGitHub from "@/app/components/blog-slug/linkGitHub";
import { Metadata } from "next";
import ToolBadge from "@/app/components/toolBadge";
import { Icon, IconName } from "@/app/components/Icon";

// Componentes personalizados para ReactMarkdown
const components: Components = {
  h1: ({ children }) => (
    <h1 className="text-3xl font-bold mb-6 mt-8 text-gray-900 dark:text-white border-b-2 border-blue-500 pb-2">
      {children}
    </h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[var(--Grey-Dark)] text-2xl font-bold  mb-6">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[var(--Grey-Dark)] text-xl font-semibold mb-6">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="text-[var(--Grey-Dark)] text-base font-normal mb-8">
      {children}
    </p>
  ),
  strong: ({ children }) => (
    <strong className="text-[var(--Blue)]">
      {children}
    </strong>
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-[3.125rem] pb-4">
      {children}
    </ul>
  ),
  li: ({ children }) => (
    <li className="text-[var(--Grey-Dark)] text-base font-normal mb-5">
      {children}
    </li>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline transition-colors"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
  code: ({ children }) => (
    <code className="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono text-gray-800 dark:text-gray-200">
      {children}
    </code>
  ),
  pre: ({ children }) => (
    <pre className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg mb-4 overflow-x-auto">
      {children}
    </pre>
  ),
  blockquote: ({ children }) => (
    <blockquote className="border-l-4 border-blue-500 pl-4 py-2 mb-4 bg-blue-50 dark:bg-blue-900/20 italic text-gray-700 dark:text-gray-300">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    <picture>
      <img
        src={src} alt={alt}
        className="w-fit max-h-[500px] h-full rounded-3xl mx-auto"
      />
    </picture>
  ),
};

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string; locale: string }>
}): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Entrada no encontrada | Kevin Julio Pineda Portfolio',
      description: 'La entrada del blog que buscas no existe.',
    };
  }

  const description = post.description;
  const title = post.title;

  const baseUrl = "https://kevinjp.dev";
  const currentUrl = locale === 'es' ? `${baseUrl}/es/blog/${slug}` : `${baseUrl}/en/blog/${slug}`;

  return {
    title: `${title} | Kevin Julio Pineda Portfolio`,
    description,
    authors: [{ name: 'Kevin Julio Pineda' }],
    creator: 'Kevin Julio Pineda',
    publisher: 'Kevin Julio Pineda',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: currentUrl,
      languages: {
        "en": `${baseUrl}/en/blog/${slug}`,
        "es": `${baseUrl}/es/blog/${slug}`,
      },
    },
    openGraph: {
      title: post.title,
      description,
      url: `${locale}/blog/${slug}`,
      siteName: 'Kevin Julio Pineda Portfolio',
      images: [
        {
          url: post.image || 'https://c98agni2tvccp34z.public.blob.vercel-storage.com/KevinJP-5hmwapH3CNtol4B4NGZKO6cZY7Ruvq.avif', // Imagen por defecto
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
      locale: locale,
      type: 'article',
      publishedTime: post.publishedTime,
      modifiedTime: post.modifiedTime,
      authors: ['Kevin Julio Pineda'],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description,
      images: [post.image || 'https://c98agni2tvccp34z.public.blob.vercel-storage.com/KevinJP-5hmwapH3CNtol4B4NGZKO6cZY7Ruvq.avif'],
      creator: '@kevinjpdev',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return notFound();

  return (
    <Layout>
      <article className="max-w-article-screen-full mt-[6.25rem] min-md:mt-[3.125rem] px-5 mx-auto">
        <header className="mb-9">
          <h1 className="text-[var(--Grey-Dark)] text-[min(40px,7vw)] font-semibold">
            {post.title}
          </h1>
          <div className="flex gap-5">
            {post.github && <LinkGitHub link={post.github} />}
            {post.demo && (<LinkDemo link={post.demo} />)}
          </div>
          <ul className="flex flex-wrap gap-[10px] mt-5 mb-4">
            {post.languages?.map((lang, index) => (
              <ToolBadge key={index} icon={<Icon name={lang as IconName} className="w-4 h-4" />} name={lang} />
            ))}
          </ul>
          <div className="text-end">
            <span className="text-[var(--Grey-Dark)] text-base font-semibold">
              {new Date(post.publishedTime).toLocaleDateString(locale as string, {
                day: '2-digit',
                month: 'long',
                year: 'numeric',
              })}
            </span>
          </div>
        </header>
        <div className="markdown-content">
          <ReactMarkdown components={components}>{post.content}</ReactMarkdown>
        </div>
      </article>
    </Layout>
  );
}
