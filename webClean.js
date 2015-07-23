//load from npm
var inquirer = require('inquirer');
var rx = require('rx');

//load gulp stuff
var gulp = require('gulp');
var prettify = require('gulp-jsbeautifier');
var gulpLoadPlugins = require('gulp-load-plugins');
var plugins = gulpLoadPlugins();

/** HELPER **/

var promptsReplace = [ //the initial prompt, which is overwritten while the helper is running
    ['list','language','Select a language:',['css','js','html']]
];

var cssPrompts = [
    ['confirm','uncomment','Want to uncomment CSS?'],
    ['confirm','remove','Want to remove any unused CSS?'],
    ['confirm','autoprefix','Want to autoprefix CSS?'],
    ['confirm','formatcss','Want to format (prettify) CSS?'],
    ['confirm','minify','Want to minify CSS?']
];

var jsPrompts = [
    ['confirm','formatjs','Want to format (prettify) JS?']
]

var htmlPrompts = [
    ['confirm','formathtml','Want to format (prettify) HTML?']
]

var prompter = rx.Observable.create(function(obs) {
    setTimeout(function() {
        var prompts = promptsReplace;
        for (var i = 0; i < prompts.length; i++) {
            var entry = prompts[i];
            if(typeof entry[3] === 'undefined') {
                obs.onNext({
                    type: entry[0],
                    name: entry[1],
                    message: entry[2]
                });
            }
            else {
                obs.onNext({
                    type: entry[0],
                    name: entry[1],
                    message: entry[2],
                    choices: entry[3]
                });
            }
        }
        obs.onCompleted();
    });
});

//** WORK ON ERROR HANDLING

//fire the helper, log responses, and fire actions accordingly
inquirer.prompt(prompter, function(initResponses) {
    console.log(initResponses);
    var taskArray = []; //declare empty array to store gulp tasks
    if (initResponses.language == 'css') {
        promptsReplace = cssPrompts;
        inquirer.prompt(prompter, function(cssResponses) {
            taskArray.push('setup-dist-css') //moves css files to 'dist' for editing
            if (cssResponses.uncomment === true) {
                taskArray.push('uncomment-css');
                if (cssResponses.remove === true) {
                    taskArray.push('uncss-css');
                    if (cssResponses.autoprefix === true) {
                        taskArray.push('autoprefix-css');
                        if (cssResponses.formatcss === true) {
                            taskArray.push('format-css');
                            if (cssResponses.minify === true) {
                                taskArray.push('minify-css');
                            }
                        }
                        else {
                            if (cssResponses.minify === true) {
                                taskArray.push('minify-css');
                            }
                        }
                    }
                    else {
                        if (cssResponses.formatcss === true) {
                            taskArray.push('format-css');
                        }
                        if (cssResponses.minify === true) {
                            taskArray.push('minify-css');
                        }
                    }
                }
                else {
                    if (cssResponses.autoprefix === true) {
                        taskArray.push('autoprefix-css');
                    }
                    if (cssResponses.formatcss === true) {
                        taskArray.push('format-css');
                    }
                    if (cssResponses.minify === true) {
                        taskArray.push('minify-css');
                    }
                }
            }
            else {
                if (cssResponses.remove === true) {
                    taskArray.push('uncss-css');
                }
                if (cssResponses.autoprefix === true) {
                    taskArray.push('autoprefix-css');
                }
                if (cssResponses.formatcss === true) {
                    taskArray.push('format-css');
                }
                if (cssResponses.minify === true) {
                    taskArray.push('minify-css');
                }
            }
            //run through sequenced tasks stored in taskArray
            runSequence = require('run-sequence').use(gulp);
            for (var i = 0; i < taskArray.length; i++) {
                task = taskArray[i];
                runSequence(task);
                console.log(task);
            }
            console.log('working ...');
        });
    }
    if (initResponses.language == 'sass/scss') {
    }
    if (initResponses.language == 'html') {
        promptsReplace = htmlPrompts;
        inquirer.prompt(prompter, function(jsResponses) {
            taskArray.push('setup-dist-html') //moves css files to 'dist' for editing
            if (jsResponses.formathtml === true) {
                taskArray.push('format-html');
            }
            else {

            }
            //run through sequenced tasks stored in taskArray
            runSequence = require('run-sequence').use(gulp);
            for (var i = 0; i < taskArray.length; i++) {
                task = taskArray[i];
                runSequence(task);
                console.log(task);
            }
            console.log('working ...');
        });
    }
    if (initResponses.language == 'js') {
        promptsReplace = jsPrompts;
        inquirer.prompt(prompter, function(jsResponses) {
            taskArray.push('setup-dist-js') //moves css files to 'dist' for editing
            if (jsResponses.formatjs === true) {
                taskArray.push('format-js');
            }
            else {

            }
            //run through sequenced tasks stored in taskArray
            runSequence = require('run-sequence').use(gulp);
            for (var i = 0; i < taskArray.length; i++) {
                task = taskArray[i];
                runSequence(task);
                console.log(task);
            }
            console.log('working ...');
        });
    }
    if (initResponses.language == 'php') {
    }
});

/** GULP TASKS **/

/* CSS Tasks */

gulp.task('setup-dist-css', function() {
    return gulp.src('css/*.css')
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('uncomment-css', function() {
    return gulp.src('dist/*.css')
        //remove comments from css
        .pipe(plugins.stripCssComments())
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('uncss-css', function() {
    return gulp.src('dist/*.css')
        //remove unused css
        .pipe(plugins.uncss({
            html: ['html/*.html']
        }))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('autoprefix-css', function() {
    return gulp.src('dist/*.css')
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
    return gulp.src('dist/*.css')
        //minify css
        .pipe(plugins.minifyCss({compatibility: 'ie8'}))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

/* JS Tasks */

gulp.task('setup-dist-js', function() {
    return gulp.src('js/*.js')
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('format-js', function() {
    return gulp.src('js/*.js')
        //prettify js
        .pipe(prettify({indentSize: 2}))
        //save file to destination
        .pipe(gulp.dest('dist'));
});

/* HTML Tasks */

gulp.task('setup-dist-html', function() {
    return gulp.src('html/*.html')
        //save file to destination
        .pipe(gulp.dest('dist'));
});

gulp.task('format-html', function() {
    return gulp.src('html/*.html')
        //prettify html
        .pipe(prettify({indentSize: 4}))
        //save file to destination
        .pipe(gulp.dest('dist'));
});