const config = require('./../config');

const getLoginSuccess = (req, res, next) => {
  res.render('login_success');
};

module.exports = {
  getIndex(req, res, next) {
    if (!req.user) {
      return res.redirect('/login');
    }
    console.log(req.session.user);
    res.render('index', req.session.user);
  },

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
  getLoginSuccess
};
