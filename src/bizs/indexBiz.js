const config = require('./../config');
const db = require('../common/db');
const sqlManager = require('../models/sqlManager');

const getIndex = (req, res, next) => {
  if (!req.user) {
    return res.redirect('/login');
  }
  let unionId = req.session.user.UnionId;
  db.queryScalar(sqlManager.QUERY_USER_INFO_BY_ID, [unionId])
    .then(user => {
      res.render('index', Object.assign({ UnionId: unionId }, { data: user }));
    }).catch(next);
};

const getLoginSuccess = (req, res, next) => {
  res.render('login_success');
};

const getMyApps = (req, res, next) => {
  let unionId = req.session.user.UnionId;
  db.query(sqlManager.QUERY_MY_APP_LIST, [unionId])
    .then(apps => {
      console.log(apps);
      res.render('apps', Object.assign({}, { UnionId: unionId }, { data: apps }));
    }).catch(next);
};

module.exports = {
  getLogin(req, res, next) {
    res.render('login');
  },

  doLogin(req, res, next) {
    res.redirect('/');
  },

  getSignup(req, res, next) {
    res.render('signup');
  },

  doSignup(req, res, next) {

  },

  getLogout(req, res, next) {

  },
  getIndex,
  getLoginSuccess,
  getMyApps
};
