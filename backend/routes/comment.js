const express = require('express');
const router = express.Router();

const commentCtrl = require('../controllers/comment');

router.put('/:id', commentCtrl.modifyComment);
router.delete('/:id', commentCtrl.deleteComment);

module.exports = router;