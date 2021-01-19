import api from "./api";

export const invite = async (email) => {
  return await api.post("/professors/invite", { email });
};

export const enroll = async (data) => {
  return await api.post("/professors", data);
};

export const list = async () => {
  return await api.get("/professors");
};

export const get = async (id) => {
  return await api.get(`/professors/${id}`);
};

export const update = async (id, data) => {
  return await api.put(`/professors/${id}`, data);
};
