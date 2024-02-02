const express = require('express');
const router =express.Router();
const quizzController= require('../controllers/quizz');



router.post('/:idFormation',quizzController.postQuestion);

module.exports= router;