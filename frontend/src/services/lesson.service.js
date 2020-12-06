import api from "./api";

export const create = async (data) => {
    return await api.post("/lessons", data);
};