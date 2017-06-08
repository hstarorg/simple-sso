module.exports = {
  port: 7853,
  debug: true,
  useRedis: true, // 是否使用redis存储session
  sessionSecret: 'testabcde_X!', //Math.random().toString(36), // Session 安全码
  dbConfig: {
    host: '192.168.1.200',
    port: 3308,
    user: 'root',
    password: 'humin',
    database: 'SSO'
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
      appSecret: 'xxx',
      callbackUrl: 'http://sso.hstar.org/auth/github/callback' //'http://sso.hstar.org/auth/github/callback'
    },
    weibo: {
      appKey: '3987010595',
      appSecret: 'xxx',
      callbackUrl: 'http://sso.hstar.org/auth/weibo/callback'
    },
    qq: {
      appKey: '101395571',
      appSecret: 'xxx',
      callbackUrl: 'http://sso.hstar.org/auth/qq/callback'
    }
  }
};
