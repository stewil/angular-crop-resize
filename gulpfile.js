'use strict';

var gulp         = require('gulp'),
    watch        = require('gulp-watch'),
    sass         = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps   = require('gulp-sourcemaps'),
    rename       = require('gulp-rename'),
    uglify       = require('gulp-uglify'),
    beautify     = require('gulp-beautify'),
    concat       = require('gulp-concat'),
    bump         = require('gulp-bump'),
    streamify    = require('gulp-streamify'),
    template     = require('gulp-template'),
    gulpFilter   = require('gulp-filter'),
    tsc          = require('gulp-typescript'),
    tslint       = require('gulp-tslint'),
    del          = require('del'),
    fs           = require('fs'),
    argv         = require('yargs').argv,
    runSequence  = require('run-sequence'),
    browserify   = require('browserify'),
    browserSync  = require('browser-sync').create(),
    source       = require('vinyl-source-stream'),
    Config       = require('./gulpfile.config');

var packageJson  = require('./package.json'),
    config       = new Config(packageJson),
    tsProject    = tsc.createProject('./tsconfig.json', {
        target: 'ES5',
        declarationFiles: false,
        noExternalResolve: true
    });

/*-----------------------------------------------------------------------
    TASKS
 -----------------------------------------------------------------------*/


//  BUILD
//-----------------------------------------------------------------------
gulp.task('debug', bundleDebug);
gulp.task('build', bundleBuild);
gulp.task('watch', ['debug'], serve);
gulp.task("reload", reloadBrowser);
gulp.task("bumpPackage", bumpPackage);
gulp.task("bumpBowerPackage", bumpBowerPackage);

//  TYPESCRIPT
//-----------------------------------------------------------------------
gulp.task("debugTS",  debugTS);
gulp.task("buildTS",  buildTS);
gulp.task("reloadTS", reloadTS);

//  SASS
//-----------------------------------------------------------------------
gulp.task("buildSASS",  buildSASS);
gulp.task("debugSASS",  debugSASS);
gulp.task('reloadSASS', reloadSASS);

//  HTML
//-----------------------------------------------------------------------
gulp.task("debugHTML",  debugHTML);
gulp.task("buildHTML",  buildHTML);
gulp.task("reloadHTML", reloadHTML);
gulp.task("debugTemplates",  debugTemplates);
gulp.task("buildTemplates",  buildTemplates);

//  TESTS
//-----------------------------------------------------------------------
gulp.task("runTests",   runTests);
gulp.task("copyTests",  copyTests);
gulp.task("copySpecRunner", copySpecRunner);
gulp.task("compileTestSource", compileTestSource);

/*-----------------------------------------------------------------------
    FUNCTIONS
 -----------------------------------------------------------------------*/

function bundle(dir, taskPrefix){
    var tasks = [];

    return clearDistFiles(dir, function() {
        if (taskPrefix === 'build') {
            tasks.push([
                'bumpPackage',
                'bumpBowerPackage'
            ]);
        }
        tasks.push([
            taskPrefix + 'TS',
            taskPrefix + 'SASS',
            taskPrefix + 'HTML',
            taskPrefix + 'Templates'
        ]);

        return runSequence.apply(null, tasks);
    });
}

function bundleBuild(){
    return bundle(config.dist, 'build');
}

function bundleDebug(){
    return bundle(config.debug, 'debug');
}

function createHtml(dir){
    gulp.src(config.index)
        .pipe(template({name: createBundleName()}))
        .pipe(gulp.dest(dir));
}

function buildHTML(){
    return createHtml(config.dist);
}

function debugHTML(){
    return createHtml(config.debug);
}

function buildTemplates(){
    return copyTemplates(config.dist);
}

function debugTemplates(){
    return copyTemplates(config.debug);
}

function copyTemplates(dist){
    console.log(config.templates);
    return gulp.src(config.templates)
        .pipe(rename(function(path){
            path.dirname = "./views/"
        }))
        .pipe(gulp.dest(dist))
}

function reloadHTML(){
    return runSequence(['debugHTML', 'debugTemplates'], ['reload']);
}

