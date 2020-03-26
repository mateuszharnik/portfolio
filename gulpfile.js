const gulp = require('gulp');
const browserSync = require('browser-sync');
const scss = require('gulp-sass');
const pug = require('gulp-pug');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const clean = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const changed = require('gulp-changed');
const htmlmin = require('gulp-htmlmin');
const del = require('del');
const purgecss = require('gulp-purgecss');
const replace = require('gulp-html-replace');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const named = require('vinyl-named');

function handleError(error) {
  // eslint-disable-next-line
  console.log(error.toString());
  this.emit('end');
}

gulp.task('reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('del', (done) => {
  del(['dist']);
  done();
});

gulp.task('img', () => gulp
  .src('src/img/**/*.{jpg,jpeg,png,gif,svg}')
  .pipe(changed('dist/img'))
  .pipe(imagemin([
    imagemin.svgo({
      plugins: [
        { removeViewBox: false },
      ],
    }),
  ]))
  .pipe(gulp.dest('dist/img')));

gulp.task('babel', () => gulp
  .src(['src/js/main.js'])
  .pipe(named())
  .pipe(webpackStream({
    output: {
      filename: '[name].js',
    },
    devtool: 'source-map',
    mode: 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          libs: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'libs',
            filename: 'libs.js',
          },
        },
      },
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }],
    },
  }).on('error', handleError), webpack)
  .pipe(gulp.dest('src/bundle')));

gulp.task('js', () => gulp
  .src(['src/js/main.js'])
  .pipe(named())
  .pipe(webpackStream({
    output: {
      filename: '[name].js',
    },
    mode: 'production',
    optimization: {
      splitChunks: {
        cacheGroups: {
          libs: {
            test: /[\\/]node_modules[\\/]/,
            chunks: 'all',
            name: 'libs',
            filename: 'libs.js',
          },
        },
      },
    },
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      }],
    },
  }).on('error', handleError), webpack)
  .pipe(gulp.dest('dist/js')));

gulp.task('css', () => gulp
  .src('dist/css/*.css')
  .pipe(clean({
    level: 2,
  }))
  .pipe(gulp.dest('dist/css')));

gulp.task('purage', () => gulp
  .src('src/css/*.css')
  .pipe(
    purgecss({
      content: ['dist/*.html', 'dist/js/*.js'],
    }),
  )
  .pipe(gulp.dest('dist/css')));

gulp.task('html', () => gulp
  .src('src/*.html')
  .pipe(
    replace({
      libs: {
        src: 'js',
        tpl: '<script type="text/javascript" src="%s/libs.js"></script>',
      },
      css: {
        src: 'css',
        tpl: '<link rel="stylesheet" type="text/css" href="%s/style.css">',
      },
      main: {
        src: 'js',
        tpl: '<script type="text/javascript" src="%s/main.js"></script>',
      },
    }),
  )
  .pipe(
    htmlmin({
      sortAttributes: true,
      sortClassName: true,
      collapseWhitespace: true,
      conservativeCollapse: false,
      removeScriptTypeAttributes: false,
      removeStyleLinkTypeAttributes: false,
      minifyJS: true,
    }),
  )
  .pipe(gulp.dest('dist/')));

gulp.task('pug', () => gulp
  .src('src/html/*.pug')
  .pipe(
    pug({
      pretty: true,
    }).on('error', handleError),
  )
  .pipe(gulp.dest('src')));

gulp.task('scss', () => gulp
  .src('src/scss/*.scss')
  .pipe(sourcemaps.init())
  .pipe(scss().on('error', scss.logError))
  .pipe(
    autoprefixer({
      overrideBrowserslist: ['last 3 versions'],
    }),
  )
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('src/css'))
  .pipe(browserSync.stream()));

gulp.task('build-scss', () => gulp
  .src('src/scss/*.scss')
  .pipe(scss().on('error', scss.logError))
  .pipe(
    autoprefixer({
      overrideBrowserslist: ['last 3 versions'],
    }),
  )
  .pipe(gulp.dest('src/css')));

gulp.task('serve', () => {
  browserSync({
    server: 'src',
  });

  gulp.watch('src/scss/**/**/*.scss', gulp.series(['scss']));
  gulp.watch('src/*.html', gulp.series(['reload']));
  gulp.watch('src/bundle/*.js', gulp.series(['reload']));
  gulp.watch('src/js/**/**/*.js', gulp.series(['babel']));
  gulp.watch('src/html/**/**/*.pug', gulp.series(['pug']));
});

gulp.task('build', gulp.series(['build-scss', 'html', 'js', 'purage', 'img', 'css']));

gulp.task('default', gulp.series(['babel', 'scss', 'pug'], ['serve']));
