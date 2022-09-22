const { Router } = require('express');
const {
  postAnswer, deleteAnswer, getAnswer, getAnswers, getAllAnswers,
} = require('../controllers/answer.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router({ mergeParams: true });

router.get('/all', authenticate, getAllAnswers);
router.get('/:id', authenticate, getAnswer);
router.get('/', authenticate, getAnswers);
router.post('/', authenticate, postAnswer);
router.delete('/:id', authenticate, deleteAnswer);

module.exports = router;
