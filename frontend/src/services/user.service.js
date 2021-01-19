import api from "./api";

export const me = async () => {
  return await api.get("/auth/me");
};
