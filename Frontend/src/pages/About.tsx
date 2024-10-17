import { useRecoilValue } from "recoil";
import { AppBar } from "../components/AppBar";
import { UserAtom } from "../store/atoms/User";
import { useEffect, useState } from "react";
import { Avatar } from "../components/Avatar";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { Alert } from "../components/Alert";

export const About = () => {
  const user = useRecoilValue(UserAtom);

  const [activeButton, setActiveButton] = useState("button1");
  const [about, setAbout] = useState<string>("");

  const handleButtonClick = (button: string) => {
    setActiveButton(button);
  };
  const [visible, SetVisible] = useState<boolean>(false);
  const [alertMsg, SetAlertMsg] = useState<string>("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      SetAlertMsg("");
      SetVisible(false);
    }, 4000);
    return () => {
      clearTimeout(timeout);
    };
  }, [visible]);
  async function handleSave() {
    try {
      const response = await axios.put(
        `${BACKEND_URL}/api/v1/user/update`,
        {
          about: about,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (response.data.about !== "") {
        SetAlertMsg("About updated successfully");
        SetVisible(true);
        window.location.href = "/about";
        return;
      }
      SetAlertMsg(response.data.message);
      SetVisible(true);
    } catch (e: any) {
      SetAlertMsg(e.response.data.message);
      SetVisible(true);
    }
  }
  return (
    <div className=" ">
      <AppBar />
      <div className="absolute left-2/4 max-sm:left-1/4 top-6 w-fit">
        <Alert alertVisible={visible} content={alertMsg} />
      </div>
      <div className="min-h-screen  grid  grid-cols-8 grid-rows-5  ">
        <div className="  col-start-2   pl-3    row-start-1 row-span-1 pr-28  py-8 max-sm:col-start-1 max-sm:col-span-8 col-span-4 h-full max-sm:pr-2">
          <div className="flex py-6  max-sm:py-3 pr-5 justify-between border-slate-500 items-center ">
            <div className="flex gap-4 justify-center items-center">
              <div className="sr-only max-sm:not-sr-only ">
                <Avatar
                  name={user.name === null ? "A" : user.name[0]}
                  size={"big"}
                />
              </div>
              <div className="text-4xl col-start-2.5  max-sm:pt-0 font-bold max-sm:text-2xl bold">
                {user.name === null ? "Anonymous" : user.name}
              </div>
            </div>

            <div className="text-slate-500">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="size-7"
                color="#64748b"
              >
                <path d="M3 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM8.5 10a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0ZM15.5 8.5a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3Z" />
              </svg>
            </div>
          </div>
          <div className="pt-10 flex border-b  flex-row gap-5 pb-0">
            <div
              onClick={() => handleButtonClick("button1")}
              className={`font-sans  max-sm:font-medium pb-5 border-b-2 ${
                activeButton === "button1" ? " border-slate-500" : "border-none"
              }   cursor-pointer active:text-slate-600 font-medium ${
                activeButton === "button2"
                  ? " text-slate-600"
                  : " border-slate-400"
              }`}
            >
              Home
            </div>

            <div
              onClick={() => handleButtonClick("button2")}
              className={`font-sans border-b-2 ${
                activeButton === "button2" ? " border-slate-500" : "border-none"
              }   cursor-pointer ${
                activeButton === "button2"
                  ? " text-slate-700"
                  : " text-slate-500"
              } font-semibold`}
            >
              About
            </div>
          </div>
        </div>
        <div
          className={` ${
            activeButton === "button2" ? " sr-only" : "not-sr-only"
          } py-5 row-start-2  col-start-2  border-b col-span-3 row-span-1 max-sm:col-span-6 max-sm:col-start-2 px-5  w-full max-sm:p-0`}
        >
          <div className="px-2 flex flex-col gap-2  py-2 w-full h-full">
            <div className="w-full  flex justify-between px-2 py-4  items-center h-3">
              <div className="font-bold text-slate-600">Name</div>
              <div>{user.name ? "Anonymous" : user.name}</div>
            </div>
            <div className="w-full flex justify-between px-2 py-4  items-center h-3">
              <div className="font-bold text-slate-600">Email </div>
              <div>{user.email}</div>
            </div>
            <div className="w-full flex justify-between px-2 py-4  items-center h-3">
              <div className="font-bold text-slate-600">About</div>
              <div>
                {user.about === ""
                  ? "Not Available"
                  : user.about.slice(0, 10) + "..."}
              </div>
            </div>
          </div>
        </div>
        <div
          className={` ${
            activeButton === "button1" ? " sr-only" : "not-sr-only"
          } py-5 row-start-2 col-start-2   max-sm:col-start-1 col-span-3 row-span-1 max-sm:col-span-8  px-5  w-full max-sm:p-0`}
        >
          <div className="px-2 flex flex-col gap-4  py-2 w-full h-full">
            <textarea
              defaultValue={user.about === "" ? "" : user.about}
              onChange={(e) => setAbout(e.target.value)}
              placeholder={
                user.about === "" ? "" : "Tell the word about yourself"
              }
              className="w-full  border-slate-200  flex justify-between px-2  py-4 outline-none resize-none  items-center min-h-7 "
            />
            <div className="w-full border-b pb-5 flex-row-reverse px-4 gap-5  flex ">
              <button
                onClick={handleSave}
                className="px-5 py-2  font-medium max-sm:font-normal rounded-3xl bg-black text-white"
              >
                Save
              </button>
              <button
                onClick={() => setActiveButton("button1")}
                className="px-6 py-2 border border-black font-medium max-sm:font-normal rounded-3xl bg-white text-black"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
        <div className="col-start-6 p-3   max-sm:sr-only  row-start-1 border-l row-span-5 max-sm:col-span-8 col-span-full   ">
          <div className="flex gap-4 flex-col  justify-center items-start pl-5">
            <div className="col-start-2.5  max-sm:pt-0 font-bold max-sm:text-2xl   text-2xl bold">
              <Avatar name={user.name[0]} size={"big"} />
            </div>

            <div className="text-4xl col-start-2.5  max-sm:pt-0 font-bold max-sm:text-2xl bold">
              {user.name === null ? "Anonymous" : user.name}
            </div>
          </div>
          <div className="p-7 text-md  cursor-pointer text-green-600">
            Edit Profile
          </div>
        </div>
      </div>
    </div>
  );
};
