import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

export interface blogCardProps {
  authorName: string;
  authorAbout: string;
  title: string;
  content: string;
  createdAt: string;
  id: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  createdAt,
  id,
}: blogCardProps) => {
  const date = new Date(createdAt);
  const formattedDate = date.toLocaleDateString("en-GB", {
    // 'en-GB' for day-month-year
    day: "numeric",
    month: "numeric",
    year: "numeric",
  });

  return (
    <Link to={`/blog/${id}`}>
      <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-5xl cursor-pointer">
        <div className="flex items-center">
          <div className="justify-center flex-col	">
            <Avatar name={authorName} size={"big"} />
          </div>

          <div className="font-medium justify-center items-center flex-col	 pl-2">
            {authorName}
          </div>
          <div className="font-extralight  justify-center flex-col pl-2 flex   items-center">
            <div className="w-1 h-1 rounded   flex  bg-slate-500"></div>
          </div>
          <div className="font-thin pl-2 flex justify-center text-slate-400">
            {`${formattedDate}`}
          </div>
        </div>
        <div className="text-xl pt-3 font-semibold">{title}</div>
        <div className="text-md font-extralight">
          {content.length > 100 ? content.slice(0, 100) + "..." : content}
        </div>
        <div className=" text-sm font-thin pt-4 text-slate-400">{`${Math.ceil(
          content.length / 100
        )} minutes(s) read`}</div>
      </div>
    </Link>
  );
};
