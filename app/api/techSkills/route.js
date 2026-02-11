import connectDB from "@/lib/mongodb";
import TechSkill from "@/lib/models/TechSkill";
import { validateTechSkill } from "@/lib/validators/validateTechSkill";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(request) {
    try {
        await connectDB();
        const techSkillData = await TechSkill.find();
        return new Response(JSON.stringify(techSkillData), { status: 200 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Server Error - Failed to fetch tech skill data' }), { status: 500 });
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
        const validationError = validateTechSkill(body);
        if (validationError) {
            return new Response(validationError, { status: 400 });
        }
        const newTechSkill = await TechSkill.create(body);
        return Response.json(newTechSkill, { status: 201 });
    } catch (err) {
        console.error(err);
        return new Response(JSON.stringify({ message: 'Server Error - Failed to create tech skill data' }), { status: 500 });
    }
}
