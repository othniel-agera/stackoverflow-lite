const { Router } = require('express');
const {
  getQuestion, getQuestions, postQuestion, putQuestion, deleteQuestion,
} = require('../controllers/question.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router();

router.get('/:id', authenticate, getQuestion);
router.get('/', authenticate, getQuestions);
router.post('/', authenticate, postQuestion);
router.put('/:id', authenticate, putQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
