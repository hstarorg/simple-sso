const config = require('./../config');

module.exports = {
  getIndex(req, res, next) {
    if (!req.user) {
      return res.redirect('/login');
    }
    res.render('index', { abc: 111 });
  },

  getLogin(req, res, next) {
    res.render('login', { abc: 'Simple SSO - Login' });
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
