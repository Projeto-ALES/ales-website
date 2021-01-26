import api from "./api";

export const list = async () => {
  return await api.get("/recruitment");
};

export const create = async (data) => {
  return await api.post("/recruitment", data);
};

export const update = async (name, data) => {
  return await api.put(`/recruitment/${name}`, data);
};

export const get = async (name) => {
  return await api.get(`/recruitment/${name}`);
};
