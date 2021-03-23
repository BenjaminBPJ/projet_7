const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', auth, userCtrl.login);
router.delete('/:pseudo', userCtrl.deleteUser);
router.put('/:pseudo', userCtrl.updateDescription);
//router.post('/:pseudo', multer, userCtrl.updatePhoto);
router.get('/:pseudo', userCtrl.getUser);

module.exports = router;
