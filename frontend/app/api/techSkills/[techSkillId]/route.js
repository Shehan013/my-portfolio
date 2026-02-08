import connectDB from "@/lib/mongodb";
import TechSkill from "@/lib/models/TechSkill";
import { validateTechSkill } from "@/lib/validators/validateTechSkill";

export async function GET(req, { params }) {
    await connectDB();

    const { techSkillId } = await params;

    const techSkillEntry = await TechSkill.findById(techSkillId);

    if (!techSkillEntry) {
        return Response.json({ message: 'Tech skill entry not found' }, { status: 404 });
    }
    return Response.json(techSkillEntry, { status: 200 });
}

export async function PUT(req, { params }) {
    await connectDB();

    const { techSkillId } = await params;
    const body = await req.json();
    const error = validateTechSkill(body);

    if (error) {
        return Response.json({ message: error }, { status: 400 });
    }

    const updated = await TechSkill.findByIdAndUpdate(techSkillId, body, { new: true });

    if (!updated) {
        return Response.json({ message: 'Tech skill entry not found' }, { status: 404 });
    }
    return Response.json(updated, { status: 200 });
}

export async function DELETE(req, { params }) {
    await connectDB();

    const { techSkillId } = await params;

    const deleted = await TechSkill.findByIdAndDelete(techSkillId);

    if (!deleted) {
        return Response.json({ message: 'Tech skill entry not found' }, { status: 404 });
    }

    return Response.json({ message: 'Tech skill entry deleted successfully' }, { status: 200 });
}
