const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);
const template = require('art-template-plus');
const passport = require('passport');
const cors = require('cors');

const config = require('./config');
const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');
const passportHelper = require('./common/passportHelper');

const app = express();

if (!config.debug) {
  app.set('env', 'production');
}

// view engine setup
// config template engine
template.config('base', '');
template.config('extname', '.html');
// define view engine
app.engine('html', template.__express);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/static', express.static(path.join(__dirname, 'public')));

// Load session config
if (config.useRedis) {
  app.use(session({
    store: new RedisStore(config.redisOptions),
    resave: false,
    secret: config.sessionSecret,
    saveUninitialized: true
  }));
} else {
  app.use(session({
    secret: config.sessionSecret,
    resave: false,
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
  console.log(req.app.get('env'));
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
