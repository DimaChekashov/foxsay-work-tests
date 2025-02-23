const PugPlugin = require('pug-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const path = require('path');

module.exports = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        clean: true
    },
    devServer: {
        static: './dist',
        port: 3000,
        open: true
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
    ],
};