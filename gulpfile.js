var gulp = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')(require('sass'));
const { watch, series } = require('gulp');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

gulp.task('pug', () => {
    return gulp.src('src/views/*.pug')
         .pipe(pug({
            pretty: true
        }))
        .pipe(gulp.dest('dist/'))
})


gulp.task('sass', () => {
    return gulp.src('src/assets/css/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('dist/assets/css/'))
})

gulp.task('js', () => {
    return gulp.src('src/assets/js/*.js')
                .pipe(gulp.dest('dist/assets/js/'))
})

exports.default = function() {
    browserSync.init({
        server: {
            baseDir: "./dist/"
        }
    });
    watch([
      'src/views/**/*.pug',
      'src/assets/css/*.scss',
      'src/views/components/**/*.scss',
      'src/assets/js/*.js'
    ], series('pug', 'sass','js')).on("change", reload);

};
