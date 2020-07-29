import api from "./api";
import history from "routes/history";
import routes from "routes/routes";

export const login = async (email, password) => {
  return await api.post("/login", {
    email,
    password,
  });
};

export const logout = (error = false) => {
  history.push({ pathname: routes.LOGIN, state: { logout: true, error: error } });
};

export const resetPassword = async (email) => {
  return await api.post("/reset-password", { email });
};

export const newPassword = async (new_password, new_password_conf, token) => {
  return await api.post("/new-password", { new_password, new_password_conf, token });
};

export const updatePassword = async (id, password, new_password, new_password_conf) => {
  return await api.post(`/update-password/${id}`, { password, new_password, new_password_conf });
};
