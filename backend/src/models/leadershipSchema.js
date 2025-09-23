const mongoose = require('mongoose');

const leadershipSchema = new mongoose.Schema({
    role: { type: String, required: true },
    organization: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date },
    description: { type: String }
})

module.exports = mongoose.model('Leadership', leadershipSchema);