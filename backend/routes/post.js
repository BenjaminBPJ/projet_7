const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const userCtrl = require('../controllers/post');

router.post('/:userId', /*auth,*/ userCtrl.createPost);
router.delete('/publi/:id', /*auth,*/ userCtrl.deletePost); // id du post
router.get('/:userId', /*auth,*/ userCtrl.getAllPosts);
router.get('/publi/:id', /*auth,*/ userCtrl.getPost);

module.exports = router;