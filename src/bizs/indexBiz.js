const config = require('./../config');

module.exports = {
  getIndex(req, res, next) {
    res.render('index', { title: 'Simple SSO - Index' });
  },

  getLogin(req, res, next) {
    res.render('login', { title: 'Simple SSO - Login' });
  },

  doLogin(req, res, next) {

  },

  getRegister(req, res, next) {

  },

  doRegister(req, res, next) {

  },

  getLogout(req, res, next) {

  }
};
