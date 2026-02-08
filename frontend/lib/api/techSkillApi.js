import api from "./api";

export const getAllTechSkills = () => 
    api.get('/techSkills');

export const getTechSkillById = (id) => 
    api.get(`/techSkills/${id}`);

export const createTechSkill = (data) =>
    api.post('/techSkills', data);

export const updateTechSkill = (id, data) =>
    api.put(`/techSkills/${id}`, data);

export const deleteTechSkill = (id) =>
    api.delete(`/techSkills/${id}`);
