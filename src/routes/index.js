const express = require('express');
const router = express.Router();

const indexBiz = require('./../bizs/indexBiz');

/* GET home page. */
router.get('/', indexBiz.getIndex);

module.exports = router;
