const express = require('express');
const router = express.Router();

const indexBiz = require('./../bizs/indexBiz');

router.get('/', indexBiz.getIndex);

router.get('/oauth/:site', indexBiz.redirectToOAuthLogin);

router.get('/oauth/:site/callback', indexBiz.doOAuthLogin);

module.exports = router;
