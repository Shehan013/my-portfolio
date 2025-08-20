const Education = require('../models/educationSchema');

exports.getAllEducation = (req, res) => {
    res.json(educationData);
};

exports.getEducationById = (req, res) => {
    const {id} = req.params;
    const index = educationData.findIndex(ed => ed.id === parseInt(id));

    if (index === -1) {
        return res.status(404).json({ message: 'Education not found'});
    }
    res.json(educationData[index]);
};

exports.createEducation = (req, res) => {
     const {
        id,
        institution,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        description
    } = req.body;

    if (!institution || typeof institution !== 'string') {
        return res.status(400).json({ message: 'Invalid institution' });
    }
    if(!degree || typeof degree !== 'string') {
        return res.status(400).json({ message: 'Invalid degree' });
    }
    if(fieldOfStudy && typeof fieldOfStudy !== 'string' ) {
        return res.status(400).json({ message: 'Invalid field of study' });
    }
    if(!startDate || !Date.parse(startDate)) {
        return res.status(400).json({ message: 'Invalid start date' });
    }
    if(endDate && !Date.parse(endDate)) {
        return res.status(400).json({ message: 'Invalid end date' });
    }
    if(description && typeof description !== 'string') {
        return res.status(400).json({ message: 'Invalid description' });
    }
    const newEducation = {
        id: educationData.length + 1,
        institution,
        degree,
        fieldOfStudy,
        startDate,
        endDate,
        description
    };
    educationData.push(newEducation);
    res.status(201).json({ message: 'Education added successfully', newEducation });
};

exports.updateEducation = (req, res) => {
    const {id} = req.params;
    const index = educationData.findIndex(ed => ed.id === parseInt(id));

    if(index === -1)
    {
        return res.status(404).json({ message: 'Education not found' });
    }

    educationData[index] = {...educationData[index], ...req.body };
    res.json({ message: 'Education updated successfully', updatedEducation: educationData[index] });
};

exports.deleteEducation = (req, res) => {
    const {id} = req.params;
    const index = educationData.findIndex(ed => ed.id === parseInt(id));

    if(index === -1)
    {
        return res.status(404).json({ message: 'Education not found' });
    }

    const deleted = educationData.splice(index, 1);
    res.json({ message: 'Education deleted successfully', deletedEducation: deleted[0] });
};


