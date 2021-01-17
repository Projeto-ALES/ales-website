import api from "./api";

export const create = async (data) => {
    return await api.post("/lessons", data);
};

export const get = async (id) => {
    return await api.get(`/lessons/${id}`);
}

export const update = async (id, data) => {
    return await api.put(`/lessons/${id}`, data);
}

export const remove = async (id) => {
    return await api.delete(`/lessons/${id}`);
}