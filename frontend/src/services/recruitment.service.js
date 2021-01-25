import api from "./api";

export const list = async () => {
  return await api.get("/recruitment");
};

export const create = async (data) => {
  return await api.post("/recruitment", data);
}