const {src, dest, parallel, series, watch} = require('gulp');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify-es').default;
const sass = require('gulp-sass')(require('node-sass'));
const notify = require('gulp-notify');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rev = require('gulp-rev');
const revRewrite = require('gulp-rev-rewrite');
const revDel = require('gulp-rev-delete-original');
const htmlmin = require('gulp-htmlmin');
const imagemin = require('gulp-imagemin');
const gulpif = require('gulp-if');
const fileinclude = require('gulp-file-include');
const svgSprite = require('gulp-svg-sprite');
const svgOptimize = require('gulp-svgo');
const del = require('del');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const browserSync = require('browser-sync').create();

const svgSprites = () => {//+
  return src('./src/img/to-sprite/**.svg')
    .pipe(svgOptimize())
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: "../sprite.svg"
        }
      }
    }))
    .pipe(dest('./dist/img'))
}

const clean = () => {//+
  return del(['dist/*'])
}

//sourcemap, rename, autoprefixer, cleanCSS, browser-sync +
const styles = () => {
  return src('./src/scss/main.scss')
    .pipe(sourcemaps.init()) 
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', notify.onError()))
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(autoprefixer({
      cascade: false,
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./dist/css/'))
    .pipe(browserSync.stream());
}

/*WEBPACK*/
const scripts = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'development',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
      plugins: [
        new webpack.ProvidePlugin({
          $: 'jquery',
          jQuery: 'jquery'
        }),
      ]
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Don't stop the rest of the task
		})

		.pipe(sourcemaps.init())
		.pipe(uglify().on("error", notify.onError()))
		.pipe(sourcemaps.write('.'))
		.pipe(dest('./dist/js'))
		.pipe(browserSync.stream());
}

const htmlInclude = () => {//+
  return src(['./src/index.html'])
  .pipe(fileinclude({
    prefix: '@',
    basepath: '@file'    
  }))
  .pipe(dest('./dist'))
  .pipe(browserSync.stream());
}

const imgToApp = () => {//+ 
  return src(['./src/img/**.jpg', './src/img/**.png', './src/img/**.jpeg'])
  .pipe(imagemin([imagemin.mozjpeg(), imagemin.optipng(), imagemin.svgo()]))
  .pipe(dest('./dist/img'))
}

const fonts = () => {//+
  return src(['./src/fonts/*.woff2', './src/fonts/*.woff'])
  .pipe(dest('./dist/fonts'))
}

const watchFiles = () => {//+
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  watch('./src/scss/**/*.scss', styles);
  watch('./src/index.html', htmlInclude);
  watch('./src/img/**.jpg', imgToApp);
  watch('./src/img/**.png', imgToApp);
  watch('./src/img/**.jpeg', imgToApp);
  watch('./src/img/**.svg', svgSprites);
  watch('./src/js/**/*.js', scripts);
}

exports.styles = styles;
exports.watchFiles = watchFiles;
exports.fileinclude = htmlInclude;


// Таски с Build
const stylesBuild = () => {
	return src('./src/scss/**/*.scss')
		.pipe(sass({
			outputStyle: 'expanded'
		}).on('error', notify.onError()))
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(autoprefixer({
			cascade: false,
		}))
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(dest('./dist/css/'))
}

/*WEBPACK с Build +*/
const scriptsBuild = () => {
	return src('./src/js/main.js')
		.pipe(webpackStream({
			mode: 'production',
			output: {
				filename: 'main.js',
			},
			module: {
				rules: [{
					test: /\.m?js$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env']
						}
					}
				}]
			},
		}))
		.on('error', function (err) {
			console.error('WEBPACK ERROR', err);
			this.emit('end'); // Не останавливайте выполнение остальной части задачи
		})

		//sourcemaps удалили он здесь не нужен
		.pipe(uglify().on("error", notify.onError()))
		.pipe(dest('./dist/js'))
		.pipe(browserSync.stream());
}

exports.dev = series(clean, htmlInclude, styles, scripts, fonts, imgToApp, svgSprites, watchFiles);
exports.build = series(clean, htmlInclude, stylesBuild, scriptsBuild, fonts, imgToApp, svgSprites);
