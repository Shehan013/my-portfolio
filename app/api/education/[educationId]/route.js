import connectDB from "@/lib/mongodb";
import Education from "@/lib/models/Education";
import { validateEducation } from "@/lib/validators/validateEducation";

export async function GET(req, { params }) {
    await connectDB();

    const { educationId } = await params;

    const educationEntry = await Education.findById(educationId);

    if (!educationEntry) {
        return Response.json({ message: 'Education entry not found' }, { status: 404 });
    }
    return Response.json(educationEntry, { status: 200 });
}

export async function PUT(req, { params }) {
    await connectDB();

    const { educationId } = await params;
    const body = await req.json();
    const error = validateEducation(body);

    if(error){
        return Response.json({ message: error }, { status: 400 });
    }

    const updated = await Education.findByIdAndUpdate(educationId, body, { new: true });

    if(!updated){
        return Response.json({ message: 'Education entry not found' }, { status: 404 });
    }
    return Response.json(updated, { status: 200 });
}

export async function DELETE(req, { params }) {
    await connectDB();

    const { educationId } = await params;   

    const deleted = await Education.findByIdAndDelete(educationId);

    if(!deleted){
        return Response.json({ message: 'Education entry not found' }, { status: 404 });
    }   

    return Response.json({ message: 'Education entry deleted successfully' }, { status: 200 });
}