const mongoose = require('mongoose');

const TechSkillSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true},
    category: { type: String, required: true, trim: true },
    icon: { type: String, default: '' }
    }, { timestamps: true });

const TechSkill = mongoose.models.TechSkill || mongoose.model('TechSkill', TechSkillSchema);

export default TechSkill;
