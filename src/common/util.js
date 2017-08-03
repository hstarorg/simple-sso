const crypto = require('crypto');
const uuid = require('uuid');

module.exports = {
  buildAppKey() {
    return uuid.v4();
  },
  buildAppSecret() {
    return (uuid.v4() + uuid.v4()).replace(/-/g, '');
  },
  buildCode() {
    return uuid.v4().replace(/-/g, '');
  },
  hashPassword(str) {
    const sha1 = crypto.createHash('sha1');
    const md5 = crypto.createHash('md5');
    sha1.update(str);
    let str2 = sha1.digest('hex');
    md5.update(str2);
    return md5.digest('hex');
  }
};
