const express = require('express');

const router = express.Router();
const createUserController = require('../controllers/user.controller');

router.get('/', (req, res) => {
  res.send('I got you covered, hit me any time!! ');
});

router.post('/users', createUserController);

module.exports = router;
