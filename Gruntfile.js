module.exports = function(grunt) {

    const webpackConfig = require('./webpack.config');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({ watch: true }, webpackConfig)
        }
    });

    grunt.registerTask('default', ['webpack']);
    grunt.loadNpmTasks('grunt-webpack');
};