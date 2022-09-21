const express = require('express');

const router = express.Router();
const userRoute = require('./user.route');
const questionRoute = require('./question.route');

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, _next) => {
  res.status(500).json({
    message: 'An error occurred while processing your request',
  });
});

router.use('/auth', userRoute);
router.use('/questions', questionRoute);

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

module.exports = router;
