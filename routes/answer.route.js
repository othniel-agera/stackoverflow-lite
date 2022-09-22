const { Router } = require('express');
const {
  postAnswer,
  deleteAnswer,
  getAnswer,
  getAnswers,
  getAllAnswers,
  putAnswer,
  getVotesOnAnswer,
  postVoteOnAnswer,
  selectPreferedAnswer,
} = require('../controllers/answer.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router({ mergeParams: true });

router.get('/all', authenticate, getAllAnswers);
router.get('/:id', authenticate, getAnswer);
router.get('/', authenticate, getAnswers);
router.post('/', authenticate, postAnswer);
router.put('/:id', authenticate, putAnswer);
router.put('/', authenticate, selectPreferedAnswer);
router.delete('/:id', authenticate, deleteAnswer);

router.get('/:id/votes', authenticate, getVotesOnAnswer);
router.post('/:id/votes', authenticate, postVoteOnAnswer);

module.exports = router;
