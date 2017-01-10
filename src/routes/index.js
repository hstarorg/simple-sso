const express = require('express');
const router = express.Router();

const indexBiz = require('./../bizs/indexBiz');

router.get('/', indexBiz.getIndex);

router.get('/login', indexBiz.getLogin);

router.post('/login', indexBiz.doLogin);

router.get('/logout', indexBiz.getLogout);

module.exports = router;
