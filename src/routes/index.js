const express = require('express');
const router = express.Router();

const indexBiz = require('./../bizs/indexBiz');

router.get('/', indexBiz.getIndex);
router.get('/login_success', indexBiz.getLoginSuccess);

router.get('/login', indexBiz.getLogin);
router.post('/login', indexBiz.doLogin);

router.get('/signup', indexBiz.getSignup);
router.post('/signup', indexBiz.doSignup);

router.get('/logout', indexBiz.getLogout);

module.exports = router;
