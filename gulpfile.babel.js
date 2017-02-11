'use strict';

import gulp from 'gulp';
import connect from 'gulp-connect';
import open from 'gulp-open';
import browserify from 'browserify';
import source from 'vinyl-source-stream';
import babelify from 'babelify';
import concat from 'gulp-concat';
import sass from 'gulp-sass'
import eslint from 'gulp-eslint';
import browserSync from 'browser-sync';
import minifyCSS from 'gulp-cssmin';
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
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('lint', () => {
    gulp.src(config.paths.js)
        .pipe(eslint({configFile: 'eslint.json'}))
        .pipe(eslint.format());
});

gulp.task('sass', () => {
    gulp.src(config.paths.css.main)
        .pipe(concat('bundle.css'))
        .pipe(sass().on('error', sass.logError))
        .pipe(minifyCSS())
        .pipe(gulp.dest(`${config.paths.dist}/css`))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('browserSync', () => {
    browserSync.init({
        server: {
            baseDir: 'dist'
        },
    })
});

gulp.task('watch', ['browserSync'], () => {
    gulp.watch(config.paths.html, ['html']);
    gulp.watch(config.paths.js, ['js', 'lint']);
    gulp.watch([config.paths.css.global], ['sass']);
});

gulp.task('default', ['html', 'js', 'sass', 'lint', 'open', 'watch']);