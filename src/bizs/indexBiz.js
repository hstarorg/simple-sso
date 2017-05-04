const config = require('./../config');

module.exports = {
  getIndex(req, res, next) {
    if (!req.user) {
      return res.redirect('/login');
    }
    console.log(req.user);
    res.render('index', req.user);
  },

  getLogin(req, res, next) {
    res.render('login', { abc: 'Simple SSO - Login' });
  },

  doLogin(req, res, next) {
    res.redirect('/');
  },

  getRegister(req, res, next) {

  },

  doRegister(req, res, next) {

  },

  getLogout(req, res, next) {

  }
};
