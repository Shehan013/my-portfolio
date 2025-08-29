const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    projectName: { type: String, required: true },
    techStack: { type: [String], required: true },
    role: { type: String },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String, required: true },
    contributions: { type: [String]},
    link: { type: String }
});

module.exports = mongoose.model('Project', projectSchema);