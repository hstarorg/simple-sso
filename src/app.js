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
if (config.useRedis) {
  app.use(session({
    store: new RedisStore(config.redisOptions),
    resave: false,
    secret: config.sessionSecret,
    saveUninitialized: false
  }));
} else {
  app.use(session({
    secret: config.sessionSecret,
    resave: false,
    cookie: { maxAge: config.expires * 1000 },
    saveUninitialized: false
  }));
}

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

// catch 404 and forward to error handler
app.use((req, res, next) => {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
