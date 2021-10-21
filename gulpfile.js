'use strict';
/*
1. npm install gulp-cli -g
2. npm install -D gulp node-sass gulp-sass gulp-sourcemaps gulp-autoprefixer gulp-concat browser-sync 
После всех шагов пишем в консоль команду gulp
- все scss файлы проимпортированные в главном scss файле превратятся в css и положится в папку dist
- стартует локальный сервер и открывается браузер с url http://localhost:3000/
*/

const path_to_main_scss_file = 'assets/scss/style.scss';
const scss_path_to_watch = 'assets/scss/**/*.scss';
const destination_path = 'assets/styles/'; 
const final_css_name = 'style.css';

const gulp         = require('gulp');
const sass         = require('gulp-sass')(require('sass'));
const sourcemaps   = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const concat       = require('gulp-concat');
const browserSync  = require('browser-sync').create();

function sync() {
	browserSync.init({
		server: {
			baseDir: './'
		}
	});

	gulp.watch(scss_path_to_watch, {ignoreInitial: false}, build_sass);
	gulp.watch("./*.html").on('change', browserSync.reload);
}

function build_sass() {
	return gulp.src(path_to_main_scss_file) 
	.pipe(sourcemaps.init())
	.pipe(sass().on('error', sass.logError))
	.pipe(sourcemaps.write())
	.pipe(concat(final_css_name))
	.pipe(autoprefixer({
        overrideBrowserslist: ['last 8 versions'],
        browsers: [
            'Android >= 4',
            'Chrome >= 20',
            'Firefox >= 24',
            'Explorer >= 11',
            'iOS >= 6',
            'Opera >= 12',
            'Safari >= 6',
        ],
    }))
    .pipe(gulp.dest(destination_path))
    .pipe(browserSync.stream());
}

exports.default = sync;