import { PostMeta } from "@/lib/posts";
import Link from "next/link";
import ToolBadge from "./toolBadge";

export default function PostCard({ post, className = "", locale }: { post: PostMeta, className?: string, locale: string }) {
    return (
        <div className={`relative flex flex-col items-center rounded-[20px] shadow-lg cursor-pointer z-[1] overflow-hidden group ${className}`}>
            <img
                decoding="async"
                src={post.image}
                alt={post.title}
                loading='lazy'
                className="absolute top-0 left-0 w-full h-full rounded-[20px] object-cover z-[-1] transition-transform duration-300 ease-in-out group-hover:scale-110"
            />
            <div className="visible relative flex flex-col justify-between w-full h-full p-[10px] transition-opacity duration-200 ease-in-out before:absolute before:top-0 before:left-0 before:content-[''] before:w-full before:h-full before:rounded-[20px] before:bg-black before:opacity-50 before:z-[-1]">
                <div className="flex justify-end p-[10px]">
                    {post.demo && (
                        <a
                            title='DemoProject'
                            className="block w-5 h-5 transition-colors duration-300 ease-in-out hover:fill-[var(--Blue-Hover)]"
                            target="_blank"
                            href={post.demo}
                        >
                            <svg className="fill-[var(--White)] w-5 h-5 hover:fill-[var(--Blue-Hover)] transition-colors duration-300 ease-in-out">
                                <use href="/assets/Icons/Icons.svg#link" />
                            </svg>
                        </a>
                    )}
                </div>
                <div className="flex items-end justify-between p-[10px]">
                    <div className="flex flex-col justify-end flex-wrap">
                        <Link href={`/${locale}/blog/${post.slug}`} className="underline text-[var(--Blue)] hover:text-[var(--Blue-Hover)]">
                            <h3 className="text-[var(--White)] text-[min(35px,7vw)] font-semibold">{post.title}</h3>
                        </Link>
                        <ul className="flex flex-wrap gap-[10px]">
                            {post.languages?.map((lang, index) => (
                                <ToolBadge key={index} icon={<svg className="w-4 h-4">
                                    <use href={`/assets/Icons/Icons.svg?${Date.now()}#${lang}`} />
                                </svg>} name={lang} />
                            ))}
                        </ul>
                    </div>
                    {post.github && (
                            <a
                                title='RepositoryGitHub'
                                target="_blank"
                                href={post.github}
                            >
                                <svg className="fill-[var(--White)] w-7 h-7 hover:fill-[var(--Blue-Hover)] transition-colors duration-300 ease-in-out">
                                    <use href="/assets/Icons/Icons.svg#github" />
                                </svg>
                            </a>
                    )}
                </div>
            </div>
        </div>
    );
}