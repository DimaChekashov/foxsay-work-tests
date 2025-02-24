const PugPlugin = require('pug-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin');
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        static: path.resolve(__dirname, 'dist'),
        port: 3000,
        open: true,
        hot: true,
        liveReload: true,
        watchFiles: ['src/**/*', 'index.pug', 'main.js'],
    },
    module: {
        rules: [
            {
                test: /\.pug$/,
                loader: PugPlugin.loader,
            },
            {
                test: /\.(sa|sc|c)ss$/,
                use: [
                    'css-loader',
                    "sass-loader"
                ]
            },
            {
              test: /\.(png|svg|jpg|jpeg|gif)$/i,
              type: 'asset/resource',
              generator: {
                filename: 'images/[name][ext]',
              },
            },
            {
              test: /\.(woff|woff2|eot|ttf|otf)$/i,
              type: 'asset/resource',
            },
            {
                test: /\.ico$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]',
                },
            },
        ],
    },
    plugins: [
        new PugPlugin({
            entry: {
                index: 'src/index.pug',
            },
            js: {
                filename: 'js/main.js',
                inline: false,
            },
            css: {
                filename: 'styles/main.css',
                inline: false,
            },
        }),
        new CopyPlugin({
            patterns: [
                { 
                    from: "src/favicon.ico", 
                    to: "favicon.ico" 
                },
            ],
        }),
        new ImageMinimizerPlugin({
            minimizer: {
                implementation: ImageMinimizerPlugin.imageminMinify,
                options: {
                    plugins: [
                        ['gifsicle', { interlaced: true }],
                        ['mozjpeg', { quality: 80 }],
                        ['pngquant', { quality: [0.6, 0.8] }],
                        [
                            'svgo',
                            {
                                plugins: [
                                    {
                                        name: 'preset-default',
                                        params: {
                                            overrides: {
                                                removeViewBox: false,
                                            },
                                        },
                                    },
                                ],
                            },
                        ],
                    ],
                },
            },
        }),
    ],
};