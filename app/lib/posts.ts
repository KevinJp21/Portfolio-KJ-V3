import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'posts');

export interface PostMeta {
  slug: string;
  title: string;
  publishedTime: string;
  modifiedTime: string;
  image: string;
  languages: string[];
  demo?: string;
  github?: string;
  description: string;
  keywords: string;
}

export interface Post extends PostMeta {
  content: string;
}

export function getAllPosts(locale: string = 'es'): PostMeta[] {
  const localePostsDirectory = path.join(postsDirectory, locale);
  
  // Verificar si existe el directorio del idioma
  if (!fs.existsSync(localePostsDirectory)) {
    return [];
  }
  
  const fileNames = fs.readdirSync(localePostsDirectory);
  return fileNames.map((fileName) => {
    const slug = fileName.replace(/\.md$/, '');
    const fullPath = path.join(localePostsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      title: data.title,
      publishedTime: data.publishedTime,
      modifiedTime: data.modifiedTime,
      image: data.image,
      languages: data.languages,
      demo: data.demo,
      github: data.github,
      description: data.description,
      keywords: data.keywords,
    };
  });
}

export function getPostBySlug(slug: string, locale: string = 'es'): Post | null {
  const localePostsDirectory = path.join(postsDirectory, locale);
  const fullPath = path.join(localePostsDirectory, `${slug}.md`);
  
  // Verificar si existe el archivo
  if (!fs.existsSync(fullPath)) {
    return null;
  }
  
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  return {
    slug,
    title: data.title,
    publishedTime: data.publishedTime,
    modifiedTime: data.modifiedTime,
    image: data.image,
    languages: data.languages,
    demo: data.demo,
    github: data.github,
    description: data.description,
    keywords: data.keywords,
    content,
  };
}