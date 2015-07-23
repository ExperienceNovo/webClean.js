webClean.js - code cleanup utility
=============================

webClean.js is a code cleanup utility built on node.js and gulp.


###Features by Language

- CSS
     - remove comments
     - remove unused css (and format)
     - autoprefix for browsers with greater than 5% market share
     - format CSS files (prettify)
     - minify css (ie8 capable)
     - concatenate css files (coming soon)

- SASS/SCSS (coming soon)

- HTML
    - format HTML files (prettify)

- JS
    - format JS files (prettify)
    - parse and format JSON files (coming soon)
    - wrap JS files (coming soon)

- PHP (coming soon)

###Using webClean.js

The dependencies below are included in this repo in /node_modules, but you do need to install both node.js and gulp
before using webClean.js.

- prerequisites: node.js, gulp
- dependencies:
    - node extensions: inquirer, rx
    - css gulp extensions: minify-css, autoprefixer, strip-css-comments, prompt, sourcemaps, uncss, run-sequence
    - js gulp extensions: jsbeautifier

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

- JS
    - format-js

- HTML
    - format-html