import { useEffect, useState } from "react";
import { Blog } from "../hooks";
import { AppBar } from "./AppBar";
import { Avatar } from "./Avatar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export const UpdateBlog = ({ blog }: { blog: Blog }) => {
  const [title, setTitle] = useState(blog.title);
  const [content, setContent] = useState(blog.content);
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState("");
  const date = new Date(blog.createdAt);
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "1");
  const day = String(date.getUTCDate()).padStart(2, "0");

  useEffect(() => {
    const timeout = setTimeout(() => {
      setVisible(false);
      setMessage("");
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);
  const navigate = useNavigate();
  async function handleUpdate() {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/blog/blog`,
        {
          title: title,
          content: content,
          id: blog.id,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (!response.data.id) {
        setMessage("Blog cannot updated , try again");
        setVisible(true);
      }
      navigate("/dashboard");
    } catch (e) {
      setMessage("Blog cannot updated , try again");
      setVisible(true);
    }
  }
  return (
    <div className="min-w-fit">
      <AppBar />
      <Alert alertVisible={visible} content={message} />
      <div className="flex justify-center px-4">
        <div className="grid grid-cols-12  w-full max-sm:grid-cols-6 pt-14 max-w-screen-2xl   ">
          <div className="col-span-8 ">
            <input
              className="text-6xl outline-none max-sm:w-11/12  px-3 pt-4 font-extrabold max-sm:text-3xl max-sm:px-1 bold"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            ></input>
            <div className="pt-4 text-slate-500">
              Posted on {`${year}-${month}-${day}`}
            </div>
            <textarea
              className="pt-2 w-11/12 max-sm:8/12 px-2 pb-2 outline-slate-100"
              onChange={(e) => setContent(e.target.value)}
              value={content}
            ></textarea>
          </div>
          <div className="col-span-4 pt-14 ">
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
                  {blog?.author?.about
                    ? blog?.author?.about
                    : "Random Catch phrase about the author's ability to catch users attention"}
                </div>
              </div>
            </div>
            <div className=" pt-10">
              <button
                onClick={handleUpdate}
                className="  text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2 max-sm:px-2 max-sm:  dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
