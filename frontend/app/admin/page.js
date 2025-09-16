'use client'
import { useState } from "react";
import EducationList from "@/components/EducationList";
import EducationForm from "@/components/EducationForm";
import ProjectList from "@/components/ProjectList";
import ProjectForm from "@/components/ProjectForm";
import TechSkillList from "@/components/TechSkillList";
import TechSkillForm  from "@/components/TechSkillForm";    

export default function AdminPage(){
    const [selectedEducation, setSelectedEducation] = useState(null);
    const [selectedProject, setSelectedProject] = useState(null);
    const [selectedTechSkill, setSelectedTechSkill] = useState(null);
    const [educationRefreshKey, setEducationRefreshKey] = useState(0);
    const [projectRefreshKey, setProjectRefreshKey] = useState(0);
    const [techSkillRefreshKey, setTechSkillRefreshKey] = useState(0);

    const onSaved = () => {
        setEducationRefreshKey((k) => k + 1);
        setProjectRefreshKey((k) => k + 1);
        setTechSkillRefreshKey((k) => k + 1);
    };

    return (
        <main className="max-w-xl mx-auto py-10 space-y-6">
            <h1 className="text-2xl font-bold">Admin : Education</h1>
            <EducationForm selected={selectedEducation} onSaved={onSaved}/>
            <div key={`education-${educationRefreshKey}`}>
                <EducationList admin onEdit={setSelectedEducation}/>
            </div>
            <h1 className="text-2xl font-bold">Admin : Projects</h1>
            <ProjectForm selected={selectedProject} onSaved={onSaved}/>
            <div key={`project-${projectRefreshKey}`}>
                <ProjectList admin onEdit={setSelectedProject}/>
            </div>
            <h1 className="text-2xl font-bold">Admin : Tech Skills</h1>
            <TechSkillForm selected={selectedTechSkill} onSaved={onSaved}/>
            <div key={`techskill-${techSkillRefreshKey}`}>
                <TechSkillList admin onEdit={setSelectedTechSkill}/>
            </div>
        </main>
    );
}