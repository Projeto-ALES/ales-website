import Cookies from "js-cookie";
import api from "./api";

export const login = async (email, password) => {
  return await api.post(
    "/login",
    {
      email,
      password,
    },
    { withCredentials: true }
  );
};

export const logout = async () => {
  Cookies.remove("token");
  Cookies.remove("refresh_token");
};

export const resetPassword = async (email) => {
  return await api.post("/reset-password", { email }, { withCredentials: true });
};
