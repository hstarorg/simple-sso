const request = require('request');

const _request = options => {
  options.headers = options.headers || {};
  if (!options.headers['Content-Type']) {
    options.headers['Content-Type'] = 'application/json';
  }
  return new Promise((resolve, reject) => {
    request(options, (err, res, body) => {
      if (err) {
        return reject(err);
      }
      let data;
      try {
        data = JSON.parse(body);
      } catch (ex) {
        return reject(ex);
      }
      resolve({ res, data });
    });
  });
};

module.exports = {
  get(url, options = {}) {
    let opt = Object.assign({}, options, { url })
    return _request(opt);
  },

  post(url, data, options = {}) {
    let opt = Object.assign({}, options, { method: 'POST', url });
    if (data) {
      opt.body = typeof data === 'string' ? data : JSON.parse(data);
    }
    return _request(opt);
  }
};
