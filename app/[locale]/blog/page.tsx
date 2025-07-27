import Layout from "@/app/components/layout/Layout";
import { getAllPosts } from "@/app/lib/posts";
import BlogWithFilters from "@/app/components/blog/BlogWithFilters";
import { Metadata } from "next";
import { getMessages } from "next-intl/server";
import { AbstractIntlMessages } from "next-intl";

interface Messages extends AbstractIntlMessages {
  Blog: {
    metaData: {
      title: string;
      description: string;
    };
  };
}

const baseUrl = "https://kevinjp.dev";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({ locale }) as Messages;

  const title = messages.Blog.metaData?.title;
  const description = messages.Blog.metaData?.description;

  const currentUrl = locale === 'es' ? `${baseUrl}/es/blog` : `${baseUrl}/en/blog`;

  return {
    title: `${title} | Kevin Julio Pineda Portfolio`,
    description,
    authors: [{ name: 'Kevin Julio Pineda' }],
    creator: 'Kevin Julio Pineda',
    publisher: 'Kevin Julio Pineda',
    metadataBase: new URL(baseUrl),
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    alternates: {
      canonical: currentUrl,
      languages: {
        "x-default": `${baseUrl}/es/blog`,
        "en": `${baseUrl}/en/blog`,
        "es": `${baseUrl}/es/blog`,
      },
    },
    openGraph: {
      title: `${title} | Kevin Julio Pineda Portfolio`,
      description,
      url: currentUrl,
      siteName: 'Kevin Julio Pineda Portfolio',
      locale: locale === 'es' ? 'es_ES' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Kevin Julio Pineda Portfolio`,
      description,
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

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <Layout>
      <BlogWithFilters posts={posts} locale={locale} />
    </Layout>
  );
}
