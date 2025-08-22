const express = require('express');
const router = express.Router();
const validateEducation = require('../middleware/validateEducation');
const educationController = require('../controllers/educationController');

router.post('/', validateEducation, educationController.createEducation());
router.get('/', educationController.getAllEducation);
router.get('/:id', educationController.getEducationById);
router.put('/:id', validateEducation,educationController.updateEducation);
router.delete('/:id', educationController.deleteEducation);

module.exports = router;

