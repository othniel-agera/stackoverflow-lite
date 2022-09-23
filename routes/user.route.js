const { Router } = require('express');
// import { validateAuth } from '../middleware/validation';
const { signup, login } = require('../controllers/user.controller');

const router = Router();

router.post('/signup', signup);
router.post('/login', login);
// router.post('/auth/signin', validateAuth('signin'), signin);

module.exports = router;
