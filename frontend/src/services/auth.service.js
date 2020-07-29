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

export const newPassword = async (new_password, new_password_conf, token) => {
  return await api.post(
    "/new-password",
    { new_password, new_password_conf, token },
    { withCredentials: true }
  );
};

export const updatePassword = async (id, password, new_password, new_password_conf) => {
  return await api.post(
    `/update-password/${id}`,
    { password, new_password, new_password_conf },
    { withCredentials: true }
  );
};
