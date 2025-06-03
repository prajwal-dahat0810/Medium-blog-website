import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@dahatdevs/medium-common";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isLoggedIn } from "../store/atoms/Login";
import { BtnLoading } from "../store/atoms/BtnLoading";
import { Alert, alertType } from "./Alert";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const navigate = useNavigate();
  const [alertCon, setAlertCon] = useState<alertType>({
    alertVisible: false,
    content: "",
  });
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });
  useEffect(() => {
    const alertTimeout = setTimeout(() => {
      setAlertCon({
        alertVisible: false,
        content: "",
      });
    }, 5000);
    return () => {
      clearTimeout(alertTimeout);
    };
  }, [alertCon.alertVisible]);
  const [btnLoading, setBtnLoading] = useRecoilState(BtnLoading);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setBtnLoading(() => false);
    }, 5000);
    return () => {
      clearTimeout(timeout);
    };
  }, [btnLoading]);

  async function sendRequest() {
    try {
      if (postInput.username === "" && postInput.password === "") {
        setAlertCon({
          alertVisible: true,
          content: "Please Input correctly",
        });
      } else {
        setBtnLoading(true);
        const response = await axios.post(
          `${BACKEND_URL}/api/v1/user/${
            type === "signin" ? "signin" : "signup"
          }`,
          postInput
        );

        if (response.data.message) {
          setBtnLoading(false);
          console.log("in if ", response.data.message);
          setAlertCon({ alertVisible: true, content: response.data.message });
        } else {
          const jwt = response.data.token;
          localStorage.setItem("token", jwt);
          navigate("/blogs");
          setLoggedIn(true);
          setBtnLoading(false);
        }
      }
    } catch (e: any) {
      console.log(e, "explain this error  ");
      setBtnLoading(false);
      setAlertCon({ alertVisible: true, content: e.response.data.message });
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <Alert
              alertVisible={alertCon.alertVisible}
              content={alertCon.content}
            />
            <div className=" text-3xl font-extrabold">Create an account</div>
            <div className="text-slate-400 font-bold">
              {type === "signup"
                ? "Already have an account?"
                : "Don't have an account?"}
              <Link
                className="pl-2 underline"
                to={type === "signin" ? "/signup" : "/signin"}
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>
          <div className="pt-5">
            {type === "signup" ? (
              <LabelledInput
                label="Name"
                placeholder="Prajwal..."
                onchange={(e) => {
                  setPostInput({ ...postInput, name: e.target.value });
                }}
              />
            ) : null}
            <LabelledInput
              label="Username"
              placeholder="johndoe@gmail.com"
              onchange={(e) => {
                setPostInput({ ...postInput, username: e.target.value });
              }}
            />
            <LabelledInput
              label="Password"
              placeholder="das#hf@lk4"
              onchange={(c) => {
                setPostInput({ ...postInput, password: c.target.value });
              }}
            />
            <button
              type="button"
              onClick={sendRequest}
              className="mt-6 text-white w-full bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-lg rounded-lg text-lg px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              {btnLoading ? (
                <div className="w-full h-full flex justify-center items-center">
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5  text-gray-200 animate-spin dark:text-gray-400 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              ) : type === "signup" ? (
                "Sign up"
              ) : (
                "Sign in"
              )}
            </button>
          </div>

          <div>
            <span className="font-medium">
              Ensure that these requirements are met:
            </span>
            <ul className="mt-1.5 list-disc list-inside">
              <li>Password 8 characters (and up to 18 characters)</li>
              <li>At least one lowercase character</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
