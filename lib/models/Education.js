import mongoose from 'mongoose';

const EducationSchema = new mongoose.Schema({
    institution: { type: String, required: true},
    degree: { type: String, required: true },
    fieldOfStudy: { type: String},
    startDate: { type: Date, required: true },
    endDate: { type: Date},
    description: { type: String }
});

const Education = mongoose.models.Education || mongoose.model('Education', EducationSchema);

export default Education;