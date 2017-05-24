import gulp from "gulp";
import path from "path";
import rimraf from "rimraf";
import { exec } from "child_process";
import webpackConfig from "./webpack.config";
import webpack from "webpack";
import WebpackDevServer from "webpack-dev-server";

const $ = require("gulp-load-plugins")();

// --------------------------------
// Server

gulp.task("server:clean", cb => {
  rimraf("./build", () => cb());
});

gulp.task("server:build",
  gulp.series(
    "server:clean",
    compileServer)
);

gulp.task(
  "server:watch",
  gulp.series(
    "server:build",
    watchServer)
);

gulp.task(
  "server:lint",
  lint
);

gulp.task(
  "server:dev",
  gulp.series(
    lint,
    "server:build",
    gulp.parallel(
      watchServer,
      runServer,
    )
  )
);

gulp.task(
  "server:tests",
  gulp.series(
    "server:build",
    testServer
  )
);

gulp.task(
  "server:tests:watch",
  gulp.series(
    "server:build",
    gulp.parallel(
      watchServer,
      runServerTests
    )
  )
);

function lint () {
  return gulp.src(["**/*.js", "!node_modules/**", "!build/**"])
    .pipe($.eslint())
    .pipe($.eslint.format());
}

function runServer () {
  return $.nodemon({
    script: "./server.js",
    watch: "build",
    ignore: ["**/__tests"]
  });
}

function watchServer () {
  return gulp
    .watch("./src/server/**/*.js", gulp.series(lint, compileServer))
    .on("error", () => {});
}

function compileServer () {
  return gulp.src("./src/server/**/*.js")
    .pipe($.changed("./build"))
    .pipe($.sourcemaps.init())
    .pipe($.babel())
    .pipe($.sourcemaps.write(".", { sourceRoot: path.join(__dirname, "src", "server") }))
    .pipe(gulp.dest("./build"))
    .on("error", () => {});

}

function testServer (cb) {
  exec("node ./tests.js", (err, stdout, stderr) => {
    console.log(stdout);
    console.log(stderr);

    if (err) {
      cb(new $.util.PluginError("testServer", "Tests failed"));
    } else {
      cb();
    }
  });
}

function runServerTests () {
  return $.nodemon({
    script: "./tests.js",
    watch: "build"
  });
}

// --------------------------------
// Client

const consoleStats = {
  color: true,
  exclude: ["node_modules"],
  chunks: false,
  assets: false,
  timings: true,
  modules: false,
  hash: false,
  version: false
};

gulp.task("client:clean", cb => {
  rimraf("./public/build", () => cb());
});

gulp.task(
  "client:build",
  gulp.series(
    "client:clean",
    buildClient
  )
);

gulp.task(
  "client:dev",
  gulp.series(
    "client:clean",
    watchClient
  )
);

function buildClient (cb) {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      cb(err);
      return;
    }

    console.log(stats.toString(consoleStats));
    cb();
  });
}

function watchClient () {
  const compiler = webpack(webpackConfig);
  const server = new WebpackDevServer(compiler, {
    publicPath: "/build",
    hot: true,
    stats: consoleStats,
    headers: { 'Access-Control-Allow-Origin': '*' }
  });

  server.listen(8080, () => {});
}

// --------------------------------
// Run tasks

gulp.task("dev", gulp.parallel("server:dev", "client:dev"));
gulp.task("build", gulp.parallel("server:build", "client:build"));
