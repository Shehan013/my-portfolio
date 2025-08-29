const Project = require('../models/projectSchema');

exports.getAllProjects = async (req, res) => {
    try{
        const allprojects = await Project.find();
        res.json(allprojects);  
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Project Retrieval Failed' });
    }
};

exports.getProjectById = async (req, res) => {
    try{
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid project ID format' });
        }
        const project = await Project.findById(id);
        if(!project) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Project Retrieval By ID Failed' });
    }
};

exports.createProject = async (req, res) => {
    try{
        const { projectName, techStack, role, startDate, endDate, description, contributions, link } = req.body;
        const newProject = await Project.create({
            projectName,
            techStack,
            role,
            startDate,
            endDate,
            description,
            contributions,
            link
        });
        res.status(201).json(newProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Project Creation Failed' });
    }
};

exports.updateProject = async (req, res) => {
    try{
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid project ID format' });
        }
        
        const updateData = {};
        const allowedFields = ['projectName', 'techStack', 'role', 'startDate', 'endDate', 'description', 'contributions', 'link'];
        allowedFields.forEach(field => {
            if(req.body[field]) {
                updateData[field] = req.body[field];
            }
        });

        const updatedProject = await Project.findByIdAndUpdate(
            id,
            updateData,
            { new: true , runValidators: true }
        );
        if(!updatedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json(updatedProject);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Project Update Failed' });
    }
};

exports.deleteProject = async (req, res) => {
    try {
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)) {
            return res.status(400).json({ message: 'Invalid project ID format' });
        }

        const deletedProject = await Project.findByIdAndDelete(id);
        if(!deletedProject) {
            return res.status(404).json({ message: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error - Project Deletion Failed' });
    }
};