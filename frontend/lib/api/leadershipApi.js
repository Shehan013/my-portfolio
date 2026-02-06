import api from "./api";

export const getAllLeadership = () => 
    api.get('/leadership');

export const getLeadershipById = (id) => 
    api.get(`/leadership/${id}`);

export const createLeadership = (data) =>
    api.post('/leadership', data);

export const updateLeadership = (id, data) =>
    api.put(`/leadership/${id}`, data);

export const deleteLeadership = (id) =>
    api.delete(`/leadership/${id}`);

