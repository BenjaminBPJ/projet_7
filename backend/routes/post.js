const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
const multer = require('../middleware/multer-config');

router.post('/', auth, multer, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost); // id du post
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getPost);
router.put('/:id', auth, multer, postCtrl.modifyPost);

module.exports = router;