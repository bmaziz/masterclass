const express = require('express');
const router =express.Router();
const formateurController= require('../controllers/formateur');

router.get('/',formateurController.getAllFormateur);
router.get('/:idFormateur',formateurController.getFormateurById);
router.post('/',formateurController.postFormateur);
router.put('/:idFormateur',formateurController.updateFormateur);
router.delete('/:idFormateur',formateurController.deleteFormateur);

module.exports= router;

