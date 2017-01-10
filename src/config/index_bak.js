module.exports = {
  port: 7853,
  debug: true,
  useRedis: false, // 是否使用redis存储session
  sessionSecret: '', // Session 安全码
  redisOptions: {
    host: 'xxx',
    port: 12345,
    prefix: '',
    ttl: 1800,
    // disableTTL: true, // If disableTTL is true, ttl would not work.
    db: 10,
    // pass: 'password', // If redis need password
    unref: true
  },
  authCallbackHost: 'xxx', // oauth回调地址
  githubOAuth: {
    appKey: 'xxx',
    appSecret: 'xxx'
  }
};
