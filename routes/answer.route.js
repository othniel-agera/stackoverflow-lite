const { Router } = require('express');
const { postAnswer, deleteAnswer } = require('../controllers/answer.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router();

router.post('/', authenticate, postAnswer);
router.delete('/:id', deleteAnswer);

module.exports = router;
