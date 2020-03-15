const gulp = require('gulp');
const del = require('del');
const favicons = require('gulp-favicons');
const inject = require('gulp-inject');
const fs = require('fs');

const packageJSON = JSON.parse(fs.readFileSync('./package.json'));

function defaultTask(cb) {
  del('./public/index.html');
  gulp
    .src('./src/assets/dockicon.svg')
    .pipe(
      favicons({
        appName: packageJSON.name,
        appShortName: packageJSON.name,
        appDescription: packageJSON.description,
        developerName: packageJSON.author.name,
        developerURL: packageJSON.author.url,
        version: packageJSON.version,
        background: '#020307',
        path: 'favicons/',
        url: packageJSON.homepage,
        display: 'standalone',
        orientation: 'any',
        scope: '/',
        start_url: '/index.html',
        logging: true,
        html: 'favicon.html',
        pipeHTML: true,
        replace: true,
      }),
    )
    .on('error', (err) => {
      console.error('ERROR', err);
    })
    .pipe(gulp.dest('./public'));

  gulp
    .src('./src/assets/index.html')
    .pipe(
      inject(gulp.src(['./public/favicon.html']), {
        starttag: '<!-- inject:head:{{ext}} -->',
        transform(filePath, file) {
          return file.contents.toString('utf8'); // return file contents as string
        },
      }),
    )
    .pipe(gulp.dest('./public'));
  cb();
}

exports.default = defaultTask;
