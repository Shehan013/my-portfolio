'use client'
import { useState } from "react";
import EducationList from "@/components/EducationList";
import EducationForm from "@/components/EducationForm";
import ProjectList from "@/components/ProjectList";
import ProjectForm from "@/components/ProjectForm";

export default function AdminPage(){
    const [selected, setSelected] = useState(null);
    const [educationRefreshKey, setEducationRefreshKey] = useState(0);
    const [projectRefreshKey, setProjectRefreshKey] = useState(0);

    const onSaved = () => {
        setSelected(null);
        setEducationRefreshKey((k) => k + 1);
        setProjectRefreshKey((k) => k + 1);
    };

    return (
        <main className="max-w-exl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold">Admin : Education</h1>
            <EducationForm selected={selected} onSaved={onSaved}/>
            <div key={`education-${educationRefreshKey}`}>
                <EducationList admin onEdit={setSelected}/>
            </div>
            <h1 className="text-2xl font-bold">Admin : Projects</h1>
            <ProjectForm selected={selected} onSaved={onSaved}/>
            <div key={`project-${projectRefreshKey}`}>
                <ProjectList admin onEdit={setSelected}/>
            </div>
        </main>
    );
}