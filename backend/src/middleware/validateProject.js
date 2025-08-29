module.exports = (req, res, next) => {
    const {
        projectName,
        techStack,
        role,
        startDate,
        endDate,
        description,
        contributions,
        link
    } = req.body;

    if(!projectName || typeof projectName !== 'string'){
        return res.status(400).json({ message: 'Invalid or missing projectName' });
    }

    if(!techStack || !Array.isArray(techStack)){
        return res.status(400).json({ message: 'Invalid or missing techStack' });
    }
    if(!role || typeof role !== 'string'){
        return res.status(400).json({ message: 'Invalid or missing role' });
    }
    if(!startDate || !Date.parse(startDate)){
        return res.status(400).json({ message: 'Invalid or missing startDate' });
    }
    if(endDate && !Date.parse(endDate)){
        return res.status(400).json({ message: 'Invalid or missing endDate' });
    }
    if(!description || typeof description !== 'string'){
        return res.status(400).json({ message: 'Invalid or missing description' });
    }
    if(contributions && !Array.isArray(contributions)){
        return res.status(400).json({ message: 'Invalid or missing contributions' });
    }
    if(link && typeof link !== 'string'){
        return res.status(400).json({ message: 'Invalid or missing link' });
    }

    next();
};