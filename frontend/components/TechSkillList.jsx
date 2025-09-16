'use client'
import { useEffect, useState } from "react";
import api from '@/lib/api';

export default function TechSkillList({admin = false, onEdit}){
    const [items, setItems] = useState([]);
    const [loading, setloading] = useState(true);

    const fetchData = async () => {
        setloading(true);
        try{
            const { data } = await api.get('/techSkills');
            setItems(data);
        } catch (err){
            console.error(err);
        } finally {
            setloading(false);
        }
    };

    useEffect(() => { fetchData();}, []);

    const handleDelete = async (id) => {
        if(!confirm("Are you sure you want to delete this item?")) return;
        try{
            await api.delete(`/techSkills/${id}`);
            await fetchData();
        } catch (err){
            console.error(err);
            alert("Failed to delete entry.");
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (!items.length) return <p className="p-4">No tech skills found.</p>;

    const SkillGroups = {};
    items.forEach(skill => {
        if (!SkillGroups[skill.category]) {
            SkillGroups[skill.category] = [];
        }
        SkillGroups[skill.category].push(skill);
    });

    return (
        <div>
            {Object.entries(SkillGroups).map(([category, skills]) => (
                <div className="mb-6" key={category}>
                    <h2>{category}</h2>
                    <div className="flex flex-wrap gap-3">
                        {skills.map(skill => (
                            <span key={skill._id } className="relative flex flex-col items-center group"><img className="w-24 h-24" src={skill.icon} alt={skill.name} />
                                <span className="absolute opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-200 top-full mt-1 left-1/2 -translate-x-1/2
 bg-black text-white px-2 py-1 rounded text-sm">
                                    {skill.name}
                                </span>
                                { admin && (
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 rounded-lg border" onClick={() => onEdit?.(skill)}>Edit</button>
                                            <button className="px-3 py-1 rounded-lg border" onClick={() => handleDelete(skill._id)}>Delete</button>
                                        </div>
                       )}
                            </span>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
}

