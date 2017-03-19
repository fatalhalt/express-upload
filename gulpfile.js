var gulp = require('gulp');
var paths = {
    bower: './bower_components',
    npm: './node_modules',
    frontend: './static'
};

gulp.task('copy', function () {
    return gulp.src(paths.bower + '/jquery/dist/jquery.min.js')
      .pipe(gulp.dest(paths.frontend + '/js'));
});
gulp.task('copy2', function () {
    return gulp.src(paths.npm + '/vue/dist/vue.min.js')
      .pipe(gulp.dest(paths.frontend + '/js'));
});

gulp.task('default', ['copy','copy2']);

