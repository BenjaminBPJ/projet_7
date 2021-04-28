const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');

router.post('/', auth, postCtrl.createPost);
router.delete('/:id', auth, postCtrl.deletePost); // id du post
router.get('/', auth, postCtrl.getAllPosts);
router.get('/:id', auth, postCtrl.getPost);
router.put('/:id', auth, postCtrl.modifyPost);

module.exports = router;