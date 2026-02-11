import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { validateProject } from "@/lib/validators/validateProject";
import { requireAuth } from "@/lib/middleware/auth";

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
    // Authentication check
    const { isAuthenticated } = await requireAuth(request);
    if(!isAuthenticated) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    // Post request handling
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
