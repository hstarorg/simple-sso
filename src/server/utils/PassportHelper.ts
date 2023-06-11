import { Strategy as GitHubStrategy } from 'passport-github';
// const WeiboStrategy = require('passport-weibo').Strategy;
// const QQStrategy = require('passport-qq').Strategy;
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
import { config } from '../config';

const strategyMap: any = {
  github: GitHubStrategy,
  // weibo: WeiboStrategy,
  // qq: QQStrategy,
  // google: GoogleStrategy,
};

export const PassportHelper = {
  init(passport: any) {
    passport.serializeUser(function (user: any, done: any) {
      done(null, user);
    });

    passport.deserializeUser(function (obj: any, done: any) {
      done(null, obj);
    });

    Object.keys(config.sites).forEach(siteKey => {
      let site = (config.sites as any)[siteKey];
      if (strategyMap[siteKey]) {
        this._initStrategy(passport, site, siteKey);
      }
    });
  },

  _initStrategy(passport: any, site: any, siteKey: any) {
    let Strategy = strategyMap[siteKey];
    passport.use(
      new Strategy(
        {
          clientID: site.appKey,
          clientSecret: site.appSecret,
          callbackURL: site.callbackUrl,
        },
        (
          accessToken: string,
          refreshToken: string,
          profile: any,
          done: any,
        ) => {
          return done(null, profile);
        },
      ),
    );
  },
};
