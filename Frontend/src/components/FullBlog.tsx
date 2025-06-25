import { useRecoilValue } from "recoil";
import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./Avatar";
import { UserAtom } from "../store/atoms/User";

export const FullBlog = ({ blog }: { blog: Blog }) => {
  const user = useRecoilValue(UserAtom);
  const date = new Date(blog.createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    // 'en-GB' for day-month-year
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div>
      <AppBar />
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-12 max-sm:col-span-4   w-full pt-14    ">
          <div className="col-span-8  max-sm:col-span-12">
            <div className="text-6xl pt-4 font-extrabold  bold">
              {blog?.title}
            </div>
            <div className="pt-4 text-slate-500">
              Posted on {`${formattedDate}`}
            </div>
            <div className="pt-4">{blog?.content}</div>
          </div>
          <div className="col-span-4 max-sm:col-span-8 pt-14 ">
            <div className="text-slate-600 text-lg">Author</div>
            <div className="flex w-full">
              <div className="pr-2 flex items-center justify-center">
                <Avatar name={blog?.author?.name || "Anonymous"} size={"big"} />
              </div>
              <div className="pl-4">
                <div className="text-xl font-bold">
                  {blog?.author?.name || "Anonymous"}
                </div>
                <div className="pt-2 text-slate-500">
                  {user.about === ""
                    ? "Random Catch phrase about the author's ability to catch users attention"
                    : user.about}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
