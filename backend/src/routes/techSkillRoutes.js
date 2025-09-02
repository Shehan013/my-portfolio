const express = require('express');
const router = express.Router();
const techSkillController = require('../controllers/techSkillController');
const validateTechSkill = require('../middleware/validateTechSkill');

router.post('/', validateTechSkill, techSkillController.createTechSkill);
router.get('/', techSkillController.getAllTechSkills);
router.get('/:id', techSkillController.getTechSkillsById);
router.put('/:id', validateTechSkill, techSkillController.updateTechSkill);
router.delete('/:id', techSkillController.deleteTechSkill);

module.exports = router;