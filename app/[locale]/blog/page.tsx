import Layout from "@/components/layout/Layout";
import { getAllPosts } from "@/lib/posts";
import BlogWithFilters from "@/components/blog/BlogWithFilters";

export default async function Blog({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <Layout>
      <BlogWithFilters posts={posts} locale={locale} />
    </Layout>
  );
}
