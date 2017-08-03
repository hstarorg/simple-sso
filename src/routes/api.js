const express = require('express');
const router = express.Router();

const authBiz = require('./../bizs/authBiz');
const apiBiz = require('./../bizs/apiBiz');

router.post('/login', apiBiz.doLogin);

router.post('/register', apiBiz.doRegister);

router.get('/app', authBiz.mustLogin, apiBiz.getApps);

router.get('/app/:appId', authBiz.mustLogin, apiBiz.getAppById);

router.post('/app', authBiz.mustLogin, apiBiz.createApp);

router.post('/app/:appId/refresh_secret', authBiz.mustLogin, apiBiz.refreshSecret);

router.put('/app/:appId', authBiz.mustLogin, apiBiz.updateApp);

router.delete('/app/:appId', authBiz.mustLogin, apiBiz.deleteApp);

router.post('/get_user_info', apiBiz.getUserInfo);

module.exports = router;
