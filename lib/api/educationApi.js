import api from "./api";

export const getAllEducation = () => 
    api.get('/education');

export const getEducationById = (id) => 
    api.get(`/education/${id}`);

export const createEducation = (data) =>
    api.post('/education', data);

export const updateEducation = (id, data) =>
    api.put(`/education/${id}`, data);

export const deleteEducation = (id) =>
    api.delete(`/education/${id}`);