
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var SCRIPTS_PATH = 'public/scripts/**/*.js';



gulp.task('styles', function() {
	console.log("My First Styling Gulp Task");
});


gulp.task('scripts', function() {
	console.log("My First  Scripts Gulp Task");
	return gulp.src(SCRIPTS_PATH)
	.pipe(uglify())
	.pipe(gulp.dest('public/dist'))
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
});
