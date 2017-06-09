const express = require('express');
const router = express.Router();
const passport = require('passport');

const authBiz = require('./../bizs/authBiz');

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));
router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/login' }), authBiz.doLogin, (req, res, next) => {
  res.redirect('/login_success');
});

router.get('/weibo', passport.authenticate('weibo', { scope: ['user:email'] }));
router.get('/weibo/callback', passport.authenticate('weibo', { failureRedirect: '/login' }), authBiz.doLogin, (req, res, next) => {
  res.redirect('/login_success');
});

router.get('/qq', passport.authenticate('qq'));
router.get('/qq/callback', passport.authenticate('qq', { failureRedirect: '/login' }), authBiz.doLogin, (req, res, next) => {
  res.redirect('/login_success');
});

router.get('/google', passport.authenticate('google'));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }), authBiz.doLogin, (req, res, next) => {
  res.redirect('/login_success');
});

module.exports = router;
