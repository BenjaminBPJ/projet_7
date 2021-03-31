const express = require('express');
const router = express.Router();
//const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);
router.put('/:id', userCtrl.updateDescription);
router.post('/:id', userCtrl.updatePhoto);
router.get('/:id', userCtrl.getUser);

module.exports = router;
