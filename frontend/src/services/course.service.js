import api from "./api";

export const list = async () => {
  return await api.get("/courses");
};

export const create = async (data) => {
  return await api.post("/courses", data);
};

export const get = async (id) => {
  return await api.get(`/courses/${id}`);
};

export const update = async (id, data) => {
  return await api.put(`/courses/${id}`, data);
};

export const remove = async (id) => {
  return await api.delete(`/courses/${id}`);
};
