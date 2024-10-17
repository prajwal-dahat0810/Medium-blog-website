import { useRecoilValue } from "recoil";
import { useUserBlogs } from "../hooks";
import { isLoggedIn } from "../store/atoms/Login";
import { BlogSkeleton } from "../components/BlogSkeleton";
import { AppBar } from "../components/AppBar";
import { UserAtom } from "../store/atoms/User";
import { DashboardCard } from "../components/DashboardCard";

export const Dashboard = () => {
  const { blogs, loading } = useUserBlogs();
  const user = useRecoilValue(UserAtom);

  const isLogged = useRecoilValue(isLoggedIn);
  if (!isLogged) {
    window.location.href = "/signup";
  }

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
              No Blogs
            </div>
          )}
          {blogs &&
            blogs.length > 0 &&
            blogs.map(
              (blog: {
                author: { name: string | null; about: string };
                id: string;
                title: string;
                createdAt: string;
                content: string;
              }) => (
                <DashboardCard
                  authorName={user.name === null ? "Anonymous" : user.name}
                  authorAbout={""}
                  title={blog.title}
                  content={blog.content}
                  id={blog.id}
                  createdAt={"4/4/2021"}
                ></DashboardCard>
              )
            )}
        </div>
      </div>
    </div>
  );
};
