import api from "./api";

export const create = async (data) => {
    return await api.post("/lessons", data);
};

export const get = async (id) => {
    return await api.get(`/lessons/${id}`);
}