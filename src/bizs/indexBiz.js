module.exports = {
  getIndex(req, res, next) {
    res.render('index', { title: 'Simple SSO - Index' });
  }
};
