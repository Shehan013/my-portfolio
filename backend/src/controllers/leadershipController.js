const Leadership = require('../models/leadershipSchema');

exports.getAllLeadership = async (req, res) => {
    try {
        const allLeadership = await Leadership.find();
        res.status(200).json(allLeadership);
    } catch (err){
        console.error(err);
        res.status(500).json({message: 'Server Error - Leadership - all data Retrieval Failed'});
    }
};

exports.getLeadershipById = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({message: 'Invalid Leadership ID'});
        }
        const leadership = await Leadership.findById(id);
        if(!leadership){
            return res.status(404).json({message: 'Leadership Not Found'});
        }
        res.status(200).json(leadership);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error - Leadership Retrieval Failed'});
    }
};

exports.createLeadership = async (req, res) => {
    try {
        const {role, organization, startDate, endDate, description} = req.body;
        const newLeadership = await Leadership.create({
            role,
            organization,
            startDate,
            endDate,
            description
        });
        res.status(201).json(newLeadership);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error - Leadership Creation Failed'});
    }
};

exports.updateLeadership = async (req, res) => {
    try { 
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({message: 'Invalid Leadership ID'});
        }

        const updateData = {};
        const allowedFields = ['role', 'organization', 'startDate', 'endDate', 'description'];
        allowedFields.forEach(field => {
            if (req.body[field] !== undefined) {
                updateData[field] = req.body[field];
            }
        });

        const updatedLeadership = await Leadership.findByIdAndUpdate(
            id,
            updateData,
            { new: true, runValidators: true }  
        );
        
        if(!updatedLeadership){
            return res.status(404).json({message: 'Leadership Not Found'});
        }
        res.status(200).json(updatedLeadership);
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error - Leadership Update Failed'});
    }
};

exports.deleteLeadership = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(400).json({message: 'Invalid Leadership ID'});
        }

        const deletedLeadership = await Leadership.findByIdAndDelete(id);
        if(!deletedLeadership){
            return res.status(404).json({message: 'Leadership Not Found'});
        }
        res.status(200).json({message: 'Leadership Deleted Successfully'});
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Server Error - Leadership Deletion Failed'});
    }
};