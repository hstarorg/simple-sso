module.exports = {
  port: 7853,
  debug: true,
  useHttp2: false,
  useRedis: false, // 是否使用redis存储session
  sessionSecret: 'testabcde_X!', //Math.random().toString(36), // Session 安全码
  dbConfig: {
    host: '192.168.31.250',
    port: 3306,
    user: 'root',
    password: 'localDev',
    database: 'authdb',
  },
  expires: 60 * 60 * 24 * 2, // 2 days
  redisOptions: {
    host: '192.168.1.200',
    port: 6379,
    prefix: '',
    ttl: 60 * 60 * 24 * 2,
    // disableTTL: true, // If disableTTL is true, ttl would not work.
    db: 0,
    // pass: 'password', // If redis need password
    unref: true
  },
  sites: {
    github: {
      appKey: '5aa6e663602ddb34c6df',
      appSecret: 'a8e9b4d713f7bbf3e331b7116898cfd3deea6fa0',
      callbackUrl: 'https://auth.hstar.vip/auth/github/callback' //'http://sso.hstar.org/auth/github/callback'
    },
    weibo: {
      appKey: '3987010595',
      appSecret: 'f22595e9ab7e3fe070bdda514aef2190',
      callbackUrl: 'https://auth.hstar.vip/auth/weibo/callback'
    },
    qq: {
      appKey: '101395571',
      appSecret: '347ff26df9336db70ce39220867d9ea8',
      callbackUrl: 'https://auth.hstar.vip/auth/qq/callback'
    },
    // google: {
    //   appKey: '380123904563-stm0rgjv88hj8apr5c50vm8i02grmtbg.apps.googleusercontent.com',
    //   appSecret: '',
    //   callbackUrl: 'http://sso.hstar.org/auth/google/callback'
    // }
  }
};
