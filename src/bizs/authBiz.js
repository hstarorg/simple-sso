const config = require('./../config');

const getOAuthLoginUrl = site => {
  let loginUrl;
  switch (site) {
    case 'github':
      loginUrl = `https://github.com/login/oauth/authorize?client_id=${config.githubOAuth.appKey}&redirect_uri=${encodeURI('http://localhost:7853/oauth/github/callback')}&state=5423542s&scope=user`
      break;
  }
  return loginUrl;
};

module.exports = {
  redirectToOAuthLogin(req, res, next) {
    let site = req.params.site;
    res.redirect(getOAuthLoginUrl(site));
  },

  doOAuthLoginCallback(req, res, next) {
    let site = req.params.site;
    let code = req.query.code;
    res.send(code + site);
  }
};
