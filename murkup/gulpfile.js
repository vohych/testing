const projectFolder = "./build-app";
const sourceFolder = "./src";

const path = {

    build: {

        html: projectFolder + "/",
        css: projectFolder + "/css/",
        fonts: projectFolder + "/fonts/",
        js: projectFolder + "/js/",
        jsFolder: projectFolder + "/js/",
        img: projectFolder + "/img/",
        svg: projectFolder + "/svg/",
        tempSvg: projectFolder + "/svg/temp-file/",

    },
    src: {

        html: [sourceFolder + "/*.html", '!' + sourceFolder + "/extend.*.html"],
        css: sourceFolder + "/scss/style.*.scss",
        fonts: sourceFolder + "/fonts/*",
        js: sourceFolder + "/js/*.js",
        jsFolder: sourceFolder + "/js/extend-*/*.js",
        img: sourceFolder + "/img/*",
        svg: sourceFolder + "/svg/*",
        tempSvg: sourceFolder + "/svg/temp-file/*.*",

    },
    watch: {

        html: sourceFolder + "/*.html",
        css: sourceFolder + "/scss/style.*.scss",
        fonts: sourceFolder + "/fonts/*",
        js: sourceFolder + "/js/*.js",
        jsFolder: sourceFolder + "/js/extend-*/*.js",
        img: sourceFolder + "/img/*",
        svg: sourceFolder + "/svg/*.svg",

    },

    clean: './' + projectFolder

}

let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer');

const option = [

    queue = true,
    useFsEvents = false,
    usePolling = false,
    interval = 1,
    binaryInterval = 1,
    useFsEvents = true,
    atomic = 1,

]

function browserSync(params) {

    browsersync.init({

        server: {
            baseDir: './' + projectFolder + '/',
        },
        port: 3000,
        notify: false

    });

}

function html() {

    return src(path.src.html)
        .pipe(fileinclude())
        .pipe(dest(path.build.html, option))
        .pipe(browsersync.stream())

}

function img() {

    return src(path.src.img)

        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())

}

function js() {

    return src(path.src.js)

        .pipe(dest(path.build.js, option))
        .pipe(browsersync.stream())

}

function jsFolder() {

    return src(path.src.jsFolder)

        .pipe(dest(path.build.jsFolder, option))
        .pipe(browsersync.stream())

}

function svg() {

    return src(path.src.svg)

        .pipe(dest(path.build.svg))
        .pipe(browsersync.stream())

}

function fonts() {

    return src(path.src.fonts)

        .pipe(dest(path.build.fonts))
        .pipe(browsersync.stream())

}

function css() {

    return src(path.src.css)

        .pipe(scss({

                // outputStyle: 'compressed', // всё в одну строку
                outputStyle: 'expanded',

            })
        )
        // .pipe(autoprefixer({
        //
        //     overrideBrowserslist: ['last 4 versions'],
        //
        // }))
        .pipe(dest(path.build.css, option))
        .pipe(browsersync.stream())

}

function watchFiles() {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
}

function clean() {
    return del(path.clean)
}

let buildGlobal = gulp.series(clean, css, html, js, jsFolder, img, svg, fonts);
let build = gulp.series(gulp.parallel(css, html, js, jsFolder));
let watch = gulp.parallel(watchFiles, browserSync);

const exportVar = exports;
// exportVar.fonts = fonts;
exportVar.css = css;
exportVar.img = img;
exportVar.js = js;
exportVar.jsFolder = jsFolder;
// exportVar.svg = svg;
exportVar.html = html;
exportVar.build = build;
exportVar.buildGlobal = buildGlobal;
// exports.watch = watch;
exportVar.default = watch;