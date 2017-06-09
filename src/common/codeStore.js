const LRU = require('lru-cache');
const options = {
  max: 5000,
  length: function (n, key) { return n * 2 + key.length },
  maxAge: 1000 * 60 // 1分钟
};

const cache = LRU(options);

module.exports = {
  set(key, value) {
    cache.set(key, value);
  },
  get(key) {
    return cache.get(key);
  },
  delete(key) {
    return cache.del(key);
  }
};
