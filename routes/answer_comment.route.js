const { Router } = require('express');
const {
  getCommentOnAnswer,
  postCommentOnAnswer,
  putCommentOnAnswer,
  deleteCommentOnAnswer,
} = require('../controllers/comment.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router({ mergeParams: true });
router.get('/', authenticate, getCommentOnAnswer);
router.post('/', authenticate, postCommentOnAnswer);
router.put('/:id', authenticate, putCommentOnAnswer);
router.delete('/:id', authenticate, deleteCommentOnAnswer);

module.exports = router;
