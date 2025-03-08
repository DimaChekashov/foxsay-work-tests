const { src, dest, watch, series } = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const concat = require("gulp-concat");
const uglify = require("gulp-uglify");
const cssnano = require("gulp-cssnano");
const rename = require("gulp-rename");
const del = require("del");
const imagemin = require("gulp-imagemin");
const pngquant = require("imagemin-pngquant");
const cache = require("gulp-cache");
const autoprefixer = require("gulp-autoprefixer");
const gulpPug = require("gulp-pug");
const browserSync = require("browser-sync").create();
const babel = require('gulp-babel');
const gulpIf = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const terser = require('gulp-terser');

const paths = {
    src: {
        scss: 'src/scss/main.scss',
        js: 'src/js/**/*',
        images: 'src/images/**/*',
        pug: 'src/**/*.pug',
        fonts: 'src/fonts/**/*',
        favicon: 'src/*.ico',
    },
    build: {
        css: 'dist/css',
        js: 'dist/js',
        images: 'dist/images',
        fonts: 'dist/fonts',
        libs: 'dist/libs',
    },
};

const html = {
    pug: ({ isReload = false }) => {
        return src(paths.pug)
            .pipe(gulpPug({pretty: true}))
            .pipe(dest("dist"))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
};

const styles = {
    scss: ({ isReload = false }) => {
        return src(paths.src.scss)
            .pipe(sass().on("error", sass.logError))
            .pipe(gulpIf(!isReload, autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })))
            .pipe(dest(paths.build.css))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
    min: ({ isReload = false }) => {
        return src("dist/css/main.css")
            .pipe(cleanCSS())
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(paths.build.css))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
    libsMin: () => {
        return src([
            "./node_modules/normalize.css/normalize.css",
            "./node_modules/owl.carousel/dist/assets/owl.carousel.min.css",
            "./node_modules/animate.css/animate.css",
        ])
            .pipe(concat("css-libs.min.css"))
            .pipe(cleanCSS())
            .pipe(dest(paths.build.libs));
    }
}

const scripts = {
    move: () => src(paths.src.js).pipe(dest(paths.build.js)),
    min: ({ isReload = false }) => {
        return src(paths.src.js)
            .pipe(babel({ presets: ['@babel/preset-env'] }))
            .pipe(terser())
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(paths.build.js))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
    libsMin: () => {
        return src([
            "./node_modules/jquery/dist/jquery.min.js",
            "./node_modules/owl.carousel/dist/owl.carousel.min.js",
        ])
            .pipe(concat("js-libs.min.js"))
            .pipe(babel({ presets: ['@babel/preset-env'] }))
            .pipe(terser())
            .pipe(dest(paths.build.libs));
    }
}

const assets = {
    clean: () => del("dist"),
    favicon: () => src(paths.src.favicon).pipe(dest("dist")),
    images: ({ isReload = false }) => {
        return src(paths.src.images)
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
            .pipe(dest(paths.build.images))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
    fonts: ({isReload = false}) => {
        return src(paths.src.fonts)
            .pipe(dest(paths.build.fonts))
            .pipe(gulpIf(isReload, browserSync.stream()));
    }
}

exports.build = series(
    assets.clean,
    assets.images,
    styles.libsMin,
    styles.scss,
    styles.min,
    scripts.libsMin,
    scripts.move,
    scripts.min,
    html.pug,
    assets.fonts,
    assets.favicon
);

exports.watch = () => {
    browserSync.init({
        server: { baseDir: `./${paths.build}` },
        notify: false,
        online: true,
    });

    watch("./src/scss/**/*.scss", () => styles.scss({isReload: true}));
    watch("./src/**/*.pug", () => html.pug({isReload: true}));
    watch("./src/images/**/*", () => assets.images({isReload: true}));
    watch("./src/js/**/*.js", () => scripts.min({isReload: true}));
    watch("./src/fonts/**/*", () => assets.fonts({isReload: true}));
}

exports.clearCache = () => cache.clearAll();