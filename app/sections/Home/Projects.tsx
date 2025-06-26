import PostCard from "@/app/components/postCard";
import { getAllPosts } from "@/app/lib/posts";
import { useTranslations } from "next-intl";
import { slugMapping } from '@/app/config/slugMapping';
import Link from "next/link";
import { useLocale } from "next-intl";


function ProjectTitle() {
    const t = useTranslations('Projects');
    return <h2 className="home-title">{t('title')}</h2>;
}

function ViewAllProjects() {
    const locale = useLocale();
    const t = useTranslations('Projects');
    return (
        <div className="flex items-center justify-center ">
            <div className="relative group">
                <Link
                    className="relative inline-block p-px font-semibold leading-6 text-white bg-neutral-900 shadow-lg cursor-pointer rounded-2xl shadow-blue-500/30 transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 hover:shadow-blue-500/40"
                    href={`/${locale}/blog`}
                >
                    <span
                        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-950 to-blue-400 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    ></span>
                    <span className="relative z-10 block px-6 py-2 rounded-2xl bg-neutral-950">
                        <div className="relative z-10 flex items-center space-x-3">
                            <span
                                className="text-sm transition-all duration-500 group-hover:translate-x-1.5 "
                            >{t('viewAll')}</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-7 h-7 transition-all duration-500 group-hover:translate-x-1.5 group-hover:text-blue-400"
                            >
                                <path
                                    d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z"
                                ></path>
                            </svg>
                        </div>
                    </span>
                </Link>
            </div>
        </div>
    );
}

export default async function Projects({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const posts = getAllPosts(locale);

    // Definir el orden específico usando las claves del mapeo
    const desiredOrder = [
        "chikos-gourmet",
        "ferreteria-rueda",
        "2",
        "3",
        "docme-assistant-chatbot",
        "verezza-e-commerce"
    ];

    // Ordenar los posts según el orden deseado
    const sortedPosts = desiredOrder
        .map(key => {
            const mappedSlug = slugMapping[key as keyof typeof slugMapping]?.[locale as 'en' | 'es'] || key;
            const post = posts.find(post => post.slug === mappedSlug);
            return post ? { post, mappingKey: key } : null;
        })
        .filter((item): item is NonNullable<typeof item> => item !== null);

    return (
        <section id="projects" className="container-section lazy-section">
            <ProjectTitle />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(20%,1fr))] auto-rows-[minmax(240px,auto)] gap-2.5 w-full py-5">
                {sortedPosts.map(({ post, mappingKey }) => {
                    // Definir clases específicas para cada card basado en la clave del mapeo
                    const cardClasses = {
                        "chikos-gourmet": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2", // Primer proyecto (grande)
                        "ferreteria-rueda": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2", // Segundo proyecto
                        "2": "col-span-4 row-span-1 min-[39.063rem]:col-start-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-1", // Tercer proyecto
                        "3": "col-span-4 row-span-1 min-[39.063rem]:col-start-3 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-1", // Cuarto proyecto
                        "docme-assistant-chatbot": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2 min-[57.75rem]:col-span-1 min-[57.75rem]:row-span-2", // Quinto proyecto
                        "verezza-e-commerce": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2 min-[57.75rem]:col-span-3 min-[57.75rem]:row-span-2", // Sexto proyecto
                    }[mappingKey] || "col-span-2 row-span-2";

                    return (
                        <div key={post.slug} className={cardClasses}>
                            <PostCard post={post} className="h-full" locale={locale} />
                        </div>
                    );
                })}
            </div>
            <ViewAllProjects />
        </section>
    );
}