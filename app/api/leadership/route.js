import connectDB from  "@/lib/mongodb";
import Leadership from "@/lib/models/Leadership";
import { validateLeadership } from "@/lib/validators/validateLeadership";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(request) {
    try {
        await connectDB();
        const leadershipData = await Leadership.find();
        return new Response(JSON.stringify(leadershipData), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Server Error - Failed to fetch leadership data' }), { status: 500 });
    }
}

export async function POST(request) {

    const { isAuthenticated } = await requireAuth(request);
    if(!isAuthenticated) {
        return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    
    try {
        await connectDB();
        const body = await request.json();
        const validationError = validateLeadership(body);
        if (validationError) {
            return new Response(JSON.stringify({ message: validationError }), { status: 400 });
        }
        const newLeadership = await Leadership.create(body);
        return Response.json(newLeadership, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Server Error - Failed to create leadership entry' }), { status: 500 });
    }
}
