const express = require('express');
const router =express.Router();
const FormationController= require('../controllers/formation');

router.get('/',FormationController.getAllFormation);
router.get('/:idFormation',FormationController.getFormationById);
router.post('/',FormationController.createFormation);
router.put('/:idFormation',FormationController.updateFormation);
router.delete('/:idFormation',FormationController.deleteFormation);
module.exports= router;

