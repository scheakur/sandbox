var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function() {
  return browserify()
    .transform(babelify)
    .require('./src/js/react-hello.js', { entry: true })
    .bundle()
    .on('error', function(err) {
      console.log('Error: ' + err.message);
      this.emit('end');
    })
    .pipe(source('bundle.js'))
    .pipe(gulp.dest('./build/'));
});

gulp.task('watch', ['build'], function() {
  gulp.watch('./src/**/*.*', ['build']);
});

gulp.task('default', ['build']);
