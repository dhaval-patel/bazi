/**
 * Created by Moiz.Kachwala on 08-06-2016.
 */


"use strict";

const gulp = require("gulp"),
    del = require("del"),
    tsc = require("gulp-typescript"),
    sourcemaps = require('gulp-sourcemaps'),
    tsProject = tsc.createProject("tsconfig.json"),
    tslint = require('gulp-tslint'),
    concat = require('gulp-concat'),
    runSequence = require('run-sequence'),
    nodemon = require('gulp-nodemon'),
    gulpTypings = require("gulp-typings");

/**
 * Remove build directory.
 */
gulp.task('clean', (cb) => {
    return del(["dist"], cb);
});

/**
 * Build Express server
 */
gulp.task('build:server', function () {
    var tsProject = tsc.createProject('server/tsconfig.json');
    var tsResult = gulp.src('server/src/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/server/src'));
});

gulp.task('build:common', function () {
    var tsProject = tsc.createProject('common/tsconfig.json');
    var tsResult = gulp.src('common/**/*.ts')
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/common'));
});

gulp.task('build:client', function () {
    var tsProject = tsc.createProject('client/tsconfig.json');
    var tsResult = gulp.src('client/src/**/*.ts') 
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/client'));
});

/**
 * Lint all custom TypeScript files.
 */
gulp.task('tslint', () => {
    return gulp.src("client/src/app/**/*.ts")
        .pipe(tslint({
			formatter: "prose"
		}))
		.pipe(tslint.report());
});


/**
 * Compile TypeScript sources and create sourcemaps in build directory.
 */
gulp.task("compile", ["tslint"], () => {
    let tsResult = gulp.src("client/src/app/**/*.ts")
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    return tsResult.js
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("dist/client/src/app"));
});

/**
 * Copy all resources that are not TypeScript files into build directory. e.g. index.html, css, images
 */
gulp.task("clientResources", () => {
    return gulp.src(["client/src/**/*", "!**/*.ts", "!client/typings", "!client/typings/**", "!client/*.json"])
        .pipe(gulp.dest("dist/client"));
});

/**
 * Copy bin directory for www
 */
gulp.task("serverResources", () => {
    return gulp.src(["server/src/bin/**"])
        .pipe(gulp.dest("dist/server/src/bin"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("libs", () => {
    return gulp.src([
        'core-js/client/**',
        'zone.js/dist/zone.js',
        'reflect-metadata/Reflect.js',
        'reflect-metadata/Reflect.js.map',
        'systemjs/dist/system.src.js'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("dist/client/libs"));
});

/**
 * Copy all required libraries into build directory.
 */
gulp.task("css", () => {
    return gulp.src([
        'bootstrap/dist/**/**'
    ], { cwd: "node_modules/**" }) /* Glob required here. */
        .pipe(gulp.dest("dist/client/css"));
});


/**
 * Install typings for server and client.
 */
gulp.task("installTypings", function () {
    var stream = gulp.src(["./server/typings.json", "./client/typings.json"])
        .pipe(gulpTypings(null)); //will install all typingsfiles in pipeline.
    return stream; // by returning stream gulp can listen to events from the stream and knows when it is finished.
});

/**
 * Start the express server with nodemon
 */
gulp.task('start', function () {
    nodemon({
        script: 'dist/server/src/bin/www'
        , ext: 'html js'
        , ignore: ['ignored.js']
        //, tasks: ['tslint']
        , env: { 'DEBUG': 'socket.io:socket' }
    })
        .on('restart', function () {
            console.log('restarted!');
        });
});

/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 3. Build the Angular app
 * 4. Copy the resources
 * 5. Copy the dependencies.
 */

// gulp.task("build", function (callback) {
//     runSequence('clean', 'build:common', 'build:server', 'build:client', 'clientResources', 'serverResources', 'libs', 'css', callback);
// });

/**
 * Watch for changes in TypeScript, HTML and CSS files.
 */
gulp.task('watch', function () {
    gulp.watch(["client/src/**/*.ts"], ['compile']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });

    gulp.watch(["client/**/*.html", "client/**/*.css"], ['clientResources']).on('change', function (e) {
        console.log('Resource file ' + e.path + ' has been changed. Updating.');
    });

    gulp.watch(["server/**/*.ts"], ['build:common']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });

    gulp.watch(["common/src/**/*.ts"], ['build:server', 'serverResources']).on('change', function (e) {
        console.log('TypeScript file ' + e.path + ' has been changed. Compiling.');
    });
});

/**
 * Build the project.
 * 1. Clean the build directory
 * 2. Build Express server
 * 3. Build the Angular app
 * 4. Copy the resources
 * 5. Copy the dependencies.
 */

gulp.task("build", function (callback) {
    runSequence('clean', 'build:common', 'build:server', 'build:client', 'clientResources', 'serverResources', 'libs', 'css', callback);
});

gulp.task('default', function () {
    runSequence('build:common', 'build:server', 'build:client', 'clientResources', 'serverResources', 'libs', 'css', 'watch', 'start');
});

gulp.task('serve', function () {
    runSequence('build', 'watch', 'start');
});

