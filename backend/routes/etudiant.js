const express = require('express');
const router =express.Router();
const EtudiantController= require('../controllers/etudiant');
router.get('/connexion/:email/:password',EtudiantController.connexion);
router.get('/',EtudiantController.getAllEtudiant);
router.get('/formation/:idEtudiant',EtudiantController.getFormationByIdEtudiant);
router.get('/:idEtudiant',EtudiantController.getEtudiantById);
router.post('/',EtudiantController.createEtudiant);
router.put('/:idEtudiant',EtudiantController.updateEtudiant);
router.put(
    "/changerMotDePasse/:idEtudiant",
    EtudiantController.changerMotDePasse
  );
router.delete('/:idEtudiant',EtudiantController.deleteEtudiant);

module.exports= router;

