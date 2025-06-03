import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";
import { isLoggedIn } from "./Login";

export const UserSelector = selector({
  key: "AtomSelector",
  get: async ({ get }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/me`,
        {},
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("message", response.data);

      if (response.data.user) {
        return response.data.user;
      }
      if (get(isLoggedIn) && response.data.message) {
        console.log("here is change", response.data);
        window.location.href = "/signup";
      }
    } catch (e: any) {
      window.location.href = "/signin";
      return e.response.data.message;
    }
  },
});

export const UserAtom = atom({
  key: "UserAtom",
  default: UserSelector,
});
