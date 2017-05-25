require('shelljs/global');
const gulp = require('gulp4');
const developServer = require('gulp-develop-server');
const notifier = require('node-notifier');
const lightReload = require('light-reload');
const newer = require('gulp-newer');
const stylus = require('gulp-stylus');
const webpack = require('webpack');

const util = require('./build/util');
const webpackConfig = require('./build/webpack.config');

const notify = message => {
  return done => {
    notifier.notify({
      title: 'Simple SSO Notify',
      message
    });
    done();
  };
};

const refresh = done => {
  setTimeout(() => {
    lightReload.reload();
    done && done();
  }, 500);
};

const destFolder = 'dist';

gulp.task('clean', done => {
  rm('-rf', 'dist');
  done();
});

gulp.task('copy', () => {
  return gulp.src([
    'src/**/*',
    '!src/assets/**/*'
  ])
    .pipe(newer(destFolder))
    .pipe(gulp.dest(destFolder));
});

gulp.task('css', () => {
  return gulp.src('./src/assets/css/all.styl')
    .pipe(stylus({
      'include css': true
    }))
    .pipe(gulp.dest('dist/assets/css'));
});

gulp.task('js', done => {
  const compiler = webpack(webpackConfig);
  compiler.watch({ aggregateTimeout: 500, poll: false, ignored: [/node_modules/] }, (err, stats) => {
    util.showWebpackError(err, stats);
    refresh();
    done();
  });
});

gulp.task('build', gulp.parallel('copy', 'css'));

gulp.task('serve', done => {
  lightReload.init();
  developServer.listen({ path: 'dist/index.js' }, err => {
    if (err) {
      console.error(err);
    }
    notify('Server started...')(done);
  });
});

gulp.task('restart', done => {
  developServer.restart(err => {
    if (err) {
      console.error(err);
    }
    refresh();
    done();
  });
});

gulp.task('watch', done => {
  gulp.watch([
    'src/bizs/**/*',
    'src/common/**/*',
    'src/models/**/*',
    'src/*.js'
  ], gulp.series('copy', 'restart', notify('Server restarted...')));

  gulp.watch([
    'src/views/**'
  ], gulp.series('copy', refresh));

  gulp.watch([
    'src/assets/css/**/*'
  ], gulp.series('css', refresh));

  done();
});

gulp.task('open', done => {
  exec('start http://localhost:7853/');
  done();
});

gulp.task('dev', gulp.series(
  'clean',
  'build',
  'js',
  gulp.parallel('serve', 'watch'),
  'open'
));
