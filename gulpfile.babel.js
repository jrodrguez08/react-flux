'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import open from 'gulp-open';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import concat from 'gulp-concat';
import sass from 'gulp-sass'
import gulpConfig from './config';

const config = gulpConfig();

//start local dev server
gulp.task('connect', () => {
    connect.server({
        root: ['dist'],
        port: config.port,
        base: config.devBaseUrl,
        livereload: true
    });
});

gulp.task('open', ['connect'], () => {
    gulp.src('dist/index.html')
        .pipe(open({uri: `${config.devBaseUrl}:${config.port}/`}))
});

gulp.task('html', () => {
    gulp.src(config.paths.html)
        .pipe(gulp.dest(config.paths.dist))
        .pipe(connect.reload());
});

gulp.task('js', () => {
    browserify(config.paths.mainJS)
        .transform(babelify, {presets: ['es2015', 'react']})
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(`${config.paths.dist}/scripts`))
        .pipe(connect.reload());
});

gulp.task('css', () => {
    gulp.src(config.paths.css)
        .pipe(concat('bundle.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(`${config.paths.dist}/css`))
});

gulp.task('watch', () => {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js']);
    gulp.watch(config.paths.css, ['css']);
});

gulp.task('default', ['html', 'js', 'css', 'open', 'watch']);