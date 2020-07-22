import api from "./api";

export const inviteProfessor = async (email) => {
  return await api.post("/invite-professor", { email }, { withCredentials: true });
};
