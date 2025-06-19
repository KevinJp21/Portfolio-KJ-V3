import PostCard from "@/components/postCard";
import { getAllPosts } from "@/lib/posts";
import { useTranslations } from "next-intl";

// Componente cliente para las traducciones

function ProjectTitle() {
    const t = useTranslations('Projects');
    return <h2 className="home-title">{t('title')}</h2>;
}

// Componente servidor para los posts
export default async function Projects({ params }: { params: { locale: string } }) {
    const { locale } = params;
    const posts = getAllPosts(locale);

    return (
        <section className="flex flex-col items-center justify-center min-h-fit py-8 px-5 max-w-[1440px] w-full mx-auto">
            <ProjectTitle />
            <div className="grid grid-cols-[repeat(auto-fit,minmax(20%,1fr))] auto-rows-[minmax(240px,auto)] gap-2.5 w-full py-5">
                {posts.map((post, index) => {
                    // Definir clases específicas para cada card basado en el índice
                    const cardClasses = {
                        0: "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2", // Primer proyecto (grande)
                        1: "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2", // Segundo proyecto
                        2: "col-span-4 row-span-1 min-[39.063rem]:col-start-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-1", // Tercer proyecto
                        3: "col-span-4 row-span-1 min-[39.063rem]:col-start-3 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-1", // Cuarto proyecto
                        4: "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2 min-[57.75rem]:col-span-1 min-[57.75rem]:row-span-2", // Quinto proyecto
                        5: "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2 min-[57.75rem]:col-span-3 min-[57.75rem]:row-span-2", // Sexto proyecto
                        6: "col-span-4 row-span-1 min-[39.063rem]:col-span-2 min-[39.063rem]:row-span-2 min-[57.75rem]:col-span-3 min-[57.75rem]:row-span-2", // Sexto proyecto
                    }[index] || "col-span-2 row-span-2";

                    return (
                        <div key={post.slug} className={cardClasses}>
                            <PostCard post={post} className="h-full" />
                        </div>
                    );
                })}
            </div>
        </section>
    );
}