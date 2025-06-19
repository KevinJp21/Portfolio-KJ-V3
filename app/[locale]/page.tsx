import Layout from "@/components/layout/Layout";
import About from "@/sections/Home/Hero/About";
import Hero from "@/sections/Home/Hero/Hero";
import Projects from "@/sections/Home/Hero/Projects";
import { AbstractIntlMessages } from "next-intl";
import { getMessages } from "next-intl/server";

interface Messages extends AbstractIntlMessages {
  Home: {
    metaData: {
      title: string;
      description: string;
    };
  };
}

export async function generateMetadata({params}: {params: Promise<{locale: string}>;}) {
  const { locale } = await params;
  const messages = await getMessages({locale}) as Messages;
  const title = messages.Home.metaData?.title;
  const description = messages.Home.metaData?.description;
  const url = "https://kevinjp.dev/";
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        "en": `${url}en`,
        "es": `${url}es`,
      },
    },
    openGraph: {
      title,
      description,
      images: [
        {url: `${url}og.png`},
      ],
    },
  }
}
  
export default async function Home({params}: {params: Promise<{locale: string}>}) {
  const { locale } = await params;
  
  return (
    <Layout>
      <Hero />
      <About />
      <Projects params={{locale}} />
    </Layout>
  );
}

