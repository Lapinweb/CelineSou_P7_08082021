const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const rateLimiter = require('../middlewares/rate-limiter');
const multer = require('../middlewares/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', rateLimiter, userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteAccount);
router.get('/:id', auth, userCtrl.getUser);

module.exports = router;