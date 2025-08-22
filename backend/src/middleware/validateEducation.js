module.exports = (req, res, next) => {
    const {
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
        
    next();
};