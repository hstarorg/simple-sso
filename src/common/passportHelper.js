const GitHubStrategy = require('passport-github').Strategy;
const WeiboStrategy = require('passport-weibo').Strategy;

const config = require('./../config');

module.exports = {
  init(passport) {
    this._initGithub(passport);
    this._initWeibo(passport);
  },

  _initGithub(passport) {
    passport.use(new GitHubStrategy({
      clientID: config.githubOAuth.appKey,
      clientSecret: config.githubOAuth.appSecret,
      callbackURL: `${config.authCallbackHost}/github/callback`
    }, (accessToken, refreshToken, profile, done) => {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log(profile);
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }));
  },

  _initWeibo(passport) {
    passport.use(new WeiboStrategy({
      clientID: config.weiboOAuth.appKey,
      clientSecret: config.weiboOAuth.appSecret,
      callbackURL: `http://sso.hstar.org/weibo/callback`
    }, (accessToken, refreshToken, profile, done) => {
      // asynchronous verification, for effect...
      process.nextTick(function () {
        console.log(profile);
        // To keep the example simple, the user's GitHub profile is returned to
        // represent the logged-in user.  In a typical application, you would want
        // to associate the GitHub account with a user record in your database,
        // and return that user instead.
        return done(null, profile);
      });
    }));
  }
};
