const { Router } = require('express');
const {
  getCommentOnQuestion,
  postCommentOnQuestion,
  putCommentOnQuestion,
  deleteCommentOnQuestion,
} = require('../controllers/comment.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router({ mergeParams: true });
router.get('/', authenticate, getCommentOnQuestion);
router.post('/', authenticate, postCommentOnQuestion);
router.put('/:id', authenticate, putCommentOnQuestion);
router.delete('/:id', authenticate, deleteCommentOnQuestion);

module.exports = router;
