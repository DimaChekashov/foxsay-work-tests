const { src, dest, watch, series, parallel } = require("gulp");
const htmlValidator = require("gulp-html");
const dartSass = require("sass");
const gulpScss = require("gulp-sass");
const sass = gulpScss(dartSass);
const concat = require("gulp-concat");
const uglify = require("gulp-uglify-es").default;
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const del = require("del");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const cache = require("gulp-cache");
const autoprefixer = require("gulp-autoprefixer");
const browserSync = require("browser-sync").create();

function html() {
    return src("src/index.html").pipe(htmlValidator()).pipe(dest("build/"));
}

function scss() {
    return src("src/scss/main.scss")
        .pipe(sass())
        .pipe(
            autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], {
                cascade: true,
            })
        )
        .pipe(dest("build/css"));
}

function cssMin() {
    return src("build/css/main.css")
        .pipe(cssnano({ zindex: false }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/css"));
}

function moveJs() {
    return src("src/js/**/*").pipe(dest("build/js"));
}

function jsMin() {
    return src("src/js/**/*")
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/js"));
}

function images() {
    return src("src/images/**/*")
        .pipe(
            cache(
                imagemin({
                    interlaced: true,
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [pngquant()],
                })
            )
        )
        .pipe(dest("build/images"));
}

function clean() {
    return del("build");
}

function fonts() {
    return src("src/fonts/**/*").pipe(dest("build/fonts"));
}

function favicon() {
    return src("src/*.ico").pipe(dest("build"));
}

// Production Build
exports.build = series(
    clean,
    images,
    scss,
    cssMin,
    moveJs,
    jsMin,
    html,
    fonts,
    favicon
);

/* Dev part */

function reloadFonts() {
    return src("src/fonts/**/*")
        .pipe(dest("build/fonts"))
        .pipe(browserSync.stream());
}

function reloadJs() {
    return src("src/js/**/*")
        .pipe(uglify())
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/js"))
        .pipe(browserSync.stream());
}

function reloadImages() {
    return src("src/images/**/*")
        .pipe(
            cache(
                imagemin({
                    interlaced: true,
                    progressive: true,
                    svgoPlugins: [{ removeViewBox: false }],
                    use: [pngquant()],
                })
            )
        )
        .pipe(dest("build/images"))
        .pipe(browserSync.stream());
}

function reloadHtml() {
    return src("src/index.html")
        .pipe(htmlValidator())
        .pipe(dest("build/"))
        .pipe(browserSync.stream());
}

function reloadCss() {
    return src("src/scss/main.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(dest("./build/css/"))
        .pipe(browserSync.stream());
}

function reloadCssMin() {
    return src("build/css/main.css")
        .pipe(cssnano({ zindex: false }))
        .pipe(rename({ suffix: ".min" }))
        .pipe(dest("build/css"))
        .pipe(browserSync.stream());
}

function browsersync() {
    browserSync.init({
        server: { baseDir: "./build" },
        notify: false,
        online: true,
    });
}

function watchDev() {
    watch("./src/**/*.scss", series(reloadCss));
    watch("./src/**/*.html", series(reloadHtml));
    watch("./src/images/**/*", series(reloadImages));
    watch("./src/js/**/*", series(reloadJs));
    watch("./src/fonts/**/*", series(reloadFonts));
}

exports.watch = parallel(browsersync, watchDev);
