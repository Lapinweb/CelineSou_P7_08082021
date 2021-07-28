const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const postCtrl = require('../controllers/post');

router.get('/', postCtrl.getAllPosts);
router.get('/:id', postCtrl.getOnePost);
router.post('/', postCtrl.createPost);
router.put('/:id', postCtrl.modifyPost);
router.delete('/:id', postCtrl.deletepost);

router.get('/:id/comments', postCtrl.getAllComments);
router.post('/:id/comments', postCtrl.createComment);

module.exports = router;