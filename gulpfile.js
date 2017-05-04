require('shelljs/global');
const gulp = require('gulp4');
const developServer = require('gulp-develop-server');
const notifier = require('node-notifier');
const lightReload = require('light-reload');
const newer = require('gulp-newer');
const stylus = require('gulp-stylus');

const notify = message => {
  return done => {
    notifier.notify({
      title: 'Simple SSO Notify',
      message
    });
    done();
  };
}
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
    setTimeout(() => {
      lightReload.reload();
    }, 500);
    done();
  });
});

gulp.task('watch', done => {
  gulp.watch([
    'src/**/*'
  ], gulp.series('build', 'restart', notify('Server restarted...')));
  done();
});

gulp.task('open', done => {
  exec('start http://localhost:7853/');
  done();
});

gulp.task('dev', gulp.series(
  'clean',
  'build',
  gulp.parallel('serve', 'watch'),
  'open'
));
