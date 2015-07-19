//load from npm
var inquirer = require('inquirer');

//load gulp stuff
var gulp = require('gulp');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

/* Helper */

gulp.task('start', function(done) {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Do you want to uncomment the css?',
        default: true,
        name: 'start'
    }], function(answers) {
        if(answers.start) {
            console.log('css will be uncommented ...')
            gulp.start('question two')
        }
    });
});

gulp.task('question two', function(done) {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Do you want to autoprefix the css?',
        default: true,
        name: 'start'
    }], function(answers) {
        if(answers.start) {
            console.log('css will be uncommented and autoprefixed ...')
            gulp.start('question three')
        }
        else {
            return gulp.src('css/*.css')
                console.log('css will be uncommented ...')
                //remove comments from css
                .pipe(plugins.stripCssComments())
                //save file to destination
                .pipe(gulp.dest('dist'));
        }
    });
});

gulp.task('question three', function(done) {
    inquirer.prompt([{
        type: 'confirm',
        message: 'Do you want to minify the css?',
        default: true,
        name: 'start'
    }], function(answers) {
        if(answers.start) {
            console.log('css will be uncommented, autoprefixed, and minified ...')
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
        else {
            console.log('css will be uncommented and autoprefixed ...')
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
    });
});

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