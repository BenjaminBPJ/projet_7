const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/post');

router.post('/home/:pseudo', userCtrl.createPost);
router.delete('/home/:pseudo', userCtrl.deletePost);
router.get('/home/:pseudo', userCtrl.getAllPosts);

module.exports = router;