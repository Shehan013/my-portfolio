const mongoose = require('mongoose');

const LeadershipSchema = new mongoose.Schema({
    role: { type: String, required: true },
    organization: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
});

const Leadership = mongoose.models.Leadership || mongoose.model('Leadership', LeadershipSchema);

export default Leadership;