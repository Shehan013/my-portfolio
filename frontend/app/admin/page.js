'use client'
import { useState } from "react";
import EducationList from "@/components/EducationList";
import EducationForm from "@/components/EducationForm";

export default function AdminPage(){
    const [selected, setSelected] = useState(null);
    const [refreshKey, setRefreshKey] = useState(0);

    const onSaved = () => {
        setSelected(null);
        setRefreshKey((k) => k + 1);
    };

    return (
        <main className="max-w-exl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold">Admin • Education</h1>
            <EducationForm selected={selected} onSaved={onSaved}/>
            <div key = {refreshKey}>
                <EducationList admin onEdit={setSelected}/>
            </div>
        </main>
    );
}