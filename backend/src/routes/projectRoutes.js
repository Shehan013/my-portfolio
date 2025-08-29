const express = require('express');
const router = express.Router();
const validateProject = require('../middleware/validateProject');
const projectController = require('../controllers/projectController');

router.post('/', validateProject, projectController.createProject);
router.get('/', projectController.getAllProjects);
router.get('/:id', projectController.getProjectById);
router.put('/:id', validateProject, projectController.updateProject);
router.delete('/:id', projectController.deleteProject);

module.exports = router;