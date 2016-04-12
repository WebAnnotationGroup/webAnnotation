var gulp = require('gulp');
var env = require('gulp-env');
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var browserify = require('browserify');
var babelify = require('babelify');
var transform = require('vinyl-transform');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');

gulp.task('js', function () {
  browserify({
    entries: ['./app/scripts/app.js'],
    extensions: ['.js'],
    debug: !process.env.production
  })
  .transform(babelify)
  .bundle()
  .on("error", function(err){console.log("Error : " +err.message);})
  .pipe(source("main.js"))
  .pipe(gulp.dest('./build/scripts/'));
});

gulp.task('watch', function () {
  gulp.watch("./app/scripts/**/*.js", ['js']);
});

gulp.task('copyCSS', function () {
    return gulp.src(['./app/styles/*.css','./node_modules/swiper/dist/css/swiper.min.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./build/styles/'));
});

gulp.task('copyImages', function () {
    return gulp.src('./app/images/*.*')
        .pipe(gulp.dest('./build/images/'));
});

gulp.task('copyFonts', function () {
    return gulp.src('./app/font/roboto/*.*')
        .pipe(gulp.dest('./build/font/roboto/'));
});

gulp.task('copyJsExternal', function () {
    return gulp.src('./app/jsExternal/*.*')
        .pipe(gulp.dest('./build/jsExternal/'));
});

gulp.task('copyHTML', function () {
    return gulp.src('./app/*.html')
    .pipe(gulp.dest('./build/'));
});

gulp.task('cleanBuild', function(){
    return gulp.src('./build/*', {read:false})
    .pipe(clean({force:true}));
});

gulp.task('default', ['cleanBuild'], function(){
  gulp.start('copyHTML');
  gulp.start('copyCSS');
  gulp.start('copyImages');
  gulp.start('copyJsExternal');
  gulp.start('copyFonts');
  gulp.start('js');
  gulp.start('watch');
});
