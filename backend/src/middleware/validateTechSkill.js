module.exports = (req, res, next ) => {
    const {
        name,
        category,
        icon
    } = req.body;

    if (!name || typeof name !== 'string'){
        return res.status(400).json({ message: 'Invalid tech skill name' });
    }

    if (!category || typeof category !== 'string'){
        return res.status(400).json({ message: 'Invalid tech skill category' });
    }

    if (!icon || typeof icon !== 'string'){
        return res.status(400).json({ message: 'Invalid tech skill icon' });
    }
    next();
}