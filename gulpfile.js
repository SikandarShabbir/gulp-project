
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');



var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';



gulp.task('styles', function() {
	console.log("My First Styling Gulp Task");
	return gulp.src(['public/css/reset.css',CSS_PATH])
	.pipe(concat('styles.css'))
	.pipe(minifyCss())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
});


gulp.task('scripts', function() {
	console.log("My First  Scripts Gulp Task");
	return gulp.src(SCRIPTS_PATH)
	.pipe(uglify())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
});


gulp.task('images', function() {
	console.log("My First Images Gulp Task");
});

gulp.task('default', function () {
	console.log("Default task");
});

gulp.task('watch', function () {
	console.log("Starting watch task");
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, gulp.series('scripts'));
	gulp.watch(CSS_PATH, gulp.series('styles'));
});
