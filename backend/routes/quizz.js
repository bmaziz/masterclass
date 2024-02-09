const express = require('express');
const router =express.Router();
const quizzController= require('../controllers/quizz');

router.get('/:idFormation',quizzController.getQuizByFormation);
router.get('/question/:idQuiz',quizzController.getQuestionByQuiz);
router.post('/:idFormation',quizzController.postQuiz);
router.post('/question/:idQuiz',quizzController.postQuestion);

router.put('/:idQuestion',quizzController.putQuestion)

router.delete('/:idQuiz',quizzController.deleteQuiz);
module.exports= router;