import { useSetRecoilState } from "recoil";
import { Avatar } from "./Avatar";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../store/atoms/Login";

export const AppBar = () => {
  const navigate = useNavigate();
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  return (
    <div className="border-b flex items-center justify-between py-4 px-10">
      <Link to={"/blogs"}>
        <div>Medium</div>
      </Link>
      <div className="pr-6 flex gap-4">
        <Link to={"/publish"}>
          <button
            type="button"
            className=" focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          >
            New
          </button>
        </Link>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            setLoggedIn(false);
            navigate("/");
          }}
          type="button"
          className=" focus:outline-none text-white bg-green-700 hover:bg-slate-600 focus:ring-4 focus:ring-green-300 font-medium rounded-3xl text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
            />
          </svg>
        </button>
        <button data-modal-target="popup-modal" data-modal-toggle="popup-modal">
          <Avatar name="Prajwal" size={"big"} />
        </button>
      </div>
    </div>
  );
};
