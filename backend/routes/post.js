const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/post');

router.post('/:id', userCtrl.createPost);
router.delete('/:id', userCtrl.deletePost);
router.get('/', userCtrl.getAllPosts);

module.exports = router;