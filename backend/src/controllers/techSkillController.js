const TechSkill = require('../models/techSkillSchema');


exports.getAllTechSkills = async (req, res) => {
    try{
        const allTechSkills = await TechSkill.find();
        res.json(allTechSkills);
    } catch (err){
        console.error(err);
        res.status(500).json({message: 'Server Error - Tech Skill Retrieval Failed'});
    }
};

exports.getTechSkillsById = async (req, res) => {
    try{
        const {id} =req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({message: 'Invalid tech skill ID format'});
        }
        const techSkill = await TechSkill.findById(id);
        if(!techSkill){
            return res.status(404).json({message: 'Tech Skill Not Found'});
        }
        res.json(techSkill);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error - Tech Skill Retrieval By ID Failed'});
    }
};

exports.createTechSkill = async (req, res) => {
    try {
        const {name, category, icon} = req.body;
        const newTechSkill = await TechSkill.create({
            name,
            category,
            icon
        });
        res.status(201).json(newTechSkill);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error - Tech Skill Creation Failed'});
    }
};

exports.updateTechSkill = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({message: 'Invalid tech skill ID format'});
        }

        const updateData = {};
        const allowedFields = ['name', 'category', 'icon'];
        allowedFields.forEach(field => {
            if(req.body.hasOwnProperty(field)) {
                updateData[field] = req.body[field];
            }
        });
        
        const updateTechSkill = await TechSkill.findByIdAndUpdate(
            id,
            updateData,
            {new: true, runValidators: true}
        );
        if(!updateTechSkill){
            return res.status(404).json({message: 'Tech Skill Not Found'});
        }
        res.json(updateTechSkill);
    } catch (err){
        console.error(err);
        res.status(500).json({message: 'Server Error - Tech Skill Update Failed'});
    }
};

exports.deleteTechSkill = async (req, res) => {
    try{
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({message: 'Invalid tech skill ID format'});
        }

        const deletedTechSkill = await TechSkill.findByIdAndDelete(id);
        if(!deletedTechSkill){
            return res.status(404).json({message: 'Tech Skill Not Found'});
        }
        res.json({message: 'Tech Skill Deleted Successfully'});
    } catch (err){
        console.error(err);
        res.status(500).json({message: 'Server Error - Tech Skill Deletion Failed'});
    }
};
