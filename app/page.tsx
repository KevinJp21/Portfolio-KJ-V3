import Image from "next/image";
import RenderBlogContent from "./components/renderBlogContent/renderBlogContent";
const fetchBlogs = async () => {
  const reqOptions: RequestInit = {
    headers: {
      Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
    },
  };

  const request = await fetch(
    `${process.env.STRAPI_API_URL}/api/blogs`,
    reqOptions
  );
  const response = await request.json();
  return response;
};

export default async function Home() {
  const blogsResponse = await fetchBlogs();
  const blogs = blogsResponse.data;

  console.log(blogs);
  return (
    <div>
      {blogs.map((blog: any) => (
        <div key={blog.id}>
          <h1>{blog.Title}</h1>
          <RenderBlogContent content={blog.Content} />
        </div>
      ))}
    </div>
  );
}
