import connectDB from "@/lib/mongodb";
import Project from "@/lib/models/Project";
import { validateProject } from "@/lib/validators/validateProject";

export async function GET(req, { params }) {
    await connectDB();

    const { projectId } = await params;
    const projectEntry = await Project.findById(projectId);
    
    if (!projectEntry) {
        return Response.json({ message: 'Project entry not found' }, { status: 404 });
    }
    return Response.json(projectEntry, { status: 200 });
}

export async function PUT(req, { params }) {
    await connectDB();

    const { projectId } = await params;
    const body = await req.json();
    const error = validateProject(body);

    if (error) {
        return Response.json({ message: error }, { status: 400 });
    }

    const updated = await Project.findByIdAndUpdate(projectId, body, { new: true });

    if (!updated) {
        return Response.json({ message: 'Project entry not found' }, { status: 404 });
    }
    return Response.json(updated, { status: 200 });
}

export async function DELETE(req, { params }) {
    await connectDB();

    const { projectId } = await params;
    const deleted = await Project.findByIdAndDelete(projectId);

    if (!deleted) {
        return Response.json({ message: 'Project entry not found' }, { status: 404 });
    }

    return Response.json({ message: 'Project entry deleted successfully' }, { status: 200 });
}
