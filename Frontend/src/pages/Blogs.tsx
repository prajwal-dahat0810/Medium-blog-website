import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
export interface BlogInterface {
  author: {
    name: string | null;
    about?: string | null;
  };
  id: number;
  title: string;
  createdAt: string;
  content: string;
}
export const Blogs = () => {
  const { blogs, loading } = useBlogs();

  if (loading) {
    return (
      <div>
        <AppBar />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
        <BlogSkeleton />
      </div>
    );
  }
  return (
    <div>
      <AppBar />
      <div className="flex justify-center">
        <div className="">
          {blogs && blogs.length === 0 && (
            <div className="pt-15 w-screen  min-h-96 flex items-center justify-center ">
              No Blogs Available
            </div>
          )}
          {blogs &&
            blogs.map((blog) => (
              <BlogCard
                authorName={blog.author.name}
                authorAbout={blog.author.about}
                title={blog.title}
                content={blog.content}
                createdAt={blog.createdAt}
                id={blog.id}
              ></BlogCard>
            ))}
        </div>
      </div>
    </div>
  );
};
