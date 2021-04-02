const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const userCtrl = require('../controllers/post');

router.post('/:userId', auth, userCtrl.createPost);
router.delete('/:id', auth, userCtrl.deletePost); // id du post
router.get('/:userId', auth, userCtrl.getAllPosts);
router.get('/:id', auth, userCtrl.getPost);

module.exports = router;