var paths = {
	appDirectory: "www/",
	vendorcss: [
		"./www/lib/components-font-awesome/css/font-awesome.min.css",
		"./www/lib/icomoon/style-font.css",
		"lib/ionic/css/ionic.css"
	],
	vendorjs: [
		"./www/lib/ionic/js/ionic.bundle.min.js",
		"./www/lib/angular-local-storage/dist/angular-local-storage.min.js",
		//"./www/cordova.js"		
	],
	vendorfiles: [
	"./www/lib/components-font-awesome/css/font-awesome.min.css",
		"./www/lib/icomoon/style-font.css",
		"./www/lib/ionic/js/ionic.bundle.min.js",
		"./www/lib/angular-local-storage/dist/angular-local-storage.min.js",
		"./www/lib/ionic/fonts/*",
		"./www/lib/ionic/css/ionic.css",
		"./www/lib/icomoon/fonts/*",
		"./www/lib/angular/*.js",
		"./www/lib/angular-animate/*.js",
		"./www/lib/angular-sanitize/*.js",
		"./www/lib/angular-ui-router/*.js"
	]
};

var gulp = require('gulp'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin'),
    cache = require('gulp-cache');
var minifycss = require('gulp-minify-css');
var browserSync = require('browser-sync');
var util = require('gulp-util');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('browser-sync', function() {
  browserSync({
    server: {
       baseDir: "./"
    }
  });
});

gulp.task('bs-reload', function () {
  browserSync.reload();
});

gulp.task('images', function(){
	util.log('Images');
  gulp.src('www/img/**/*')
    .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
    .pipe(gulp.dest('dist/img/'));
});

gulp.task('styles', function(){
	util.log('Styles');
	gulp.src('www/css/**/*')
    .pipe(autoprefixer('last 2 versions'))
    .pipe(gulp.dest('dist/css/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('dist/css/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('scripts', function(){
	util.log('Scripts');
  return gulp.src('www/js/**/*.js')
    .pipe(plumber({
      errorHandler: function (error) {
        console.log(error.message);
        this.emit('end');
    }}))
    .pipe(concat('main.js'))
	.pipe(ngAnnotate())
    .pipe(gulp.dest('dist/js/'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'))
    .pipe(browserSync.reload({stream:true}))
});

gulp.task('html',function(){
	gulp.src(['www/*.html'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('dist/'));
});

gulp.task('templates',function(){
	gulp.src(['www/templates/**/*.html'])
		.pipe(plumber({
			handleError: function (err) {
				console.log(err);
				this.emit('end');
			}
		}))
		.pipe(gulp.dest('dist/templates'));
});

gulp.task('vendorjs', function () {
    util.log('Bundling, minifying, and copying the Vendor JavaScript');
    return gulp.src(paths.vendorjs, { base: './www' })
	.pipe(plumber({
	  errorHandler: function (error) {
		console.log(error.message);
		this.emit('end');
	}}))
	.pipe(uglify())
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('vendorcss', function () {
    util.log('Bundling, minifying, and copying the Vendor JavaScript');
    return gulp.src(paths.vendorcss, { base: './www' })
	.pipe(plumber({
	  errorHandler: function (error) {
		console.log(error.message);
		this.emit('end');
	}}))
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('vendorfiles', function () {
    util.log('Bundling, minifying, and copying the Vendor files');
    return gulp.src(paths.vendorfiles, { base: './www' })
	.pipe(plumber({
	  errorHandler: function (error) {
		console.log(error.message);
		this.emit('end');
	}}))
	.pipe(gulp.dest('./dist'))
	.pipe(browserSync.reload({stream:true}))
});

gulp.task('build', ['images', 'styles', 'scripts', 'html', 'templates',
'vendorfiles']);