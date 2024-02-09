const express = require('express');
const router =express.Router();
const FormationController= require('../controllers/formation');

router.get('/',FormationController.getAllFormation);
router.get('/demande',FormationController.getDemandeFormation);
router.get('/:idFormation',FormationController.getFormationById);
router.post('/',FormationController.createFormation);
router.post('/demande/:idFormation/:idEtudiant',FormationController.postDemande);
router.put('/accepterDemande/:idFormation/:idEtudiant',FormationController.accepterDemande)
router.put('/:idFormation',FormationController.updateFormation);
router.delete('/refuserDemande/:idFormation/:idEtudiant',FormationController.refuserDemande);
router.delete('/:idFormation',FormationController.deleteFormation);
module.exports= router;

