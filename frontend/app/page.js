import EducationList from "@/components/EducationList";
import ProjectList from "@/components/ProjectList";
import TechSkillList from "@/components/TechSkillList";
import LeadershipList from "@/components/LeadershipList";

export default function HomePage(){
  return  (
    <main className="max-w-3xl mx-auto py-10">
       <h1 className="text-2xl font-bold mb-4">Education</h1>
       <EducationList />
       <h1 className="text-2xl font-bold mb-4">Projects</h1>
       <ProjectList />
        <h1 className="text-2xl font-bold mb-4">Tech Skills</h1>
        <TechSkillList />
        <h1 className="text-2xl font-bold mb-4">Leadership</h1>
        <LeadershipList />
    </main>
  );
}