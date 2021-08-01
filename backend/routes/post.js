const express = require('express');
const router = express.Router();

const auth = require('../middlewares/auth');
const multer = require('../middlewares/multer-config');

const postCtrl = require('../controllers/post');

router.get('/', auth, postCtrl.getAllPosts);
router.get('/page/:page', auth, postCtrl.getPagePosts);
router.get('/:id', auth, postCtrl.getOnePost);
router.post('/', auth, multer, postCtrl.createPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);
router.delete('/:id', auth, postCtrl.deletePost);

router.get('/:id/comments', auth, postCtrl.getAllComments);
router.post('/:id/comments', auth, postCtrl.createComment);

module.exports = router;