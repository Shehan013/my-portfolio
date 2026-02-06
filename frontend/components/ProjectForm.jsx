'use client'
import { use, useEffect, useState } from "react";
import api from '@/lib/api/api';

const empty = {
    projectName: '',
    techStack: [],
    role: '',
    startDate: '',
    endDate: '',
    description: '',
    contributions: [],
    link: ''
};

export default function ProjectForm({ selected, onSaved }){
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const isEdit = Boolean(selected?._id);
    
    useEffect(() => {
        setForm(
            selected ? {
                projectName: selected.projectName || '',
                techStack: selected.techStack || [],
                role: selected.role || '',
                startDate: selected.startDate || '',
                endDate: selected.endDate || '',
                description: selected.description || '',
                contributions: selected.contributions || [],
                link: selected.link || ''
            } : empty
        )
    }, [selected]);
    
    const handleChange = (e) => {
        const { name, value } = e.target;

        if (name === 'techStack' || name === 'contributions') {
            setForm((f) => ({ ...f, [name]: value.split(',').map(s => s.trim()).filter(s => s) }));
        } else {
            setForm((f) => ({ ...f, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        console.log('techStack type: ', typeof form.techStack);
        console.log('techStack value: ', form.techStack);
        console.log('contributions type: ', typeof form.contributions);
        console.log('contributions value: ', form.contributions);

        console.log('Submitting form:', form);

        try{
            if (isEdit) {
                await api.put(`/projects/${selected._id}`, form);
            } else {
                await api.post('/projects', form);
            }
            onSaved?.();
            setForm(empty);
        } catch (err) {
            console.error(err);
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-3 border rounded-xl">
            <h2 className="font-semibold">{isEdit ? 'Edit Project' : 'New Project'}</h2>

            <input name="projectName" value={form.projectName} onChange={handleChange} placeholder="Project Name" className="w-full border px-3 py-2 rounded" required />
            <input name="techStack" value={form.techStack} onChange={handleChange} placeholder="Tech Stack (comma separated)" className="w-full border px-3 py-2 rounded" required />
            <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="w-full border px-3 py-2 rounded" required />
            <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start Date" className="w-full border px-3 py-2 rounded" required />
            <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="End Date" className="w-full border px-3 py-2 rounded" required />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full border px-3 py-2 rounded" required />
            <input name="contributions" value={form.contributions} onChange={handleChange} placeholder="Contributions (comma separated)" className="w-full border px-3 py-2 rounded" required />
            <input name="link" value={form.link} onChange={handleChange} placeholder="Project Link" className="w-full border px-3 py-2 rounded"/>
            {/*Note for future enhancement : multiple link adding options*/}

            <div className="flex gap-2">
                <button disabled={saving} className="bg-blue-500 text-white px-4 py-2 rounded">{saving ? 'Saving...' : (isEdit ? 'Update' : 'Create')}</button>
                {isEdit && (
                    <button type="button" className="bg-red-500 text-white px-4 py-2 rounded" onClick={() => setForm(empty)}>Cancel</button>
                )}
            </div>
        </form>
    );
}