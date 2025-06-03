import { useNavigate } from "react-router-dom";
import { Avatar } from "./Avatar";
import { blogCardProps } from "./BlogCard";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Alert } from "./Alert";
import { useEffect, useState } from "react";

export const DashboardCard = ({
  authorName,
  title,
  content,
  createdAt,
  id,
}: blogCardProps) => {
  const date = new Date(createdAt);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "1"); // Months are zero-indexed
  const day = String(date.getUTCDate()).padStart(2, "0");
  const navigate = useNavigate();
  const [visible, setVisible] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  useEffect(() => {
    const timeout = setTimeout(() => {
      setMessage("");
      setVisible(false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);
  async function handleDelete() {
    try {
      const response = await axios.delete(
        `${BACKEND_URL}/api/v1/blog/delete/${id}`,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.data.success) {
        setMessage("Try again after some time");
        setVisible(true);
      }
      setMessage("Blog delete successfully!");
      setVisible(true);
      window.location.href = "/dashboard";
    } catch (e: any) {
      setMessage(e.response.data);
      setVisible(true);
    }
  }
  return (
    <div>
      <Alert alertVisible={visible} content={message} />
      <div className="flex border-b max-sm:gap-5 border-slate-200 flex-row items-center">
        <div className="  p-4  pb-4 md:max-w-2xl w-screen max-w-5xl max-sm:px-3 max-sm:w-11/12 cursor-pointer">
          <div className="flex  items-center">
            <div className="justify-center flex-col	">
              {" "}
              <Avatar name={authorName} size={"big"} />
            </div>

            <div className="font-medium justify-center items-center flex-col	 pl-2">
              {authorName}
            </div>
            <div className="font-extralight  justify-center flex-col pl-2 flex   items-center">
              <div className="w-1 h-1 rounded  flex  bg-slate-500"></div>
            </div>
            <div className="font-thin pl-2 flex justify-center text-slate-400">
              {`${year}-${month}-${day}`}
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
        <div
          className="  flex flex-col items-center max-sm:pr-3 gap-10 h-full 
        "
        >
          <button
            type="button"
            onClick={handleDelete}
            className=" focus:outline-none text-white bg-red-600  font-medium rounded-xl text-sm px-5 py-2 max-sm:px-3 max-sm:rounded-md max-sm:py-1  "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path
                fill-rule="evenodd"
                d="M8.75 1A2.75 2.75 0 0 0 6 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 1 0 .23 1.482l.149-.022.841 10.518A2.75 2.75 0 0 0 7.596 19h4.807a2.75 2.75 0 0 0 2.742-2.53l.841-10.52.149.023a.75.75 0 0 0 .23-1.482A41.03 41.03 0 0 0 14 4.193V3.75A2.75 2.75 0 0 0 11.25 1h-2.5ZM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4ZM8.58 7.72a.75.75 0 0 0-1.5.06l.3 7.5a.75.75 0 1 0 1.5-.06l-.3-7.5Zm4.34.06a.75.75 0 1 0-1.5-.06l-.3 7.5a.75.75 0 1 0 1.5.06l.3-7.5Z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          <button
            type="button"
            onClick={() => navigate(`/update/${id}`)}
            className=" focus:outline-none text-white bg-gray-800  hover:bg-gray-700 focus:ring-4  font-medium rounded-xl max-sm:rounded-md text-sm px-5 max-sm:px-3 py-2 max-sm:py-1 "
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              className="size-4"
            >
              <path d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z" />
              <path d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};
