'use client';
import { useState, useMemo } from 'react';
import { PostMeta } from '@/lib/posts';
import PostCard from '@/components/postCard';
import BlogFilters from './BlogFilters';

interface BlogWithFiltersProps {
  posts: PostMeta[];
  locale: string;
}

export default function BlogWithFilters({ posts, locale }: BlogWithFiltersProps) {
  const [filters, setFilters] = useState({
    sortBy: 'newest' as 'newest' | 'oldest',
    technologies: [] as string[]
  });

  // Obtener todas las tecnologías únicas
  const allTechnologies = useMemo(() => {
    const techs = new Set<string>();
    posts.forEach(post => {
      post.languages?.forEach(lang => techs.add(lang));
    });
    return Array.from(techs).sort();
  }, [posts]);

  // Filtrar y ordenar posts
  const filteredPosts = useMemo(() => {
    let filtered = [...posts];

    // Filtrar por tecnología
    if (filters.technologies.length > 0) {
      filtered = filtered.filter(post => 
        filters.technologies.some(tech => post.languages?.includes(tech))
      );
    }

    // Ordenar por fecha
    filtered.sort((a, b) => {
      const dateA = new Date(a.publishedTime).getTime();
      const dateB = new Date(b.publishedTime).getTime();
      return filters.sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return filtered;
  }, [posts, filters]);

  return (
    <div className="max-w-[1440px] mx-auto flex mt-[6.25rem] min-md:mt-0 w-full flex-col min-[50rem]:flex-row gap-4 h-full py-8 px-5">
      <BlogFilters 
        technologies={allTechnologies}
        onFilterChange={setFilters}
      />
      
      {filteredPosts.length === 0 ? (
        <div className="text-center py-12 w-full">
          <p className="text-[var(--Grey-Dark)] text-lg">
            No se encontraron posts con los filtros seleccionados.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 auto-rows-[200px] min-[50rem]:grid-cols-2 gap-8 [&>_div]:row-span-2 [&>_div]:col-span-1">
          {filteredPosts.map((post) => (
            <PostCard key={post.slug} post={post} locale={locale} />
          ))}
        </div>
      )}
    </div>
  );
} 