import { Link } from "react-router-dom";
import { Avatar } from "./Avatar";

interface blogCardProps {
  authorName: string;
  title: string;
  content: string;
  publishDate: string;
  id: string;
}
export const BlogCard = ({
  authorName,
  title,
  content,
  publishDate,
  id,
}: blogCardProps) => {
  return (
    <Link to={`/blog/${id}`}>
      <div className=" p-4 border-b border-slate-200 pb-4 w-screen max-w-5xl cursor-pointer">
        <div className="flex items-center">
          <div className="justify-center flex-col	">
            {" "}
            <Avatar name={authorName} size={"big"} />
          </div>

          <div className="font-medium justify-center items-center flex-col	 pl-2">
            {authorName}
          </div>
          <div className="font-extralight  justify-center flex-col pl-2 flex justify-center  items-center">
            <div className="w-1 h-1 rounded bg-black  flex  bg-slate-500"></div>
          </div>
          <div className="font-thin pl-2 flex justify-center text-slate-400">
            {publishDate}
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
