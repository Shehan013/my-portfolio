'use client'
import { useEffect, useState } from "react";
import api from '@/lib/api';

export default function EducationList({ admin = false, onEdit }){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

const fetchData = async () => {
    setLoading(true);
    try {
        const { data } = await api.get('/education');
        setItems(data);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};

useEffect(() => { fetchData(); }, []);

const handleDelete = async (id) => {
    if(!confirm('Are you sure you want to delete this entry?')) return;
    try{
        await api.delete(`/education/${id}`);
        await fetchData();
    } catch (err){
        console.error(err);
        alert('Failed to delete entry');
    }
};

if (loading) return <p className="p-4">Loading...</p>;
if (!items.length) return <p className="p-4">No education entries found.</p>;

return (
    <ul className="space-y-3 p-4">
        {items.map((ed) => (
            <li key={ed._id} className="border rounded-xl p-4 flex justify-between items-start">
                <div>
                <div className="font-semibold">{ed.institution}</div>
                <div className="text-sm opacity-80">{ed.degree}{ed.fieldOfStudy? `• ${ed.fieldOfStudy}` : ''}</div>
                <div className="text-sm opacity-70">{ed.startDate} - {ed.endDate || 'Present'}</div>
                {ed.description && <p className="text-sm mt-1">{ed.description}</p>}
            </div>
            {admin && (
                <div className="flex gap-2">
                    <button className="px-3 py-1 rounded-lg border" onClick={() => onEdit?.(ed)}>Edit</button>
                    <button className="px-3 py-1 rounded-lg border" onClick={() => handleDelete(ed._id)}>Delete</button>
                </div>
            )}
        </li>
        ))}
    </ul>
);
}