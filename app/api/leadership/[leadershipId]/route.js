import connectDB from "@/lib/mongodb";
import Leadership from "@/lib/models/Leadership";
import { validateLeadership } from "@/lib/validators/validateLeadership";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(req, { params }) {
    await connectDB();

    const { leadershipId } = await params;

    const leadershipEntry = await Leadership.findById(leadershipId);

    if (!leadershipEntry) {
        return Response.json({ message: 'Leadership entry not found' }, { status: 404 });
    }
    return Response.json(leadershipEntry, { status: 200 });
}

export async function PUT(req, { params }) {

    const { isAuthenticated } = await requireAuth(req);
    if(!isAuthenticated) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { leadershipId } = await params;
    const body = await req.json();
    const error = validateLeadership(body);

    if(error){
        return Response.json({ message: error }, { status: 400 });
    }

    const updated = await Leadership.findByIdAndUpdate(leadershipId, body, { new: true });

    if(!updated){
        return Response.json({ message: 'Leadership entry not found' }, { status: 404 });
    }

    return Response.json(updated, { status: 200 });
}

export async function DELETE(req, { params }) {
    
    const { isAuthenticated } = await requireAuth(req);
    if(!isAuthenticated) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const { leadershipId } = await params;

    const deleted = await Leadership.findByIdAndDelete(leadershipId);

    if(!deleted){
        return Response.json({ message: 'Leadership entry not found' }, { status: 404 });
    }

    return Response.json({ message: 'Leadership entry deleted successfully' }, { status: 200 });
}