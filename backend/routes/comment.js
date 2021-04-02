const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.post('/:userId', auth, commentCtrl.createComment);
//router.delete('/:userId', auth, commentCtrl.deleteComment); 
//router.get('/:userId', auth, commentCtrl.getAllCommentsFromOnePubli);

module.exports = router;