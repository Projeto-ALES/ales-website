import api from "./api";
import history from "routes/history";
import routes from "routes/routes";

export const login = async (email, password) => {
  return await api.post("/auth/login", { email, password });
};

export const logout = async (error = false) => {
  history.push({ pathname: routes.LOGIN, state: { logout: true, error } });
  await api.post("/auth/logout");
};

export const resetPassword = async (email) => {
  return await api.post("/password/reset", { email });
};

export const newPassword = async (new_password, new_password_conf, token) => {
  return await api.post("/password/new", { new_password, new_password_conf, token });
};

export const updatePassword = async (id, password, new_password, new_password_conf) => {
  return await api.post(`/password/update/${id}`, { password, new_password, new_password_conf });
};
