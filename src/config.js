const path = require('path');

module.exports = {
  port: 7853,
  debug: true,
  useRedis: false, // 是否使用redis存储session
  sessionSecret: Math.random().toString(36), // Session 安全码
  dbFolder: path.join(__dirname, '../database'),
  expires: 60 * 60 * 24 * 2, // 2 days
  redisOptions: {
    host: '10.16.75.12',
    port: 12345,
    prefix: '',
    ttl: 60 * 60 * 24 * 2,
    // disableTTL: true, // If disableTTL is true, ttl would not work.
    db: 10,
    // pass: 'password', // If redis need password
    unref: true
  },
  sites: {
    github: {
      appKey: '5aa6e663602ddb34c6df',
      appSecret: 'xxx',
      callbackUrl: 'http://10.16.85.170:7853/auth/github/callback'
    },
    weibo: {
      appKey: '3987010595',
      appSecret: 'xxx',
      callbackUrl: 'http://10.16.85.170:7853/auth/weibo/callback'
    },
    qq: {
      appKey: '1105871515',
      appSecret: 'xxx',
      callbackUrl: 'http://10.16.85.170:7853/auth/qq/callback'
    }
  }
};
