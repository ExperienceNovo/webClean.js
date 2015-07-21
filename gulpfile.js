//load from npm
var inquirer = require('inquirer');
var rx = require('rx');

//load gulp stuff
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

/** HELPER **/

var prompts = [
    ['confirm','uncomment','Want to uncomment CSS?'],
    ['confirm','autoprefix','Want to autoprefix CSS?'],
    ['confirm','minify','Want to minify CSS?']
];

var prompter = rx.Observable.create(function( obs ) {
    setTimeout(function () {
        for (var i = 0; i < prompts.length; i++) {
            var entry = prompts[i];
            obs.onNext({
                type: entry[0],
                name: entry[1],
                message: entry[2],
            });
        }
        obs.onCompleted();
    });
});

//fire the helper, log responses, and fire actions accordingly
inquirer.prompt(prompter, function(responses) {
    console.log(responses);
    if (responses.uncomment === true && responses.autoprefix == false && responses.minify === false) {
        return gulp.src('css/*.css')
            //remove comments from css
            .pipe(plugins.stripCssComments())
            //save file to destination
            .pipe(gulp.dest('dist'));
    }
    if (responses.uncomment === true && responses.autoprefix == true && responses.minify === false) {
        return gulp.src('css/*.css')
            //remove comments from css
            .pipe(plugins.stripCssComments())
            //autoprefixer to ensure cross-browser compatibility
            .pipe(plugins.autoprefixer({
                browsers: ['> 5%'],
                cascade: false //if true: changes the CSS indentation to create a nice visual cascade of prefixesalse
            }))
            //save file to destination
            .pipe(gulp.dest('dist'));
    }
    if (responses.uncomment === false && responses.autoprefix === true && responses.minify === false) {
        return gulp.src('css/*.css')
            //autoprefixer to ensure cross-browser compatibility
            .pipe(plugins.autoprefixer({
                browsers: ['> 5%'],
                cascade: false //if true: changes the CSS indentation to create a nice visual cascade of prefixesalse
            }))
            //save file to destination
            .pipe(gulp.dest('dist'));
    }
    if (responses.uncomment === false && responses.autoprefix === true && responses.minify === true) {
        return gulp.src('css/*.css')
            //autoprefixer to ensure cross-browser compatibility
            .pipe(plugins.autoprefixer({
                browsers: ['> 5%'],
                cascade: false //if true: changes the CSS indentation to create a nice visual cascade of prefixesalse
            }))
            //minify css
            .pipe(plugins.minifyCss({compatibility: 'ie8'}))
            //save file to destination
            .pipe(gulp.dest('dist'));
    }
    if (responses.uncomment === false && responses.autoprefix === false && responses.minify === true) {
        return gulp.src('css/*.css')
            //minify css
            .pipe(plugins.minifyCss({compatibility: 'ie8'}))
            //save file to destination
            .pipe(gulp.dest('dist'));
    }
    if (responses.uncomment === true && responses.autoprefix === true && responses.minify === true) {
        return gulp.src('css/*.css')
            //remove comments from css
            .pipe(plugins.stripCssComments())
            //autoprefixer to ensure cross-browser compatibility
            .pipe(plugins.autoprefixer({
                browsers: ['> 5%'],
                cascade: false //if true: changes the CSS indentation to create a nice visual cascade of prefixesalse
            }))
            //minify css
            .pipe(plugins.minifyCss({compatibility: 'ie8'}))
            //save file to destination
            .pipe(gulp.dest('dist'));
    }
});

/** GULP TASKS **/

/* CSS Tasks */

gulp.task('uncomment-css', function() {
    return gulp.src('css/*.css')
        //remove comments from css
        .pipe(plugins.stripCssComments())
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('minify-css', function() {
    return gulp.src('css/*.css')
        //minify css
        .pipe(plugins.minifyCss({compatibility: 'ie8'}))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('autoprefix-css', function() {
    return gulp.src('css/*.css')
        //autoprefixer to ensure cross-browser compatibility
        .pipe(plugins.autoprefixer({
            browsers: ['> 5%'],
            cascade: false //if true: changes the CSS indentation to create a nice visual cascade of prefixesalse
        }))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('all-css', function() {
    return gulp.src('css/*.css')
        //remove comments from css
        .pipe(plugins.stripCssComments())
        //autoprefixer to ensure cross-browser compatibility
        .pipe(plugins.autoprefixer({
            browsers: ['> 5%'],
            cascade: false //if true: changes the CSS indentation to create a nice visual cascade of prefixesalse
        }))
        //minify css
        .pipe(plugins.minifyCss({compatibility: 'ie8'}))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

/* JS Tasks */

/* PHP Tasks */