const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const limiter = require('../middleware/limiter');
//const deleteImage = require('../middleware/findImageUser');
//const userUserId = require('../middleware/verifyUseridUser');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', limiter, userCtrl.login);
router.delete('/:id', auth, /*userUserId,*/ userCtrl.deleteUser);
router.put('/:id', auth, /*userUserId,*/ userCtrl.updateDescription);
router.post('/:id', auth, userCtrl.updatePhoto);
router.get('/:id', auth, userCtrl.getUser);

module.exports = router;
