import api from "./api";

export const invite = async (email) => {
  return await api.post("/invite-professor", { email }, { withCredentials: true });
};

export const enroll = async (data) => {
  return await api.post("/professors", data, { withCredentials: true });
};

export const list = async () => {
  return await api.get("/professors", { withCredentials: true });
};

export const getProfile = async (id) => {
  return await api.get(`/professors/${id}`, { withCredentials: true });
};
