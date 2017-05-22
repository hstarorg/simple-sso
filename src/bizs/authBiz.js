const config = require('../config');
const db = require('../common/db');
const sqlManager = require('../models/sqlManager');
const providerType = require('../models/providerType');

const getExternalUser = (req) => {
  let user = req.user;
  let result;
  switch (req.user.provider) {
    case providerType.github:
      result = {
        id: user.id,
        displayName: user.displayName,
        username: user.username,
        avatarUrl: user._json.avatar_url,
        emailAddress: user._json.email,
        gender: '',
        location: user._json.location
      };
      break;
    case providerType.weibo:
      let gender = user._json.gender;
      result = {
        id: user.id,
        displayName: user.displayName,
        username: '',
        avatarUrl: user._json.profile_image_url,
        emailAddress: '',
        gender: gender === 'm' ? '男' : (gender === 'w' ? '女' : '保密'),
        location: user._json.location
      };
      break;
    case providerType.qq:
      result = {
        id: user.id,
        displayName: user.nickname,
        username: '',
        avatarUrl: user._json.figureurl_qq_2,
        emailAddress: '',
        gender: user._json.gender,
        location: `${user._json.province} ${user._json.city}`
      };
      break;
  }
  return result;
};

const createUnionUser = (user, provider) => {
  let connection;
  let unionId;
  return db.beginTransaction()
    .then(conn => {
      connection = conn;
      //写入UnionUser
      return db.promiseQuery(connection, sqlManager.INSERT_UNION_USER, [user.username, user.displayName, user.avatarUrl, user.emailAddress, ''])
    })
    .then(results => {
      unionId = results.insertId;
      return Promise.all([
        db.promiseQuery(connection, sqlManager.INSERT_UNION_USER_EXT, [unionId, user.gender, user.location]),
        db.promiseQuery(connection, sqlManager.INSERT_EXTERNAL_USER_EXT, [provider, unionId, user.id])
      ]);
    })
    .then(() => {
      return new Promise((resolve, reject) => {
        connection.commit(err => {
          if (err) {
            return reject(err);
          }
          resolve();
        });
      });
    })
    .then(() => {
      return db.queryScalar(sqlManager.QUERY_UNION_USER_INFO, [provider, unionId]);
    })
    .catch(reason => {
      console.log(reason);
      return new Promise((resolve, reject) => {
        connection.rollback(err => {
          if (err) {
            return reject(err);
          }
          resolve({ hasError: true, error: '关联失败，请重试。' });
        })
      })
    });
};

const doLogin = (req, res, next) => {
  let provider = req.user.provider;
  let externalUser = getExternalUser(req);
  db.queryScalar(sqlManager.QUERY_UNION_USER_INFO, [provider, externalUser.id])
    .then(user => {
      if (user) {
        return Promise.resolve(user);
      }
      return createUnionUser(externalUser, provider);
    })
    .then(result => {
      if (result && result.hasError) {
        return next(result.error);
      }
      req.session.user = result;
      next();
    })
    .catch(next);
};

module.exports = {
  doLogin
};
