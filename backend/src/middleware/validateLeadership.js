module.exports = ( req, res, next ) => {   //Here we use req, res and next, so that's how we recognize the middleware right?
    const {
        role,
        organization,
        startDate,
        endDate,
        description
    } = req.body;

    if(!role || typeof role !== 'string'){
        return res.status(400).json({ message: 'Role is required and should be a string.' });
    }

    if(!organization || typeof organization !== 'string'){
        return res.status(400).json({ message: 'Organization is required and should be a string.' });
    }

    if(!startDate || !Date.parse(startDate)){        //I cna't recap the usage of Date.parse()
        return res.status(400).json({ message: 'Start Date is required and should be a valid date.' });
    }

    if(endDate && !Date.parse(endDate)){
        return res.status(400).json({ message: 'End Date should be a valid date if provided.' });
    }

    if(description && typeof description !== 'string'){
        return res.status(400).json({ message: 'Description should be a string if provided.' });
    }

    next(); //As I remeber we used to next to sow the end of the middleware, if we miss it, the loop will be iterated.
} ;