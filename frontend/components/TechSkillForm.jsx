'use client'
import { useState, useEffect } from "react";
import api from '@/lib/api/api';
import { createTechSkill, updateTechSkill } from "@/lib/api/techSkillApi";

const empty = {
    name : '',
    category : '',
    icon : ''
};

export default function TechSkillForm({ selected, onSaved}){
    const [form, setForm] = useState(empty);
    const [saving, setSaving] = useState(false);
    const isEdit = Boolean(selected?._id);

    useEffect(() => {
        setForm(
            selected ? {
                name: selected.name || '',
                category: selected.category || '',
                icon: selected.icon || ''
            } : empty
        )
    }, [selected]);

    const handleChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try{
            if (isEdit){
                await updateTechSkill(selected._id, form);
            } else {
                await createTechSkill(form);
            }
            onSaved?.();
            setForm(empty);
        } catch(err){
            console.error(err);
            alert("Saved Failed.");
        } finally {
            setSaving(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="p-4 space-y-3 border rounded-xl">
            <h2 className="font-semibold">{isEdit ? 'Edit Tech Skill' : 'Add Tech Skill'}</h2>

            <input name="name" value={form.name} onChange={handleChange} placeholder="Tech Skill Name" className="w-full border rounded-lg px-3 py-2" />
            <input name="category" value={form.category} onChange={handleChange} placeholder="Tech Skill Category" className="w-full border rounded-lg px-3 py-2" />
            <input name="icon" value={form.icon} onChange={handleChange} placeholder="Tech Skill Icon URL" className="w-full border rounded-lg px-3 py-2" />

            <div className="flex gap-2">
                <button type="submit" disabled={saving} className="px-4 py-2 border rounded-lg">{saving ? 'Saving...' : (isEdit ? 'Update' : 'Create')}</button>
                {isEdit && (
                    <button type="button" className="px-4 py-2 border rounded-lg" onClick={() => setForm(empty)}>
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
}