import PostCard from "@/components/postCard";
import { getAllPosts } from "@/lib/posts";
import { useTranslations } from "next-intl";
import { slugMapping } from '@/config/slugMapping';


function ProjectTitle() {
    const t = useTranslations('Projects');
    return <h2 className="home-title">{t('title')}</h2>;
}
export default async function Projects({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const posts = getAllPosts(locale);

    // Definir el orden específico usando las claves del mapeo
    const desiredOrder = [
        "chikos-gourmet",
        "verezza-e-commerce",
        "2", 
        "3", 
        "4", 
        "5"
    ];

    // Ordenar los posts según el orden deseado
    const sortedPosts = desiredOrder
        .map(key => {
            const mappedSlug = slugMapping[key as keyof typeof slugMapping]?.[locale as 'en' | 'es'] || key;
            return posts.find(post => post.slug === mappedSlug);
        })
        .filter((post): post is NonNullable<typeof post> => post !== undefined);

    return (
        <section className="container-section">
            <ProjectTitle />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(20%,1fr))] auto-rows-[minmax(240px,auto)] gap-2.5 w-full py-5">
                {sortedPosts.map((post) => {
                    // Definir clases específicas para cada card basado en el slug
                    const cardClasses = {
                        "chikos-gourmet": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2", // Primer proyecto (grande)
                        "verezza-e-commerce": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2", // Segundo proyecto
                        "2": "col-span-4 row-span-1 min-[39.063rem]:col-start-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-1", // Tercer proyecto
                        "3": "col-span-4 row-span-1 min-[39.063rem]:col-start-3 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-1", // Cuarto proyecto
                        "4": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2 min-[57.75rem]:col-span-1 min-[57.75rem]:row-span-2", // Quinto proyecto
                        "5": "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2 min-[57.75rem]:col-span-3 min-[57.75rem]:row-span-2", // Sexto proyecto
                    }[post.slug] || "col-span-2 row-span-2";

                    return (
                        <div key={post.slug} className={cardClasses}>
                            <PostCard post={post} className="h-full" locale={locale}/>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}