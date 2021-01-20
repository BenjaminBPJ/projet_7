const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:pseudo', userCtrl.deleteUser);
router.put('/:pseudo/profil', multer, userCtrl.updateUser);
router.get('/:pseudo', userCtrl.getUser);

module.exports = router;
