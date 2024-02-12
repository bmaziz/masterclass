const express = require('express');
const router =express.Router();
const quizzController= require('../controllers/quizz');

router.get('/:idFormation',quizzController.getQuizByFormation);
router.get('/note/:idQuiz',quizzController.getNoteQuiz);
router.get('/note/:idQuiz/:idEtudiant',quizzController.getNoteQuizByEtudiant);
router.get('/question/:idQuiz',quizzController.getQuestionByQuiz);
router.post('/:idFormation',quizzController.postQuiz);
router.post('/question/:idQuiz',quizzController.postQuestion);
router.post('/note/:idQuiz/:idEtudiant',quizzController.postNote);
router.put('/:idQuestion',quizzController.putQuestion)

router.delete('/:idQuiz',quizzController.deleteQuiz);
module.exports= router;