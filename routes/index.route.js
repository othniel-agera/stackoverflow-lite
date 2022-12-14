const express = require('express');

const router = express.Router();
const userRoute = require('./user.route');
const questionRoute = require('./question.route');
const answerRoute = require('./answer.route');
const questionCommentRoute = require('./question_comment.route');
const answerCommentRoute = require('./answer_comment.route');

router.use('/auth', userRoute);
router.use('/questions', questionRoute);
router.use('/questions/:question_id/answers', answerRoute);
router.use('/questions/:question_id/comments', questionCommentRoute);
router.use('/questions/:question_id/answers/:answer_id/comments', answerCommentRoute);

router.get('/', (req, res) => {
  res.status(200).send({
    message: 'Welcome to the Stackoverflow-lite API',
  });
});

router.all('*', (req, res) => {
  res.status(404).json({
    message: 'Invalid request, Route does not exist',
  });
});

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, _next) => {
  res.status(500).json({
    message: 'An error occurred while processing your request',
  });
});

module.exports = router;
