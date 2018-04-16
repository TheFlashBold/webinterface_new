const path = require('path');

module.exports = {
    watchOptions: {
        poll: true
    },
    entry: './src/app.js',
    output: {
        path: path.resolve(__dirname, 'frontend/js'),
        filename: 'bundle.js'
    }
};