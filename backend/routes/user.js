const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id', userCtrl.deleteUser);
router.post('/updateUser', userCtrl.updateUser);

module.exports = router;