const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');

router.post('/:idPost', auth, commentCtrl.createComment); 
router.delete('/:id', auth, commentCtrl.deleteComment); // du com
router.get('/:idPost', auth, commentCtrl.getAllCommentsFromOnePubli);
router.put('/:id', auth, commentCtrl.modifyComment) // a créer

module.exports = router;