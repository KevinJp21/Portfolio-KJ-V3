import { getPostBySlug } from '@/lib/posts';
import { notFound } from 'next/navigation';
import { remark } from 'remark';
import html from 'remark-html';
import Link from 'next/link';

export default async function BlogPost({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = await params;
  const post = getPostBySlug(slug, locale);
  if (!post) return notFound();

  const processedContent = await remark().use(html).process(post.content);
  const contentHtml = processedContent.toString();

  return (
    <article className="prose mx-auto">
      <h1>{post.title}</h1>
      {post.github && <Link href={post.github}>Github</Link>}
      <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
    </article>
  );
}
