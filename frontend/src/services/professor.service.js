import api from "./api";

export const invite = async (email) => {
  return await api.post("/invite-professor", { email }, { withCredentials: true });
};

export const enroll = async (data) => {
  return await api.post("/professors", data, { withCredentials: true });
};
