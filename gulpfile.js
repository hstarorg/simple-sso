require('shelljs/global');
const gulp = require('gulp4');
const developServer = require('gulp-develop-server');
const notifier = require('node-notifier');
const lightReload = require('light-reload');
const newer = require('gulp-newer');

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
    'src/**/*'
  ])
    .pipe(newer(destFolder))
    .pipe(gulp.dest(destFolder));
});

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
    lightReload.reload();
    done();
  });
});

gulp.task('watch', done => {
  gulp.watch([
    'src/**/*'
  ], gulp.series('copy', 'restart', notify('Server restarted...')));
  done();
});

gulp.task('open', done => {
  exec('start http://localhost:7853/');
  done();
});

gulp.task('dev', gulp.series(
  'clean',
  'copy',
  gulp.parallel('serve', 'watch'),
  'open'
));
