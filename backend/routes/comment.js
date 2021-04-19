const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.post('/publi/:id', auth, commentCtrl.createComment); // Id du post
//router.delete('/publi/:id', auth, commentCtrl.deleteComment); 
router.get('/publi/:id', auth, commentCtrl.getAllCommentsFromOnePubli);

module.exports = router;