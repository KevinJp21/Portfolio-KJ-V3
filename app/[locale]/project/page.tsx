import { getAllPosts } from '@/lib/posts';
import Link from 'next/link';

export default async function ProjectIndex({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {posts.map((post) => (
        <div key={post.slug} className="rounded-xl overflow-hidden shadow-lg bg-neutral-900 relative">
          <img src={post.image} alt={post.title} className="w-full h-64 object-cover" />
          <div className="p-4">
            <h2 className="text-2xl font-bold text-white mb-2">
              <Link href={`/${locale}/project/${post.slug}`}>{post.title}</Link>
            </h2>
            <div className="flex flex-wrap gap-2 mb-2">
              {post.languages.map((lang: string) => (
                <span key={lang} className="bg-blue-700 text-white px-2 py-1 rounded text-xs">{lang}</span>
              ))}
            </div>
            <p className="text-gray-300">{post.date}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
