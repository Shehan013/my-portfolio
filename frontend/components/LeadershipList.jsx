'use client'                   
import { useEffect, useState } from "react";       
import api from '@/lib/api/api';
import { getAllLeadership, deleteLeadership } from "@/lib/api/leadershipApi";

export default function LeadershipList({admin = false, onEdit}){               
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);                

    const fetchData = async () => {
        setLoading(true);                    
        try{
            const { data } = await getAllLeadership();   
            setItems(data);                                  
        } catch (err){
            console.error('Error fetching leadership', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchData(); }, []);      

    const handleDelete = async (id) => {
        if (!confirm('Are you sure you want to delete this item?')) return;   
        try{
            await deleteLeadership(id); 
            await fetchData();
        } catch (err){
            console.error('Error deleting item', err);
            alert('Failed to delete item');
        }
    };

    if (loading) return <p className="p-4">Loading...</p>;    
    if (!items.length) return <p className="p-4">No leadership items found.</p>;  

    const sortLeadershipByDate = (leadershipArray) => {
        return [...leadershipArray].sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    };

    const sortLeadershipByOrg = (leadershipArray) => {
        const sortedByDate = sortLeadershipByDate(leadershipArray);
        const orgMap = new Map();

        for (const item of sortedByDate) {
            if (!orgMap.has(item.organization)) {
                orgMap.set(item.organization, []);
            }
            orgMap.get(item.organization).push(item);
        }

        return Array.from(orgMap.values()).flat();
    };


    const formatDate = (dateString) => {
        if(!dateString) return "";
        return new Date(dateString).toLocaleDateString("en-US", {          
            year: "numeric",
            month: "short",
        });
    };

    return (
        <div className="space-y-6 p-4">
            {(() => {
                const sortedItems = sortLeadershipByOrg(items);
                const groupedByOrg = {};
                
                sortedItems.forEach(item => {
                    if (!groupedByOrg[item.organization]) {
                        groupedByOrg[item.organization] = [];
                    }
                    groupedByOrg[item.organization].push(item);
                });

                return Object.entries(groupedByOrg).map(([organization, roles]) => (
                    <div key={organization} className="border rounded-xl p-4">
                        <h3 className="font-semibold text-lg mb-3">{organization}</h3>
                        <ul className="space-y-3">
                            {roles.map((lead) => (
                                <li key={lead._id} className="flex justify-between items-start">
                                    <div>
                                        <div className="font-medium">{lead.role}</div>
                                        <div className="text-sm opacity-70">{formatDate(lead.startDate)}{formatDate(lead.endDate) == formatDate(lead.startDate) ? " " : ` - ${formatDate(lead.endDate) || "Present"}`}</div>
                                        {lead.description && <p className="text-sm">{lead.description}</p>}
                                    </div>
                                    {admin && (
                                        <div className="flex gap-2">
                                            <button className="px-3 py-1 rounded-lg border" onClick={() => onEdit(lead)}>Edit</button>
                                            <button className="px-3 py-1 rounded-lg border bg-red-500 text-white" onClick={() => handleDelete(lead._id)}>Delete</button>
                                        </div>
                                    )}
                                </li>
                            ))}
                        </ul>
                    </div>
                ));
            })()}
        </div>
    );
}