//load gulp stuff
var gulp = require('gulp');
var prettify = require('gulp-jsbeautifier');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

/** GULP TASKS **/

/* CSS Tasks */

gulp.task('uncomment-css', function() {
    return gulp.src('css/*.css')
        //remove comments from css
        .pipe(plugins.stripCssComments())
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('uncss-css', function() {
    return gulp.src('css/*.css')
        //remove unused css
        .pipe(plugins.uncss({
            html: ['html/*.html']
        }))
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

gulp.task('format-css', function() {
    return gulp.src('css/*.css')
        //prettify css
        .pipe(prettify({indentSize: 4}))
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

gulp.task('all-css', function() {
    return gulp.src('css/*.css')
        //remove comments from css
        .pipe(plugins.stripCssComments())
        //remove unused css
        .pipe(plugins.uncss({
            html: ['html/*.html']
        }))
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

gulp.task('format-js', function() {
    return gulp.src('js/*.js','js/*.json')
        //prettify js
        .pipe(prettify({config: '.jsbeautifyrc', mode: 'VERIFY_AND_WRITE'}))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

/* HTML Tasks */

gulp.task('format-html', function() {
    return gulp.src('html/*.html')
        //prettify html
        .pipe(prettify({indentSize: 4}))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

/* PHP Tasks */