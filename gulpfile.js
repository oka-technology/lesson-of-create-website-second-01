const gulp = require('gulp');
const sass = require('gulp-sass');
const packageImporter = require('node-sass-package-importer');

gulp.task('sass', () => (
  gulp.src('src/sass/**/*.scss')
    .pipe(sass({ 
      outputStyle: 'expanded',
      importer: packageImporter({
        extensions: ['.scss', '.css']
      })
    }))
    .pipe(gulp.dest('dist/css'))
));

gulp.task('static', () => (
  gulp.src(['src/img/**/*'], { base: 'src' })
    .pipe(gulp.dest('dist')),
  gulp.src(['src/html/**/*'])
    .pipe(gulp.dest('dist'))
));

gulp.task('watch', async () => {
  gulp.watch('src/sass/**/*.scss', gulp.task('sass'));
  gulp.watch(['src/img/**/*', 'src/html/**/*'], gulp.task('static'));
});

gulp.task('default', gulp.series(gulp.parallel('sass', 'static'), 'watch'));
