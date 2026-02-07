const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    techStack: { type: [String], required: true },
    role: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    contributions: { type: [String] },
    link: { type: String }
});

const Project = mongoose.models.Project || mongoose.model('Project', ProjectSchema);

export default Project;
