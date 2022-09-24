const { Router } = require('express');
const {
  getQuestion,
  getQuestions,
  getQuestionsBySearchQuery,
  postQuestion,
  putQuestion,
  deleteQuestion,
  getVotesOnQuestion,
  postVoteOnQuestion,
} = require('../controllers/question.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router();

router.get('/search/:search_query', authenticate, getQuestionsBySearchQuery);
router.get('/:id', authenticate, getQuestion);
router.get('/', authenticate, getQuestions);
router.post('/', authenticate, postQuestion);
router.put('/:id', authenticate, putQuestion);
router.delete('/:id', deleteQuestion);

router.get('/:id/votes', authenticate, getVotesOnQuestion);
router.post('/:id/votes', authenticate, postVoteOnQuestion);

module.exports = router;
