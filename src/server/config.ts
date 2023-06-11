function getEnv(name: string) {
  return process.env[name];
}

export const config = {
  port: 7853,
  debug: true,
  useHttp2: false,
  useRedis: false, // 是否使用redis存储session
  sessionSecret: 'testabcde_X!', //Math.random().toString(36), // Session 安全码
  dbConfig: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
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
    unref: true,
  },
  sites: {
    github: {
      appKey: getEnv('OAUTH_GITHUB_APPKEY'),
      appSecret: getEnv('OAUTH_GITHUB_APPSECRET'),
      callbackUrl: 'https://auth.hstar.vip/auth/github/callback', //'http://sso.hstar.org/auth/github/callback'
    },
    weibo: {
      appKey: getEnv('OAUTH_WEIBO_APPKEY'),
      appSecret: getEnv('OAUTH_WEIBO_APPSECRET'),
      callbackUrl: 'https://auth.hstar.vip/auth/weibo/callback',
    },
    qq: {
      appKey: getEnv('OAUTH_QQ_APPKEY'),
      appSecret: getEnv('OAUTH_QQ_APPSECRET'),
      callbackUrl: 'https://auth.hstar.vip/auth/qq/callback',
    },
    // google: {
    //   appKey: '380123904563-stm0rgjv88hj8apr5c50vm8i02grmtbg.apps.googleusercontent.com',
    //   appSecret: '',
    //   callbackUrl: 'http://sso.hstar.org/auth/google/callback'
    // }
  },
};
