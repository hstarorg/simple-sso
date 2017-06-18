const config = require('./../config');
const db = require('../common/db');
const sqlManager = require('../models/sqlManager');
const codeStore = require('../common/codeStore');
const util = require('../common/util');

const getIndex = (req, res, next) => {
  let appKey = req.query.appKey || '';
  let loginUrl = `/login${appKey ? '?appKey=' + appKey : ''}`;
  if (!req.user) {
    return res.redirect(loginUrl);
  }
  let unionId = req.session.user.UnionId;
  db.queryScalar(sqlManager.QUERY_USER_INFO_BY_ID, [unionId])
    .then(user => {
      req.items = { user };
      console.log(appKey);
      if (appKey) {
        return db.queryScalar(sqlManager.QUERY_APP_BY_KEY, [appKey]);
      } else {
        return Promise.resolve(null);
      }
    })
    .then(app => {
      if (app) {
        let code = util.buildCode();
        codeStore.set(`${app.AppKey}|${code}`, req.items.user);
        return res.redirect(`${app.CallbackUrl}?code=${code}`);
      }
      res.render('index', Object.assign({ UnionId: unionId }, { data: req.items.user }));
    })
    .catch(next);
};

const getLoginSuccess = (req, res, next) => {
  res.render('login_success');
};

const getMyApps = (req, res, next) => {
  let unionId = req.session.user.UnionId;
  db.query(sqlManager.QUERY_MY_APP_LIST, [unionId])
    .then(apps => {
      res.render('apps', Object.assign({}, { UnionId: unionId }, { data: apps }));
    }).catch(next);
};

const getAppDetailPage = (req, res, next) => {
  let appId = req.params.appId;
  res.render('app-detail', { appId });
};

const getLogin = (req, res, next) => {
  res.render('login');
};

const getLogout = (req, res, next) => {
  if (req.session) {
    req.session.ssoUser = null;
  }
  req.logout();
  let redirectUrl = req.query.redirectUrl;
  res.redirect(redirectUrl || '/login');
};

const getSignup = (req, res, next) => {
  res.render('signup');
};


const doLogin = (req, res, next) => {
  res.redirect('/');
};


const doSignup = (req, res, next) => {

};

module.exports = {
  getLogin,
  getLogout,
  getSignup,
  doLogin,
  doSignup,
  getIndex,
  getLoginSuccess,
  getMyApps,
  getAppDetailPage
};
