const mongoose = require("mongoose");

const techSkillSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    icon: {
        type: String,
        default: "",
    }
}, { timestamps: true });

module.exports = mongoose.model("TechSkill", techSkillSchema);