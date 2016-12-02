var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('default', function(){
    nodemon({
        script: 'server.js',
        ext: 'js',
        env: {
            PORT: 4000
        },
        ignore: ['./node_module/**']
    })
    .on('restart', function() {
        console.log('Server is restarting...');
    });
});