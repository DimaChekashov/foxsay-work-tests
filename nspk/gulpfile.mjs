import gulp from "gulp";
import gulpSass from 'gulp-sass';
import * as dartSass from 'sass';
import concat from "gulp-concat";
import rename from "gulp-rename";
import del from "del";
import imagemin from "gulp-imagemin";
import imageminWebp from "imagemin-webp";
import imageminAvif from "imagemin-avif";
import pngquant from "imagemin-pngquant";
import cache from "gulp-cache";
import autoprefixer from "gulp-autoprefixer";
import gulpPug from "gulp-pug";
import babel from 'gulp-babel';
import gulpIf from 'gulp-if';
import cleanCSS from 'gulp-clean-css';
import terser from 'gulp-terser';
import sourcemaps from 'gulp-sourcemaps';
import browserSyncPackage from "browser-sync";
import eslint from "gulp-eslint";
import extReplace from "gulp-ext-replace";
import purgecss from 'gulp-purgecss';

const { src, dest, watch, series } = gulp;
const sass = gulpSass(dartSass);
const browserSync = browserSyncPackage.create(); 

const paths = {
    src: {
        scss: 'src/scss/main.scss',
        js: 'src/js/main.js',
        images: 'src/assets/images/**/*.{jpg,png,svg,gif}',
        imagesConvert: 'src/assets/images/**/*.{jpg,png}',
        pug: 'src/**/*.pug',
        fonts: 'src/assets/fonts/**/*',
        favicon: 'src/favicon/**/*',
    },
    build: {
        css: 'dist/css',
        js: 'dist/js',
        images: 'dist/images',
        fonts: 'dist/fonts',
        libs: 'dist/libs',
        favicon: 'dist/favicon',
        html: 'dist',
    },
};

const html = {
    pug: ({ isReload = false }) => {
        return src(paths.src.pug)
            .pipe(gulpPug({pretty: true}))
            .pipe(dest(paths.build.html))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
};

const styles = {
    scss: ({ isReload = false }) => {
        return src(paths.src.scss)
            .pipe(sourcemaps.init())
            .pipe(sass().on("error", sass.logError))
            .pipe(gulpIf(!isReload, autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true })))
            .pipe(sourcemaps.write('.'))
            .pipe(dest(paths.build.css))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
    min: () => {
        return src("dist/css/main.css")
            .pipe(sourcemaps.init({ loadMaps: true }))
            .pipe(cleanCSS())
            .pipe(sourcemaps.write('.'))
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(paths.build.css));
    },
    libsMin: () => {
        return src([
            "./node_modules/normalize.css/normalize.css",
            "./node_modules/owl.carousel/dist/assets/owl.carousel.min.css",
            "./node_modules/animate.css/animate.css",
        ])
            .pipe(concat("css-libs.min.css"))
            .pipe(autoprefixer(["last 15 versions", "> 1%", "ie 8", "ie 7"], { cascade: true }))
            .pipe(purgecss({
                content: ["dist/**/*.html", "dist/**/*.js"]
            }))
            .pipe(cleanCSS())
            .pipe(dest(paths.build.libs));
    }
}

const scripts = {
    js: ({ isReload = false }) => {
        return src(paths.src.js)
            .pipe(dest(paths.build.js))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
    min: () => {
        return src("dist/js/main.js")
            .pipe(sourcemaps.init())
            .pipe(babel({ presets: ['@babel/preset-env'] }))
            .pipe(terser())
            .pipe(sourcemaps.write('.'))
            .pipe(rename({ suffix: ".min" }))
            .pipe(dest(paths.build.js));
    },
    libsMin: () => {
        return src([
            "./node_modules/jquery/dist/jquery.min.js",
            "./node_modules/owl.carousel/dist/owl.carousel.min.js",
        ])
            .pipe(concat("js-libs.min.js"))
            .pipe(babel({ presets: ['@babel/preset-env'] }))
            .pipe(terser({
                compress: true,
                mangle: true,
                keep_fnames: false,
            }))
            .pipe(dest(paths.build.libs));
    },
    lint: () => {
        return gulp
            .src(['src/**/*.js','!node_modules/**'])
            .pipe(eslint({ configFile: ".eslintrc" }))
            .pipe(eslint.format())
            .pipe(eslint.failAfterError());
    }
}

const assets = {
    clearCache: () => cache.clearAll(),
    clean: () => del(paths.build.html),
    favicon: () => src(paths.src.favicon).pipe(dest(paths.build.favicon)),
    images: ({ isReload = false }) => {
        return src(paths.src.images)
            .pipe(
                cache(
                    imagemin([
                        imagemin.mozjpeg({ quality: 80 }),
                        imagemin.optipng({ optimizationLevel: 3 }),
                        imagemin.svgo(
                            { plugins: [
                                { removeViewBox: false },
                                { cleanupIDs: false },
                            ] }
                        ),
                        pngquant({ quality: [0.6, 0.8] }),
                    ])
                )
            )
            .pipe(dest(paths.build.images))
            .pipe(gulpIf(isReload, browserSync.stream()));
    },
    imagesConvert: ({ isReload = false }) => {
        return src(paths.src.imagesConvert)
            .pipe(
                cache(
                    imagemin([
                        imageminWebp({ quality: 75 }),
                    ])
                )
            )
            .pipe(extReplace('.webp'))
            .pipe(dest(paths.build.images))
            .pipe(src(paths.src.imagesConvert))
            .pipe(
                cache(
                    imagemin([
                        imageminAvif({ quality: 50 }),
                    ])
                )
            )
            .pipe(extReplace('.avif'))
            .pipe(dest(paths.build.images))
            .pipe(gulpIf(isReload, browserSync.stream()))
    },
    fonts: ({isReload = false}) => {
        return src(paths.src.fonts)
            .pipe(dest(paths.build.fonts))
            .pipe(gulpIf(isReload, browserSync.stream()));
    }
}

export const build = series(
    scripts.lint,
    assets.clearCache,
    assets.clean,
    assets.images,
    assets.imagesConvert,
    assets.fonts,
    assets.favicon,
    styles.libsMin,
    styles.scss,
    styles.min,
    scripts.libsMin,
    scripts.js,
    scripts.min,
    html.pug,
);

export const watchTask = () => {
    browserSync.init({
        server: { baseDir: `dist` },
        notify: false,
        online: true,
    });

    watch("./src/**/*.pug", () => html.pug({isReload: true}));
    watch("./src/scss/**/*.scss", () => styles.scss({isReload: true}));
    watch("./src/js/**/*.js", series(() => scripts.js({isReload: true}), scripts.lint));
    watch("./src/assets/images/**/*", series(() => assets.images({isReload: true}), () => assets.imagesConvert({isReload: true})));
    watch("./src/assets/fonts/**/*", () => assets.fonts({isReload: true}));
}
