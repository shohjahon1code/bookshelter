const gulp = require("gulp");
const pug = require("gulp-pug");
const browserSync = require("browser-sync");
const sourcemaps = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const ggcmq = require("gulp-group-css-media-queries");
const prefixer = require("gulp-autoprefixer");
const webp = require("gulp-webp");
const ttf2woff2 = require("gulp-ttf2woff2");
const ts = require("gulp-typescript");

const html = () =>
  gulp
    .src("./src/*.{pug,jade}")
    .pipe(pug())
    .pipe(gulp.dest("./dist"))
    .on("end", browserSync.reload);

const css = () =>
  gulp
    .src("./src/scss/*.scss")
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: "compressed" }))
    .pipe(prefixer({ cascade: false }))
    .pipe(ggcmq())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./dist/styles/"))
    .on("end", browserSync.reload);

const img = () =>
  gulp
    .src("./src/images/**/*.{gif,jpeg.jpg,jfif,png,webp,svg}")
    .pipe(webp())
    .pipe(gulp.dest("./dist/images/"))
    .on("end", browserSync.reload);

const statics = () =>
  gulp
    .src("./src/static/*.*")
    .pipe(gulp.dest("./dist/static"))
    .on("end", browserSync.reload);

const font = () =>
  gulp
    .src("./src/fonts/**/*.ttf")
    .pipe(ttf2woff2())
    .pipe(gulp.dest("./dist/fonts/"))
    .on("end", browserSync.reload);

const script = () =>
  gulp
    .src("./src/scripts/*.{js,ts}")
    .pipe(
      ts({
        target: "ES5",
        removeComments: true,
        allowJs: true,
      })
    )
    .pipe(gulp.dest("./dist/scripts"))
    .on("end", browserSync.reload);

const server = () =>
  browserSync.init({
    server: {
      baseDir: "./dist/",
    },
  });

const watch = () => {
  gulp.watch(["./src/**/*.{pug,jade}", "./src/components/*.{pug,jade}"], html);
  gulp.watch("./src/pages/**/*.{pug,jade}", html);
  gulp.watch("./src/scss/**/*.scss", css);
  gulp.watch("./src/scripts/**/*.{js,ts}", script);
  gulp.watch("./src/static/**/*.*", statics);
  gulp.watch("./src/images/**/*.*}", img);
  gulp.watch("./src/fonts/**/*.*", font);
};

gulp.task(
  "default",
  gulp.parallel(html, css, script, statics, img, font, server, watch)
);
