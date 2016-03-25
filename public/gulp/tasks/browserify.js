var gulp = require('gulp');
var gutil = require('gulp-util');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var babelify = require("babelify");
var watchify = require('watchify');
var connect = require('gulp-connect');
var config = require('../config').browserify;

watchify.args.debug = config.debug;
var bundler = watchify(browserify(config.src, {debug:true}));
config.settings.transform.forEach(function(t) {
  bundler.transform(babelify, {
    presets: ['es2015', 'react'],
    plugins: ['transform-object-rest-spread']
  });
});

gulp.task('browserify', bundle);
bundler.on('update', bundle);

function bundle() {
  return bundler.bundle()
  // log errors if they happen
  .on('error', gutil.log.bind(gutil, 'Browserify Error'))
  .pipe(source(config.outputName))
  .pipe(gulp.dest(config.dest))
  .pipe(connect.reload());
}
