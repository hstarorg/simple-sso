const config = require('./../config');

module.exports = {
  getIndex(req, res, next) {
    res.render('index', { title: 'Simple SSO - Index' });
  },

  redirectToOAuthLogin(req, res, next) {
    let site = req.params.site;
    res.redirect(`https://github.com/login/oauth/authorize?client_id=${config.githubOAuth.appKey}&redirect_uri=${encodeURI('http://localhost:7853/oauth/github/callback')}&state=5423542s&scope=user`);
  },

  doOAuthLogin(req, res, next) {
    let site = req.params.site;
    let code = req.query.code;
    res.send(code + site);
  }
};
