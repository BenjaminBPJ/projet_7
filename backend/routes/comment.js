const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.post('/:id', auth, commentCtrl.createComment); // Id du post
//router.delete('/:id', auth, commentCtrl.deleteComment); 
router.get('/:userId', auth, commentCtrl.getAllCommentsFromOnePubli);

module.exports = router;