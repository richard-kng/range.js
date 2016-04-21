var req     = require('rekuire'),
    project = req('project'),
    path    = project.path,
    sources = project.sources,

    gulp    = require('gulp'),
    debug   = require('gulp-debug'),

    stream  = require('event-stream'),
    change  = require('gulp-change'),
    inject  = require('gulp-inject'),
    mocha   = require('gulp-mocha');

const DEFAULT_INJECT_PARAMS = {
          starttag   : '/***** src',
          endtag     : ' *****/',
          removeTags : true,
          transform  : function(path, file) {
              return file.contents.toString('utf8');
          }
      },
      DEFAULT_IND_INJECT_PARAMS = {
          starttag   : '/***** src',
          endtag     : ' *****/',
          removeTags : true,
          transform  : function(path, file) {
              return addIndent(file.contents.toString('utf8'), '    ');
          }
      };

function addIndent(source, indent) {
    var lines   = source.split(/\r?\n/g),
        content = '',
        line;

    indent = typeof indent === 'string' ? indent : ''; // do not add additional indent by default

    for (var i = 0, len = lines.length; i < len; ++i) {
        line = lines[i];

        if (line !== '') {
            line = indent + line;
        }

        content += line + '\n';
    }

    return content;
}

gulp.task('default', function() {
    /*
    return stream
        .merge(prepareSource())
        .pipe(debug());
        */

    return stream
        .merge(prepareSource())
        .pipe(change(function(content, done) {
            getWrapper(WRAPPER_JQUERY, function(wrapper) {
                //console.log(wrapper);
                //console.log(injectSource(wrapper, content));
                //done(null, wrapper);

                console.log(content);

                done(null, injectSource(wrapper, content));
            });
        }))
        .pipe(gulp.dest(path.build.root));
});

function prepareSource() {
    return gulp
        .src(path.src + '/**/range.js')
        .pipe(change(function(content) {
            // delete placeholder lines
            var pattern = /\/\/\s*=+\s*[=\s\w\('\)\.,\+;]*\/\/\s*=+/ig;
            return content.replace(pattern, '');
        }));
}

const WRAPPER_NODE   = 1,
      WRAPPER_UMD    = 2,
      WRAPPER_JQUERY = 3;

function getWrapper(wrapperType, callback) {
    var src;

    switch (wrapperType) {
        case WRAPPER_NODE:
            src = '/**/node.js';
            break;
        case WRAPPER_UMD:
            src = '/**/umd.js';
            break;
        case WRAPPER_JQUERY:
            src = '/**/jquery.js';
            break;
    }

    gulp.src(path.src + src)
        .pipe(change(function(content) {
            callback(content);
        }));
}

function injectSource(wrapper, source) {
    var pattern     = /([ ]+)\/\/[*\s\w\.]+[\/]+/i,
        indentation = '',
        matches;

    matches = wrapper.match(pattern);

    if (typeof matches[1] === 'string') {
        indentation = matches[1];
    }

    source = addIndent(source, indentation);

    return wrapper.replace(pattern, source);
}

gulp.task('compile', function() {
    return gulp
        .src(sources.node)
        .pipe(inject(gulp.src(sources.range), DEFAULT_INJECT_PARAMS))
        .pipe(gulp.dest(path.build.test));
});

gulp.task('compile-jquery', function() {
    return gulp
        .src(sources.jquery)
        .pipe(inject(gulp.src(sources.range), DEFAULT_IND_INJECT_PARAMS))
        .pipe(gulp.dest(path.build.test));
});

gulp.task('test', function() {
    return gulp
        .src(path.tests, {read : false})
        .pipe(mocha({ui : 'exports'}));
});
