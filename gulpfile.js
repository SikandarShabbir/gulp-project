
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
var del = require('del');
var zip = require('gulp-zip');

var handlebars = require('gulp-handlebars');
var handlebarsLib = require('handlebars');
var declare = require('gulp-declare');
var wrap = require('gulp-wrap');

var imagemin = require('gulp-imagemin');
var imageminPngquant = require('imagemin-pngquant');
var imageminJpegRecompress = require('imagemin-jpeg-recompress');

var SCRIPTS_PATH = 'public/scripts/**/*.js';
var CSS_PATH = 'public/css/**/*.css';
var DIST_PATH = 'public/dist';
var TEMPLATES_PATH = 'templates/**/*.hbs';
var IMAGES_PATH = 'public/images/**/*.{png,jpeg,jpg,svg,gif}';



gulp.task('styles', function(done) {
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

	done();
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


gulp.task('scripts', function(done) {
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
	
	done();
});


gulp.task('images', function(done) {
	console.log("My First Images Gulp Task");
	return gulp.src(IMAGES_PATH)
	.pipe(imagemin(
		[
			imagemin.gifsicle(),
		    imagemin.jpegtran(),
		    imagemin.optipng(),
		    imagemin.svgo(),
		    imageminPngquant(),
		    imageminJpegRecompress()
	    ]
	    ))
	.pipe(gulp.dest(DIST_PATH + '/images'));
	
	done();
});

gulp.task('templates', function(done){
	console.log('Starting Templates Task');
	return gulp.src(TEMPLATES_PATH)
	.pipe(handlebars({
		handlebars: handlebarsLib
	}))
	.pipe(wrap('Handlebars.template(<%= contents %>)'))
	.pipe(declare({
		namespace: 'templates',
		noRedeclare: true
	}))
	.pipe(concat('templates.js'))
	.pipe(gulp.dest(DIST_PATH))
	.pipe(livereload());
	
	done();
});

gulp.task('clean', function(){
	return del.sync([ DIST_PATH ]);
	
});

gulp.task('export', function(done){
	return gulp.src('public/**/*')
	.pipe(zip('Gulp.zip'))
	.pipe(gulp.dest('./'));
	
	done();
});

gulp.task('default', gulp.series('styles','scripts','images','templates'), function(done){
	console.log('Default Task');
	
	done( new Error('Default task Error'));
});
// gulp.task('default', ['styles','scripts','images','templates'], function(){});
// gulp.task('default', function(){
// 	console.log('Default Task');
// });
gulp.task('watch', function (done) {
	console.log("Starting watch task");
	require('./server.js');
	livereload.listen();
	gulp.watch(SCRIPTS_PATH, gulp.series('scripts'));
	// gulp.watch(CSS_PATH, gulp.series('styles'));
	gulp.watch('public/scss/**/*.scss', gulp.series('styles'));
	gulp.watch(TEMPLATES_PATH, gulp.series('templates'));
	gulp.watch(IMAGES_PATH, gulp.series('images'));
	
	done();
});
