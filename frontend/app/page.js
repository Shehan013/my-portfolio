import EducationList from "@/components/EducationList";
import ProjectList from "@/components/ProjectList";

export default function HomePage(){
  return  (
    <main className="max-w-3xl mx-auto py-10">
       <h1 className="text-2xl font-bold mb-4">Education</h1>
       <EducationList />
       <h1 className="text-2xl font-bold mb-4">Projects</h1>
       <ProjectList />
    </main>
  );
}