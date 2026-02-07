import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { validateProject } from "@/lib/validators/validateProject";

export async function GET(request) {
    try {
        await connectDB();
        const projectData = await Project.find();
        return new Response(JSON.stringify(projectData), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Server Error - Failed to fetch project data' }), { status: 500 });

    }
}

export async function POST(request) {
    try {
        await connectDB();
        const body = await request.json();
        const validationError = validateProject(body);
        if (validationError) {
            return new Response(validationError, { status: 400 });
        }
        const newProject = await Project.create(body);
        return Response.json(newProject, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Server Error - Failed to create project data' }), { status: 500 });
    }
}
