const express = require('express');
const router = express.Router();
const validateLeadership = require('../middleware/validateLeadership');
const LeadershipController = require('../controllers/LeadershipController');

router.post('/', validateLeadership, LeadershipController.createLeadership);
router.get('/', LeadershipController.getAllLeadership);
router.get('/:id', LeadershipController.getLeadershipById);
router.put('/:id', validateLeadership, LeadershipController.updateLeadership);
router.delete('/:id', LeadershipController.deleteLeadership);

module.exports = router;