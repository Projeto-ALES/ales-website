import api from "./api";

export const send = async (data) => {
  return await api.post("/send-mail", data);
};
