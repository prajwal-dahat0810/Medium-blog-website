import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { SignupInput } from "@dahatdevs/medium-common";
import { LabelledInput } from "./LabelledInput";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useSetRecoilState } from "recoil";
import { isLoggedIn } from "../store/atoms/Login";
export const Auth = ({ type }: { type: "signup" | "signin" }) => {
  const setLoggedIn = useSetRecoilState(isLoggedIn);
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    username: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`,
        postInput
      );
      console.log(
        `${BACKEND_URL}/api/v1/user/${type === "signin" ? "signin" : "signup"}`
      );
      console.log(response);
      const jwt = response.data.token;
      setLoggedIn(true);
      localStorage.setItem("token", jwt);
      navigate("/blogs");
    } catch (e) {
      alert(e);
    }
  }
  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
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
              {type === "signup" ? "Sign up" : "Sign in"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
