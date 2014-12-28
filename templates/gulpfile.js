var gulp = require('gulp');
var sass = require('gulp-sass');

gulp.task('sass', function() {
  gulp.src('static/sass/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('static/dist/css'));
});

gulp.task('watch', function() {
  gulp.watch('static/sass/**/*.scss', ['sass']);
});
