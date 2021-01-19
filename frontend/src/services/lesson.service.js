import api from "./api";

export const create = async (course_id, data) => {
    return await api.post(`/courses/${course_id}/lessons`, data);
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