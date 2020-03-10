var gulp = require("gulp");
var favicons = require("gulp-favicons");
var fs = require("fs");

var packageJSON = JSON.parse(fs.readFileSync("./package.json"));

function defaultTask(cb) {
  gulp
    .src("./src/assets/dockicon.svg")
    .pipe(
      favicons({
        appName: packageJSON.name,
        appShortName: packageJSON.name,
        appDescription: packageJSON.description,
        developerName: packageJSON.author.name,
        developerURL: packageJSON.author.url,
        background: "#020307",
        path: "favicons/",
        url: packageJSON.homepage,
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/?homescreen=1",
        version: 1.0,
        logging: false,
        html: "index.html",
        pipeHTML: true,
        replace: true
      })
    ).on('error', (err) => { console.error('ERROR', err) })
    .pipe(gulp.dest("./dest"));
    cb();
}
exports.default = defaultTask
