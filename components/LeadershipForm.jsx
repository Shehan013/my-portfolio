'use client'
import { useEffect, useState } from "react";
import api from "@/lib/api/api";
import { createLeadership, updateLeadership } from "@/lib/api/leadershipApi";

const empty = {
    role: '',
    organization: '',
    startDate: '',
    endDate: '',
    description: ''
};

export default function LeadershipForm({ selected, onSaved}){
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const isEdit = Boolean(selected?._id);

    useEffect(() => {
        setForm(
            selected ? {
                role: selected.role || '',
                organization: selected.organization || '',
                startDate: selected.startDate || '',
                endDate: selected.endDate || '',
                description: selected.description || ''
            } : empty
        )
    }, [selected]);

    const handleChange = (e) => {
        setForm((f) => ({ ...f, [e.target.name]: e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (isEdit) {
                await updateLeadership(selected._id, form);
            } else {
                await createLeadership(form);
            }
            onSaved?.();
            setForm(empty); 
        } catch (err) {
            console.error(err);
            alert('Failed to save leadership experience.');
        } finally {
            setSaving(false);   
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-3 border rounded-xl">
            <h2 className="font-semibold">{isEdit ? 'Edit Leadership' : 'Add Leadership'}</h2>

            <input name="role" value={form.role} onChange={handleChange} placeholder="Role" className="w-full p-2 border rounded" required />
            <input name="organization" value={form.organization} onChange={handleChange} placeholder="Organization" className="w-full p-2 border rounded" required />
            <input type="date" name="startDate" value={form.startDate} onChange={handleChange} placeholder="Start Date" className="w-full p-2 border rounded" required />
            <input type="date" name="endDate" value={form.endDate} onChange={handleChange} placeholder="End Date" className="w-full p-2 border rounded" />
            <textarea name="description" value={form.description} onChange={handleChange} placeholder="Description" className="w-full p-2 border rounded" rows={4}></textarea>

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