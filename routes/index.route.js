const express = require('express');

const router = express.Router();
const userRoute = require('./user.route');
const questionRoute = require('./question.route');

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
