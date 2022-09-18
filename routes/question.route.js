const { Router } = require('express');
const { postQuestion, deleteQuestion } = require('../controllers/question.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router();

router.post('/', authenticate, postQuestion);
router.delete('/:id', deleteQuestion);

module.exports = router;
