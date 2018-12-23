
var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var livereload = require('gulp-livereload');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var plumber = require('gulp-plumber');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var handlebars = require('gulp-handlebrs');
var handlebarsLib = require('handlebrs');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');



var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';



gulp.task('styles', function() {
	console.log("My First Styling Gulp Task");
	return gulp.src('public/scss/styles.scss')
	.pipe(plumber(function(error){
		console.log("Styles Task Error!");
		console.log(error);
		this.emit('end');
	}))
	.pipe(sourcemaps.init())
	.pipe(autoprefixer())
	.pipe(sass({
		outputStyle: 'compressed'
	}))
	.pipe(minifyCss())
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
});

// gulp.task('styles', function() {
// 	console.log("My First Styling Gulp Task");
// 	return gulp.src(['public/css/reset.css',CSS_PATH])
// 	.pipe(plumber(function(error){
// 		console.log("Styles Task Error!");
// 		console.log(error);
// 		this.emit('end');
// 	}))
// 	.pipe(sourcemaps.init())
// 	.pipe(autoprefixer())
// 	.pipe(concat('styles.css'))
// 	.pipe(minifyCss())
// 	.pipe(sourcemaps.write())
// 	.pipe(gulp.dest(DIST_PATH))
// 	.pipe(livereload());
// });


gulp.task('scripts', function() {
	console.log("My First  Scripts Gulp Task");
	return gulp.src(SCRIPTS_PATH)
	.pipe(plumber(function(error){
		console.log("Scripts Task Error!");
		console.log(error);
		this.emit('end');
	}))
	.pipe(sourcemaps.init())
	.pipe(babel({
		presets: ['@babel/env']
	}))
	.pipe(uglify())
	.pipe(concat('scripts.js'))
	.pipe(sourcemaps.write())
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
});


gulp.task('images', function() {
	console.log("My First Images Gulp Task");
});

gulp.task('templates', function(){
	
});

gulp.task('default', function () {
	console.log("Default task");
});

gulp.task('watch', function () {
	console.log("Starting watch task");
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, gulp.series('scripts'));
	// gulp.watch(CSS_PATH, gulp.series('styles'));
	gulp.watch('public/scss/**/*.scss', gulp.series('styles'));
});
