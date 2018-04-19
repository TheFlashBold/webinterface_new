module.exports = function (grunt) {

    const webpackConfig = require('./webpack.config');

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        webpack: {
            options: {
                stats: !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
            },
            prod: webpackConfig,
            dev: Object.assign({watch: true}, webpackConfig)
        },
        cssmin: {
            target: {
                options: {
                    expand: true
                },
                files: {
                    'frontend/css/bundle.min.css': [
                        'node_modules/bootstrap/dist/css/bootstrap.min.css',
                        'node_modules/@mdi/font/css/materialdesignicons.min.css',
                        'src/css/*.css'
                    ]
                }
            }
        }
    });

    grunt.registerTask('default', ['webpack']);
    grunt.loadNpmTasks('grunt-webpack');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
};