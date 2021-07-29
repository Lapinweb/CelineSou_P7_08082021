const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, postCtrl.createPost);
router.put('/:id', auth, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.get('/:id/comments', auth, postCtrl.getAllComments);
router.post('/:id/comments', auth, postCtrl.createComment);

module.exports = router;