import axios from "axios";
import { AppBar } from "./AppBar";
import { BACKEND_URL } from "../config";
import { ChangeEvent, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Alert } from "./Alert";

export const Publish = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [alertVisible, setAlertVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div>
      <AppBar />
      <Alert alertVisible={alertVisible} />
      <div
        className={`absolute ${
          alertVisible && (!title || !description) ? "not-sr-only" : "sr-only"
        } left-24 bottom-24`}
      >
        <div
          className="p-4 mb-4 text-sm  text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400"
          role="alert"
        >
          <span className="font-medium">Input is Empty !</span> Please add title
          or description and try submitting again.
        </div>
      </div>
      <div className="flex justify-center pt-8 ">
        <div className="max-w-screen-lg w-full px-5">
          <input
            type="text"
            required={true}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-gray-50 outline-none  text-gray-500 text-lg rounded-lg focus:ring-blue-500  block w-full p-4  max-sm:text-sm  disabled:bg-slate-50 "
            placeholder="Title"
          />
          <TextEditor onChange={(e) => setDescription(e.target.value)} />
          <button
            onClick={async () => {
              if (!title || !description) {
                setAlertVisible(true);
                setTimeout(() => setAlertVisible(false), 2000);
                return;
              } else {
                const response = await axios.post(
                  `${BACKEND_URL}/api/v1/blog/blog`,
                  {
                    title,
                    content: description,
                  },
                  {
                    headers: {
                      Authorization: "Bearer " + localStorage.getItem("token"),
                    },
                  }
                );
                if (!response.data.id) {
                  setAlertVisible(true);
                  setTimeout(() => setAlertVisible(false), 2000);
                  setTimeout(() => navigate("/signup"), 2100);
                  return;
                }
                navigate(`/blog/${response.data.id}`);
              }
            }}
            type="submit"
            className="inline-flex items-center px-5 py-2.5 text-sm font-lg text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
          >
            Publish post
          </button>
        </div>
      </div>
    </div>
  );
};

function TextEditor({
  onChange,
}: {
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}) {
  return (
    <div>
      <div className="w-full mt-2 mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600">
        <div className="px-4 py-2  bg-white rounded-b-lg dark:bg-gray-800">
          <label className="sr-only">Publish post</label>
          <textarea
            onChange={onChange}
            id="editor"
            rows={8}
            className="block p-3 outline-none w-full px-0 text-md text-gray-800 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
            placeholder="Write an article..."
            required={true}
          ></textarea>
        </div>
      </div>
    </div>
  );
}
