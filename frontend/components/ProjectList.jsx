'use client'
import { useEffect, useState } from "react";
import api from '@/lib/api/api';

export default function ProjectList({admin = false, onEdit}){
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchData = async () => {
        setLoading(true);
        try{
            const { data } = await api.get('/projects');
            setItems(data); 
        } catch (err){
            console.error('Error fetching projects:', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);

    const handleDelete = async (id) => {
        if(!confirm('Are you sure you want to delete this project?')) return;
        try{
            await api.delete(`/projects/${id}`);
            await fetchData();
        } catch (err){
            console.error('Error deleting project:', err);
            alert('Failed to delete project');
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;
    if (!items.length) return <p className="p-4">No projects found.</p>;

    const sortProjects = (projectArray) => {
        return [...projectArray].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US",{
            year: 'numeric',
            month: 'short'
        });
    };

    return (
        <ul className="space-y-4 p-4">
            {sortProjects(items).map((proj) => (
                <li key={proj._id} className="border rounded-xl p-4 flex justify-between items-start">
                    <div>
                        <div className="font-semibold">{proj.projectName}</div>
                        <div className="text-sm opacity-80">{proj.techStack.join(', ')}</div>
                        <div className="text-sm opacity-80">My Role : {proj.role}</div>
                        <div className="text-sm text-gray-500">{formatDate(proj.startDate)} - {formatDate(proj.endDate)}</div>
                        <div className="mt-2">{proj.description}</div>
                        <div className="mt-2">My Contributions : <br /> {proj.contributions}</div>
                        {proj.link && (
                            <div className="mt-2">
                                <a href={proj.link} target="_blank" className="text-blue-500">View Project on GitHub</a>
                            </div>
                        )}
                    </div>
                    {admin && (
                        <div className="flex space-x-2">
                            <button onClick={() => onEdit(proj)} className="text-blue-500">Edit</button>
                            <button onClick={() => handleDelete(proj._id)} className="text-red-500">Delete</button>
                        </div>
                    )}
                </li>
            ))}
        </ul>
    );
}