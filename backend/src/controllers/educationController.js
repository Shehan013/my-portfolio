const Education = require('../models/educationSchema');

exports.getAllEducation = async (req, res) => {
    try {
        const allEducation = await Education.find();
        res.json(allEducation);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.getEducationById = async (req, res) => {
    try{
        const {id} = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        const education = await Education.findById(id);
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.json(education);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.createEducation = async (req, res) => {
    try{
        const { institution, degree, fieldOfStudy, startDate, endDate, description } = req.body;
        
        const newEducation = await Education.create({
            institution,
            degree,
            fieldOfStudy,
            startDate,
            endDate,
            description
        });

        res.status(201).json({ message: 'Education added successfully', newEducation });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.updateEducation = async (req, res) => {
    try{
        const {id} = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }

        const updateData = {};
        const allowedFields = ['institution', 'degree', 'fieldOfStudy', 'startDate', 'endDate', 'description'];

        for(const [key, value] of Object.entries(req.body)) {
            if(value !== undefined) {
                updateData[key] = value;
            }
        }

        const education = await Education.findByIdAndUpdate(
            id,
            updateData,
           { new: true, runValidators: true } //new = return updated doc, runValidators = enforce schema rules
        );
    
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.json({ message: 'Education updated successfully', updatedEducation: education });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteEducation = async (req, res) => {
    try{
        const {id} = req.params;
        if (!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        
        const education = await Education.findByIdAndDelete(id);
        if (!education) {
            return res.status(404).json({ message: 'Education not found' });
        }
        res.json({ message: 'Education deleted successfully', deletedEducation: education });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};


