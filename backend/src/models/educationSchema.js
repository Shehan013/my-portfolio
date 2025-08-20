const mongoose = require('mongoose');

const educationSchema = new mongoose.Schema({
    institution: { type: String, required: true},
    degree: { type: String, required: true },
    fieldOfStudy: { type: String},
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    description: { type: String }
});

module.exports = mongoose.model('Education', educationSchema);