WebClean - code cleanup utility
=============================

WebClean is a code cleanup utility built on node.js and gulp.


###Features by Language

- CSS
     - remove comments
     - autoprefix for browsers with greater than 5% market share
     - minify css (ie8 capable)

- HTML (coming soon)

- JS (coming soon)

- PHP (coming soon)

###Using WebClean

- prerequisites: node.js, gulp
- dependencies:
    - node extensions: inquirer, rx
    - gulp extensions: minify-css, autoprefixer, strip-css-comments, prompt, sourcemaps

Open up terminal and navigate to the home directory. You can run WebClean with the command line tool,
or you can run the gulp tasks individually.

To use the command line tool, type the following:

``` shell
node gulpfile.js
```

Answer yes or no to the on-screen prompts. Once all prompts have been answered, WebClean makes the
appropriate changes to your file(s) and stores them in /dist.

If you prefer running the gulp tasks individually, you can use the following command. Just replace *name of task*
with what you'd like to run:

``` shell
gulp *name of task*
```

Below is a list of available gulp tasks, by language.

- CSS
    - uncomment-css
    - autoprefix-css
    - minify-css
    - all-css