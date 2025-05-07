import RenderBlogContent from "@/components/renderBlogContent/renderBlogContent";
import { getBlogContent } from "@/services/blogs";


export default async function Blogs() {
  const blogs = await getBlogContent();

  return (
    <div>
      {blogs.map((blog: any) => (
        <article key={blog.id}>
          <RenderBlogContent content={blog.Content} />
        </article>
      ))}
    </div>
  );
}
