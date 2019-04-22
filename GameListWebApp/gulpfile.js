/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
      gp_clean = require("gulp-clean"),
      gp_concat = require("gulp-concat"),
      gp_sourcemaps = require("gulp-sourcemaps"),
      gp_typescript = require("gulp-typescript"),
      gp_uglify = require("gulp-uglify");

var srcPaths = {
    app: [ 'Scripts/app/main.ts', 'Scripts/app/**/*.ts'],
    js: ["Scripts/js/**/*.js",
        'node_modules/core-js/clients/shim.min.js',
        'node_modules/zone.js/dist/zone.js',
        'node_modules/reflect-metadata/reflect.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/typescript/lib/typescript.js'
    ],
    js_angular: [
        "node_modules/@angular/**"
    ],
    js_rxjs: [
        "node_modules/rxjs/**"
    ]
};

var destPaths = {
    app: "wwwroot/app",
    js: "wwwroot/js",
    js_angular: "wwwroot/js/@angular",
    js_rxjs: "wwwroot/js/rxjs"
};

gulp.task("app", ["app_clean"], function () {
    return gulp.src(srcPaths.app)
        .pipe(gp_sourcemaps.init())
        .pipe(gp_typescript(require("./tsconfig.json").compilerOptions))
        .pipe(gp_uglify({ mangle: false }))
        .pipe(gp_sourcemaps.write("/"))
        .pipe(gulp.dest(destPaths.app));
});

gulp.task("app_clean", function () {
    return gulp.src(destPaths.app + "*", { read: false })
        .pipe(gp_clean({ force: true }));
});

gulp.task("js", function () {
    gulp.src(srcPaths.js_angular)
        .pipe(gulp.dest(destPaths.js_angular));
    gulp.src(srcPaths.js_rxjs)
        .pipe(gulp.dest(destPaths.js_rxjs));
    return gulp.src(srcPaths.js)
        .pipe(gulp.dest(destPaths.js));
});

gulp.task("watch", function () {
    gulp.watch([srcPaths.app, srcPaths.js], ["js"]);
});

gulp.task("cleanup", ["app_clean", "js_clean"]);
gulp.task("default", ["app", "js", "watch"]);

//paths.js = paths.webroot + "js/**/*.js";
//paths.minJs = paths.webroot + "js/**/*.min.js";
//paths.css = paths.webroot + "css/**/*.css";
//paths.minCss = paths.webroot + "css/**/*.min.css";
//paths.concatJsDest = paths.webroot + "js/site.min.js";
//paths.concatCssDest = paths.webroot + "css/site.min.css";

//gulp.task("clean:js", done => rimraf(paths.concatJsDest, done));
//gulp.task("clean:css", done => rimraf(paths.concatCssDest, done));
//gulp.task("clean", gulp.series(["clean:js", "clean:css"]));



//gulp.task("min:css", () => {
//  return gulp.src([paths.css, "!" + paths.minCss])
//  .pipe(concat(paths.concatCssDest))
//  .pipe(cssmin())
//  .pipe(gulp.dest("."));
//});

//gulp.task("min", gulp.series(["min:js", "min:css"]));

//// A 'default' task is required by Gulp v4
//gulp.task("default", gulp.series(["min"]));