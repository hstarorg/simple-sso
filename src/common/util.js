const uuid = require('uuid');

module.exports = {
  buildAppKey() {
    return uuid.v4();
  },
  buildAppSecret() {
    return (uuid.v4() + uuid.v4()).replace(/-/g, '');
  }
};
