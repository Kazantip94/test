const {src, dest, watch} = require('gulp');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const rename = require("gulp-rename");
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const minify = require('gulp-minify');
const htmlmin = require('gulp-htmlmin');
const imagemin= require('gulp-imagemin')



// Static server
function bs() {
    serveSass()
    buildCSS()
    buildJS()
    html()
    php()
    fonts()
    imgcompress()
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
    watch('./css/**/*.css');
    watch("./*.html").on('change', browserSync.reload);
    watch("./sass/**/*.sass", serveSass);
    watch("./sass/**/*.scss", serveSass);
    watch("./js/*.js").on('change', browserSync.reload);
};

function serveSass(){
    return src("./sass/*.sass","./sass/*.scss")
        .pipe(sass())
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(dest("./css"))
        .pipe(browserSync.stream());
};


function buildCSS() {
    src(['css/**.css', '!css/**.min.css'])
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(rename({
          suffix: '.min'
    }))
      .pipe(dest('dist/css/'));
 };

 function buildJS() {
    src(['js/**.js', '!js/**.min.js'])
        .pipe(minify({  
        }))
        .pipe(dest('dist/js/'));
    src('js/**.min.js').pipe(dest('dist/js/'));
    
 }
function html() {
    src('**.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
}
function php() {
    src(['**.php'])
        .pipe(dest('dist/'));
    src('phpmailer/**/**')
        .pipe(dest('dist/phpmailer/'));
}
function fonts() {
    src('fonts/**/**')
        .pipe(dest('dist/fonts'));
}
function imgcompress() {
    src('img/**/**')
        .pipe(imagemin({
            progressive: true
    }))
        .pipe(dest('dist/img/'))
    src('img/**/*.svg')
        .pipe(dest('dist/img/'))
}
exports.serve = bs;


