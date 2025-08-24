import EducationList from "@/components/EducationList";

export default function HomePage(){
  return  (
    <main className="max-w-3xl mx-auto py-10">
       <h1 className="text-2xl font-bold mb-4">Education</h1>
       <EducationList />
    </main>
  );
}