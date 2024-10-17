import axios from "axios";
import { atom, selector } from "recoil";
import { BACKEND_URL } from "../../config";

export const UserSelector = selector({
  key: "AtomSelector",
  get: async () => {
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
      return response.data.user;
    } catch (e: any) {
      return e.response.data.message;
    }
  },
});

export const UserAtom = atom({
  key: "UserAtom",
  default: UserSelector,
});
