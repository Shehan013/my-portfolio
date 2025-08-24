'use client'
import { useEffect, useState } from "react";
import api from '@/lib/api';

const empty = {
    institution: '',
    degree: '',
    fieldOfStudy: '',
    startDate: '',
    endDate: '',
    description: ''
};

export default function EducationForm({ selected, onSaved }){
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const isEdit = Boolean(selected?._id);

useEffect(() => {
    setForm(
        selected?{
            institution: selected.institution || '',
            degree: selected.degree || '',
            fieldOfStudy: selected.fieldOfStudy || '',
            startDate: selected.startDate || '',
            endDate: selected.endDate || '',
            description: selected.description || ''
        }: empty
    );
}, [selected]);


const handleChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
        if (isEdit) {
            await api.put(`/education/${selected._id}`, form);
        } else {
            await api.post(`/education`, form);
        }
        onSaved?.();
        setForm(empty);
    } catch (err) {
        console.error(err);
        alert('Save Failed - check your inputs');
    } finally {
        setSaving(false);
    }
};

return (
    <form onSubmit={handleSubmit} className="p-4 space-y-3 border rounded-xl">
        <h2 className="font-semibold">{isEdit ? 'Edit Education' : 'Add Education'}</h2>

        <input name="institution" value={form.institution} onChange={handleChange} placeholder="Institution" className="w-full border rounded-lg p-2"/>
        <input name="degree" value={form.degree} onChange={handleChange} placeholder="Degree *" className="w-full border rounded-lg p-2" />
        <input name="fieldOfStudy" value={form.fieldOfStudy} onChange={handleChange} placeholder="Field of Study (optional)" className="w-full border rounded-lg p-2" />
        <input name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start Date (e.g., 2023 Mar) *" className="w-full border rounded-lg p-2" />
        <input name="endDate" value={form.endDate} onChange={handleChange} placeholder="End Date (or empty)" className="w-full border rounded-lg p-2" />
      <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description (optional)" className="w-full border rounded-lg p-2" rows={3} />

      <div className="flex gap-2">
        <button disabled={saving} className="px-4 py-2 border rounded-lg">{saving ? 'Saving...' : (isEdit ? 'Update' : 'Create')}</button>
        {isEdit && (
            <button type="button" className="px-4 py-2 border rounded-lg" onClick={() => setForm(empty)}>
                Cancel
            </button>
        )}
      </div>
    </form>
);
}