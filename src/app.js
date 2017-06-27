const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const artTemplate = require('art-template');
const expressArtTemplate = require('express-art-template');
const passport = require('passport');
const cors = require('cors');

const config = require('./config');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const apiRouter = require('./routes/api');
const passportHelper = require('./common/passportHelper');

const app = express();

if (!config.debug) {
  app.set('env', 'production');
}

// art-template options
artTemplate.defaults.rules.shift();
let rule = artTemplate.defaults.rules[0];
rule.test = new RegExp(rule.test.source.replace('{{', '\\[\\[').replace('}}', '\\]\\]'));

// define view engine and engine options
app.engine('html', expressArtTemplate);
app.set('view options', {
  debug: app.get('env') !== 'production'
});
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use('/static', express.static(path.join(__dirname, '../static')));
// Load session config
let sessionOpt = {
  secret: config.sessionSecret,
  resave: false,
  cookie: { maxAge: config.expires * 1000 },
  saveUninitialized: false
};
if (config.useRedis) {
  sessionOpt.store = new RedisStore(config.redisOptions);
}
app.use(session(sessionOpt));

// passport授权
// 授权
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

passportHelper.init(passport);

// Load routers
app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/api/v1', apiRouter);

app.use((req, res, next) => {
  next({
    status: 404,
    code: '404',
    message: '404 Not Found.'
  });
});
app.use((err, req, res, next) => {
  let status = 500;
  let message = '';
  let code = '500';
  let stack = null;
  // 简单业务错误
  if (typeof err === 'string') {
    status = 400;
    code = '400';
    message = err;
  } else if (err.isJoi) {// 请求验证错误
    status = 400;
    code = '400';
    message = err.details.map(x => x.message).join('\n');
  } else if (err instanceof Error) { // 标准错误处理
    if (err.code) {
      code = err.code;
    }
    message = err.message;
    stack = err.stack;
  } else { // Next({status: 400, code: 'xxx'}) 自定义错误
    status = err.status || 400;
    code = err.code || '400';
    message = err.message;
  }
  res.status(status).json({
    status,
    code,
    message,
    stack: req.app.get('env') === 'development' ? stack : {}
  });
});

module.exports = app;
