import Layout from "@/components/layout/Layout";
import Hero from "@/sections/Home/Hero/Hero";
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
  
  return {
    title,
    description,
    alternates: {
      canonical: "https://kevinjp.dev/",
      languages: {
        "en": "https://kevinjp.dev/en",
        "es": "https://kevinjp.dev/es",
      },
    },
    openGraph: {
      title,
      description,
      images: [
        {url: "https://kevinjp.dev/og.png"},
      ],
    },
  }
}
  
export default async function Home() {
  return (
    <Layout>
      <Hero />
    </Layout>
  );
}

