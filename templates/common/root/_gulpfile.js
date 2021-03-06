// Generated on <%= (new Date).toISOString().split('T')[0] %> using <%= pkg.name %> <%= pkg.version %>
'use strict';

var gulp = require('gulp');
var concat = require("gulp-concat");
var del = require('del');
var html2js = require('gulp-ng-html2js');
var jshint = require('gulp-jshint');
var ngAnnotate = require('gulp-ng-annotate');
var rename = require('gulp-rename');
var replace = require('gulp-replace');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');
var runSequence = require('run-sequence');

gulp.task('build', function () {
  runSequence('sass',
              'clean-css',
              'build-css',
              'html2js',
              'clean-js',
              'build-js');
});


gulp.task('build-css', function () {
  var date = new Date;
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var myVersionNumber = month + '-' + day + '-' + hour + '-' + minutes + '-' + seconds;

  gulp.src(['templates/index.html'])
    .pipe(replace(/<%= _.slugify(_.humanize(appname)) %>-v[A-Z0-9.-]+?.min.css/, '<%= _.slugify(_.humanize(appname)) %>-v' + myVersionNumber + '.min.css'))
    .pipe(gulp.dest('templates'));

  return gulp.src(['static/bower_components/bootstrap/dist/css/bootstrap.min.css',
    'static/css/style.css'])
    // Bundle to a single file
    .pipe(concat('<%= _.slugify(_.humanize(appname)) %>-v' + myVersionNumber + '.min.css'))
    // Output it to our dist folder
    .pipe(gulp.dest('static/dist/css'));
});


gulp.task('build-js-bower-components', function() {
  var date = new Date;
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var myVersionNumber = month + '-' + day + '-' + hour + '-' + minutes;

  gulp.src(['static/bower_components/angular/angular.min.js',
    'static/bower_components/angular-route/angular-route.min.js',<% if (animateModule) { %>
    'static/bower_components/angular-animate/angular-animate.min.js',<% } %><% if (ariaModule) { %>
    'static/bower_components/angular-aria/angular-aria.min.js',<% } %><% if (cookiesModule) { %>
    'static/bower_components/angular-cookies/angular-cookies.min.js',<% } %><% if (messagesModule) { %>
    'static/bower_components/angular-messages/angular-messages.min.js',<% } %><% if (resourceModule) { %>
    'static/bower_components/angular-resource/angular-resource.min.js',<% } %><% if (sanitizeModule) { %>
    'static/bower_components/angular-sanitize/angular-sanitize.min.js',<% } %><% if (touchModule) { %>
    'static/bower_components/angular-touch/angular-touch.min.js',<% } %>
    'static/bower_components/ng-tasty/ng-tasty-tpls.min.js'])
    .pipe(sourcemaps.init({loadMaps: true}))
    // Bundle to a single file
    .pipe(concat('bower-components-v' + myVersionNumber + '.min.js'))
    .pipe(sourcemaps.write('.'))
    // Output it to our dist folder
    .pipe(gulp.dest('static/dist/js'));

  gulp.src(['templates/index.html'])
    .pipe(replace(/bower-components-v[A-Z0-9.-]+?.min.js/, 'bower-components-v' + myVersionNumber + '.min.js'))
    .pipe(gulp.dest('templates'));
});


gulp.task('build-js', function () {
  var date = new Date;
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var hour = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var myVersionNumber = month + '-' + day + '-' + hour + '-' + minutes + '-' + seconds;

  gulp.src(['static/dist/template/template.html.js', 
    'static/js/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('<%= _.slugify(_.humanize(appname)) %>-v' + myVersionNumber + '.js'))
    .pipe(ngAnnotate())
    //.pipe(gulp.dest('static/dist/js'))
    .pipe(uglify())
    .pipe(rename({extname: '.min.js'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('static/dist/js'));

  gulp.src(['templates/index.html'])
    .pipe(replace(/<%= _.slugify(_.humanize(appname)) %>-v[A-Z0-9.-]+?.min.js/, '<%= _.slugify(_.humanize(appname)) %>-v' + myVersionNumber + '.min.js'))
    .pipe(gulp.dest('templates'));
});


gulp.task('build-bower-components', function() {
  gulp.run('clean-js-bower-components');
  gulp.run('build-js-bower-components');
});


gulp.task('clean-css', function () {
  return del([
    'static/dist/css/<%= _.slugify(_.humanize(appname)) %>*'
  ]);
});


gulp.task('clean-js-bower-components', function () {
  return del([
    'static/dist/js/bower-components*'
  ]);
});


gulp.task('clean-js', function () {
  return del([
    'static/dist/js/<%= _.slugify(_.humanize(appname)) %>*'
  ]);
});


gulp.task('html2js', function () {
  return gulp.src(['templates/components/*.html',
    'templates/pages/*.html'])
    .pipe(html2js({
      moduleName: 'myApp.template'
    }))
    .pipe(concat('template.html.js'))
    .pipe(gulp.dest('static/dist/template'))
});


gulp.task('jshint', function () {
  return gulp.src('static/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});


gulp.task('sass', function () {
  return gulp.src('static/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('static/css'));
});


gulp.task('watch', function () {
  gulp.watch(['static/js/**/*.js', 'static/dist/template/*.js'], function () {
    runSequence('clean-js', 'jshint', 'build-js');
  });
  gulp.watch('static/sass/**/*.scss', ['sass']);
  gulp.watch('static/css/style.css', function () {
    runSequence('clean-css', 'build-css');
  });
  gulp.watch(['templates/components/*.html', 'templates/pages/*.html'], ['html2js']);
});
