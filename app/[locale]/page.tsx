import Layout from "@/app/components/layout/Layout";
import About from "@/app/sections/Home/About";
import Hero from "@/app/sections/Home/Hero";
import Projects from "@/app/sections/Home/Projects";
import Skills from "@/app/sections/Home/Skills";
import ScrollToSection from "@/app/components/ScrollToSection";
import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";
import { Metadata } from "next";

interface Messages extends AbstractIntlMessages {
  Home: {
    metaData: {
      title: string;
      description: string;
    };
  };
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const messages = await getMessages({locale}) as Messages;
  const title = messages.Home.metaData?.title;
  const description = messages.Home.metaData?.description;
  const baseUrl = "https://kevinjp.dev";
  const currentUrl = locale === 'es' ? `${baseUrl}/es` : `${baseUrl}/en`;

  return {
    title: `${title}`,
    description,
    authors: [{ name: 'Kevin Julio Pineda' }],
    creator: 'Kevin Julio Pineda',
    publisher: 'Kevin Julio Pineda',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL('https://kevinjp.dev'),
    alternates: {
      canonical: currentUrl,
      languages: {
        "x-default": `${baseUrl}/es`,
        "en": `${baseUrl}/en`,
        "es": `${baseUrl}/es`,
      },
    },
    openGraph: {
      title: `${title}`,
      description,
      url: currentUrl,
      siteName: 'Kevin Julio Pineda Portfolio',
      locale: locale,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title}`,
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
  
export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  
  return (
    <Layout>
      <ScrollToSection />
      <Hero />
      <About />
      <Projects params={{locale}} />
      <Skills />
    </Layout>
  );
}

