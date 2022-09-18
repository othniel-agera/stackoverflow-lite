const { Router } = require('express');
const { postQuestion } = require('../controllers/question.controller');
const authenticate = require('../middlewares/authentication.middleware');

const router = Router();

router.post('/', authenticate, postQuestion);
router.get('/', postQuestion);
router.get('/id', postQuestion);
router.put('/id', postQuestion);

module.exports = router;
