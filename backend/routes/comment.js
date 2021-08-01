const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const commentCtrl = require('../controllers/comment');

router.put('/:id', auth, commentCtrl.modifyComment);
router.delete('/:id', auth, commentCtrl.deleteComment);

module.exports = router;