function copyTests(){
    return gulp.src(config.tests)
        .pipe(rename(function(path){
            path.dirname = '/spec/'
        }))
        .pipe(gulp.dest(config.testsDir))
}

function copySpecRunner(){
    return gulp.src(config.testIndex)
        .pipe(template({version: "0.0.0"}))
        .pipe(gulp.dest(config.testsDir));
}

function compileTestSource(){
    var jsTestBundle = browserify(config.testSourceFiles).bundle();

    return jsTestBundle
        .pipe(source(config.testSourceFiles))
        .pipe(gulp.dest(config.testsDir));
}

function runTests(){
    return del(config.testsDir + '/*').then(function() {
        return runSequence(["copySpecRunner","compileTestSource", "copyTests"], serveTests);
    });
}

function serveTests(){
    if (browserSync != null) {
        browserSync.init({
            server: {
                baseDir :"./",
                index   :"test/" + config.testIndexName
            }
        });
    }else{
        console.warn("Browser sync not available in your environment.");
    }
    gulp.watch(config.tests, function(){
        return runSequence(["copyTests"], function(){
            return browserSync.reload()
        });
    });
}

function compileSASS(dir) {

    var cssFileName = createBundleName();

    return gulp.src(config.scss)
        .pipe(sass())
        .pipe(rename(cssFileName + '.css'))
        .pipe(gulp.dest(dir + 'css'));
}

function buildSASS(){
    return compileSASS(config.dist);
}

function debugSASS(){
    return compileSASS(config.debug);
}

function reloadSASS(){
    return runSequence(['debugSASS'], ['reload']);
}

function bumpPackage(){
    return gulp.src('./package.json')
        .pipe(bump({type:(function(){
            if(argv.major){
                return 'major';
            }
            if(argv.minor){
                return 'minor';
            }
            if(argv.patch){
                return 'patch';
            }
        })()}))
        .pipe(gulp.dest('./'));
}

function bumpBowerPackage(){
    return gulp.src('./bower.json')
        .pipe(bump({type:(function(){
            if(argv.major){
                return 'major';
            }
            if(argv.minor){
                return 'minor';
            }
            if(argv.patch){
                return 'patch';
            }
        })()}))
        .pipe(gulp.dest('./'));
}

function serve(){
    if (browserSync != null) {
        browserSync.init({
            server: config.debug
        });
    }else{
        console.warn("Browser sync not available in your environment.");
    }
    gulp.watch(config.scss,      ['reloadSASS']);
    gulp.watch(config.index,     ['reloadHTML']);
    gulp.watch(config.typescript,['reloadTS']);
}

function reloadBrowser(){
    if (browserSync != null) {
        browserSync.reload();
    }
}

function clearDistFiles(dir, fn){
    return del(dir + '/*').then(function() {
        if (fn) {
            fn();
        }
    });
}

function createBundleName(){
    var config = fs.readFileSync('./package.json', 'utf-8');
    packageJson = JSON.parse(config);
    return packageJson.name + '-' + packageJson.version;
}

function reloadTS(){
    return runSequence('debugTS', 'reload');
}

function debugTS(){
    compileTSasJS(config.debug);
}

function buildTS(){
    compileTSasJS(config.dist);
}

function compileTS(){

    var typeScriptFilter = gulpFilter([
        "**/*.ts",
        "!" + config.source + "/workers/*"
    ], {restore: true});

    return gulp.src(config.allTypeScriptFiles)
        .pipe(sourcemaps.init())
        .pipe(typeScriptFilter)
        .pipe(tsc(tsProject)).js
        .pipe(typeScriptFilter.restore);
}

function compileTSasJS(dir){
    var jsFileName  = createBundleName();
    return compileTS()
        .pipe(streamify(beautify({indentSize:2})))
        .pipe(sourcemaps.init())
        .pipe(concat(jsFileName + '.js'))
        .pipe(gulp.dest(dir + 'js/'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(rename(jsFileName + '.min.js'))
        .pipe(gulp.dest(dir + 'js/'));
}


