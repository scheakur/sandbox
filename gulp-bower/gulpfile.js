var gulp = require('gulp');
var gutil = require('gulp-util');

var bower = require('gulp-bower-files');
var flatten = require('gulp-flatten');
var uglify = require('gulp-flatten');

var cond = true; //TODO: Add logic

gulp.task('default', function() {
  gutil.log('Hello,', gutil.colors.cyan('World'));
});

gulp.task('bower', function() {
  bower()
    .pipe(uglify({ preserveComments: 'some' }))
    .pipe(flatten())
    .pipe(gulp.dest('lib'));
});
