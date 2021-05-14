const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const limiter = require('../middleware/limiter');
const userCtrl = require('../controllers/user');
const multer = require('../middleware/multer-config');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.modifyUser);
router.get('/:id', auth, userCtrl.getUser);

module.exports = router;
