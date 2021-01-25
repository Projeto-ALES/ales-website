import api from "./api";

export const list = async () => {
  return await api.get("/recruitment");
};