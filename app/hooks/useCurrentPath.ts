"use client";
import { usePathname } from "next/navigation";

export function useCurrentPath() {
  const pathname = usePathname();
  
  const isHomePage = (locale: string) => {
    return pathname === `/${locale}` || pathname === `/${locale}/`;
  };
  
  const isBlogPage = (locale: string) => {
    return pathname.startsWith(`/${locale}/blog`);
  };
  
  const isArticlePage = (locale: string) => {
    return pathname.match(new RegExp(`^/${locale}/blog/[^/]+$`));
  };
  
  return {
    pathname,
    isHomePage,
    isBlogPage,
    isArticlePage
  };
} 