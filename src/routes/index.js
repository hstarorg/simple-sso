const express = require('express');
const router = express.Router();

const indexBiz = require('./../bizs/indexBiz');
const authBiz = require('./../bizs/authBiz');

router.get('/', indexBiz.getIndex);
router.get('/login_success', indexBiz.getLoginSuccess);

router.get('/login', indexBiz.getLogin);

router.get('/signup', indexBiz.getSignup);

router.get('/logout', indexBiz.getLogout);

router.get('/apps', authBiz.mustLogin, indexBiz.getMyApps);

router.get('/app/:appId', authBiz.mustLogin, indexBiz.getAppDetailPage);

module.exports = router;
