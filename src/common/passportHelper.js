const GitHubStrategy = require('passport-github').Strategy;
const WeiboStrategy = require('passport-weibo').Strategy;
const QQStrategy = require('passport-qq').Strategy;
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const WindowsLiveStrategy = require('passport-windowslive').Strategy;
const config = require('./../config');

const strategyMap = {
  github: GitHubStrategy,
  weibo: WeiboStrategy,
  qq: QQStrategy,
  google: GoogleStrategy,
  windowslive: WindowsLiveStrategy
};

module.exports = {
  init(passport) {
    Object.keys(config.sites)
      .forEach(siteKey => {
        let site = config.sites[siteKey];
        this._initStrategy(passport, site, siteKey);
      });
  },

  _initStrategy(passport, site, siteKey) {
    let Strategy = strategyMap[siteKey];
    passport.use(new Strategy({
      clientID: site.appKey,
      clientSecret: site.appSecret,
      callbackURL: site.callbackUrl
    }, (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }));
  }
};
