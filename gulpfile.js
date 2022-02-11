const gulp = require("gulp");
const pug = require("gulp-pug");
const sass = require("gulp-sass")(require("sass"));
const babel = require("gulp-babel");
const browserSync = require("browser-sync").create();
const autoprefixer = require("gulp-autoprefixer");
const imagemin = require('gulp-imagemin')


const gulp_files = ["pug", "scss", "js", "image"];

const pug_files = "./src/views/**/*.pug";
const scss_files = "./src/scss/**/*.scss";
const js_files = "./src/js/**/*.js";

gulp.task("serve", async function () {
  browserSync.init({
    server: "./dist",
  });

  gulp.watch(
    [pug_files, scss_files, js_files],
    gulp.series("pug", "scss", "js")
  );
  gulp.watch("dist/**/*").on("change", browserSync.reload);
});

gulp.task("pug", async () => {
  return gulp.src(pug_files).pipe(pug({})).pipe(gulp.dest("./dist"));
});

gulp.task("image", async () => {
  gulp.src("./src/img/**/*").pipe(imagemin()).pipe(gulp.dest("./dist/img"));
});

gulp.task("scss", async () => {
  return gulp
    .src(scss_files)
    .pipe(sass().on("error", sass.logError))
    .pipe(
      autoprefixer({
        cascade: false,
      })
    )
    .pipe(gulp.dest("./dist/css"));
});

gulp.task("js", async () =>
  gulp
    .src(js_files)
    .pipe(
      babel({
        presets: ["@babel/env"],
        ignore: [ "./src/js/particles.min.js" ]
      })
    )
    .pipe(gulp.dest("./dist/js"))
);

gulp.task("default", gulp.series(gulp_files, "serve"));
