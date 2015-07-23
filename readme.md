webClean.js - code cleanup utility
=============================

webClean.js is a code cleanup utility built on node.js and gulp.


###Features by Language

- CSS
     - remove comments
     - autoprefix for browsers with greater than 5% market share
     - minify css (ie8 capable)
     - remove unused css
     - concatenate css files (coming soon)

- SASS/SCSS (coming soon)

- HTML (coming soon)

- JS (coming soon)
    - format JS files (make it pretty, coming soon)
    - parse and format JSON files (coming soon)
    - wrap JS files (coming soon)

- PHP (coming soon)

###Using webClean.js

- prerequisites: node.js, gulp
- dependencies:
    - node extensions: inquirer, rx
    - gulp extensions: minify-css, autoprefixer, strip-css-comments, prompt, sourcemaps, uncss, run-sequence

Open up terminal and navigate to the home directory. Make sure that the files you would like to work with are in their
respective folders (/css, /html, etc.). You can run webClean.js with the command line tool,
or you can run the gulp tasks individually.

To use the command line tool, type the following:

``` shell
node webClean.js
```

Answer yes or no to the on-screen prompts. Once all prompts have been answered, webClean.js makes the
appropriate changes to your file(s) and stores them in /dist.

If you prefer running the gulp tasks individually, you can use the following command. Just replace *name of task*
with what you'd like to run:

``` shell
gulp *name of task*
```

Below is a list of available gulp tasks, by language.

- CSS
    - uncomment-css
    - uncss-css
    - autoprefix-css
    - minify-css
    - all-css