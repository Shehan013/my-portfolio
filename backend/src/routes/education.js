const express = require('express');
const router = express.Router();
const educationController = require('../controllers/educationController');

router.post('/', educationController.createEducation);
router.get('/', educationController.getAllEducation);
router.get('/:id', educationController.getEducationById);
router.put('/:id', educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);

module.exports = router;

