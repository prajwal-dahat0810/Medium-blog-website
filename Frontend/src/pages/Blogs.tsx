import { useRecoilValue } from "recoil";
import { AppBar } from "../components/AppBar";
import { BlogCard } from "../components/BlogCard";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { useBlogs } from "../hooks";
import { isLoggedIn } from "../store/atoms/Login";
export const Blogs = () => {
  const { blogs, loading } = useBlogs();

  const isLogged = useRecoilValue(isLoggedIn);
  if (!isLogged) {
    window.location.href = "/signup";
  }
  if (loading) {
    console.log("is in blogs", isLogged);
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
          {blogs.map(
            (blog: {
              author: { name: string | null };
              id: string;
              title: string;
              content: string;
            }) => (
              <BlogCard
                authorName={
                  blog.author.name === null ? "Anonymous" : blog.author.name
                }
                title={blog.title}
                content={blog.content}
                id={blog.id}
                publishDate={"4/4/2021"}
              ></BlogCard>
            )
          )}
        </div>
      </div>
    </div>
  );
};
