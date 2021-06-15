const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const HtmlWebpackPugPlugin = require("html-webpack-pug-plugin");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const filename = (ext) =>
    isDev ? `[name].${ext}` : `[name].[contenthash].${ext}`;

const optimization = () => {
    const configObj = {
        splitChunks: {
            chunks: "all",
        },
    };

    if (isProd) {
        configObj.minimizer = [
            new OptimizeCssAssetWebpackPlugin(),
            new TerserWebpackPlugin(),
        ];
    }

    return configObj;
};

const plugins = () => {
    const basePlugins = [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname, "src/index.pug"),
            filename: "index.html",
            minify: {
                collapseWhitespace: isProd,
            },
        }),
        new HtmlWebpackPugPlugin({
            adjustIndent: true,
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: `css/${filename("css")}`,
        }),
        new CopyWebpackPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, "src/assets"),
                    to: path.resolve(__dirname, "build"),
                },
                {
                    from: path.resolve(__dirname, "src/images"),
                    to: path.resolve(__dirname, "build/images"),
                },
            ],
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
    ];


    return basePlugins;
};

module.exports = {
    context: path.resolve(__dirname, "src"),
    mode: "development",
    entry: "./js/main.js",
    output: {
        filename: `js/${filename("js")}`,
        path: path.resolve(__dirname, "build"),
        publicPath: "",
    },
    devServer: {
        historyApiFallback: true,
        contentBase: path.resolve(__dirname, "app"),
        open: true,
        compress: true,
        hot: true,
        port: 3000,
    },
    optimization: optimization(),
    plugins: plugins(),
    devtool: isProd ? false : "source-map",
    module: {
        rules: [
            {
                test: /\.pug$/,
                use: [
                    {
                        loader: "simple-pug-loader",
                        options: {
                            pretty: true,
                        },
                    },
                ],
            },
            {
                test: /\.css$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            hmr: isDev,
                        },
                    },
                    "css-loader",
                ],
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: (resoursePath, context) => {
                                return (
                                    path.relative(
                                        path.dirname(resoursePath),
                                        context
                                    ) + "/"
                                );
                            },
                        },
                    },
                    "css-loader",
                    "postcss-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.(js)$/i,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(?:|gif|png|jpg|jpeg|svg)$/,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: "[path][name].[ext]?[contenthash]",
                        },
                    },
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot)$/i,
                use: [
                    {
                        loader: "file-loader",
                        options: {
                            name: `fonts/${filename("ext")}`,
                        },
                    },
                ],
            },
        ],
    },
};
