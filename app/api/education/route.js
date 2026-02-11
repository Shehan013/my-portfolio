import connectDB from "@/lib/mongodb";
import Education from "@/lib/models/Education";
import { validateEducation } from "@/lib/validators/validateEducation";
import { requireAuth } from "@/lib/middleware/auth";

export async function GET(request) {
    try {
        await connectDB();
        const educationData = await Education.find();
        return new Response(JSON.stringify(educationData), { status: 200 });
    } catch (error) {
        return new Response("Server Error - Failed to fetch education data", { status: 500 });
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
        const validationError = validateEducation(body);
        if (validationError) {
            return new Response(validationError, { status: 400 });
        }
        // return new Response("Education is validated", { status: 200 });
        const newEducation = await Education.create(body);
        return Response.json(newEducation, { status: 201 });
    } catch (error) {
        return new Response("Server Error - Failed to create education data", { status: 500 });
    }
}
