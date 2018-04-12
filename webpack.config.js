const path = require('path');

module.exports = {
    watchOptions: {
        poll: true
    },
    entry: './src/app.js',
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '../img/[name]_[hash:7].[ext]',
                        }
                    },
                    {
                        loader: 'image-webpack-loader',
                        options: {
                            bypassOnDebug: true
                        },
                    }
                ]
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: {
                    loader: "url-loader",
                    options: {
                        limit: 50000,
                        name: '../fonts/[name].[ext]'
                    },
                },
            }
        ]
    },
    output: {
        path: path.resolve(__dirname, 'frontend/js'),
        filename: 'bundle.js'
    }
};