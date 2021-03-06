const config = require('../config');
const db = require('../common/db');
const sqlManager = require('../models/sqlManager');
const codeStore = require('../common/codeStore');
const util = require('../common/util');

const getApps = (req, res, next) => {
  let unionId = req.session.ssoUser.UnionId;
  db.query(sqlManager.QUERY_MY_APP_LIST, [unionId])
    .then(apps => {
      res.send(apps);
    })
    .catch(next);
};

const getAppById = (req, res, next) => {
  let appId = req.params.appId;
  db.query(sqlManager.GET_SSO_APPLICATIO_BY_ID, [appId])
    .then(apps => {
      if (apps.length === 0) {
        return res.send(null);
      }
      res.send(apps[0]);
    })
    .catch(next);
};

const createApp = (req, res, next) => {
  let unionId = req.session.ssoUser.UnionId;
  let data = req.body;
  db.query(sqlManager.CREATE_SSO_APPLICATION, [
    data.AppName, data.AppDescription,
    util.buildAppKey(), util.buildAppSecret(),
    data.CallbackUrl, data.IsActive ? 'Active' : 'InActive', unionId
  ])
    .then(data => {
      res.status(201).send(data);
    })
    .catch(next);
};

const updateApp = (req, res, next) => {
  let unionId = req.session.ssoUser.UnionId;
  let data = req.body;
  let appId = req.params.appId;
  db.query(sqlManager.UPDATE_SSO_APPLICATION, [
    data.AppName, data.AppDescription,
    data.CallbackUrl, data.IsActive ? 'Active' : 'InActive',
    appId
  ])
    .then(data => {
      res.status(202).send(data);
    })
    .catch(next);
};

const deleteApp = (req, res, next) => {
  let unionId = req.session.ssoUser.UnionId;
  let appId = req.params.appId;
  db.query(sqlManager.DELETE_SSO_APPLICATION, [appId])
    .then(data => {
      res.status(202).send(data);
    })
    .catch(next);
};

const refreshSecret = (req, res, next) => {
  let appId = req.params.appId;
  let newSecret = util.buildAppSecret();
  db.query(sqlManager.REFRESH_SSO_APPLICATION_SECRET, [newSecret, appId])
    .then(data => {
      res.status(202).send(newSecret);
    })
    .catch(next);
};

const getUserInfo = (req, res, next) => {
  let data = req.body;
  db.queryScalar(sqlManager.QUERY_APP_BY_KEY, [data.appKey])
    .then(app => {
      if (!app) {
        return next(new Error('App key invalid, please check.'));
      }
      if (app.AppSecret !== data.appSecret) {
        return next(new Error('App secret invalid, please check.'));
      }
      let key = `${app.AppKey}|${data.code}`;
      let user = codeStore.get(key);
      codeStore.delete(key);
      if (!user) {
        return next(new Error('Invalid code.'));
      }
      res.send(user);
    })
    .catch(next);
};

const doLogin = (req, res, next) => {
  let data = req.body;
  db.queryScalar(sqlManager.QUERY_USER_BY_NAME_PWD, [data.UserName, util.hashPassword(data.Password)])
    .then(user => {
      if (!user) {
        return Promise.reject('登录失败，请检查您的账户/密码');
      }
      req.session.ssoUser = user;
      res.sendStatus(200);
    })
    .catch(next);
};

const _usenameExists = username => {
  return db.queryScalar(sqlManager.USER_NAME_EXISTS, [username])
    .then(result => {
      return result.TotalCount > 0;
    });
};

const doRegister = (req, res, next) => {
  let data = req.body;
  if (!data.UserName || !data.Password2) {
    return next('必须提供账户/密码');
  }
  if (data.UserName.length < 3) {
    return next('账户名至少3位');
  }
  _usenameExists(data.UserName)
    .then(exists => {
      if (exists) {
        return Promise.reject('用户名已存在，请更改后再试');
      }
      return db.queryScalar(sqlManager.CREATE_CUSTOM_USER, [data.UserName, data.UserName, util.hashPassword(data.Password2)]);
    })
    .then(() => {
      res.sendStatus(201);
    })
    .catch(next);
};

module.exports = {
  getApps,
  createApp,
  updateApp,
  deleteApp,
  getAppById,
  refreshSecret,
  getUserInfo,
  doLogin,
  doRegister
};
