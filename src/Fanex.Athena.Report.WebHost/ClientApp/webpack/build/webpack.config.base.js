const path = require("path");
const alias = require("../configs/alias");
const pathConfig = require("../configs/path");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');

module.exports = {
    entry: {
        ...pathConfig.scriptPath,
        ...pathConfig.stylePath,
    },
    resolve: {
        alias: alias,
        extensions: [".js", ".jsx"],
    },
    output: {
        filename: "[name].chunk.js",
        chunkFilename: "js/pages/[name].[contenthash].chunk.js",
        path: path.join(pathConfig.projectRoot, "wwwroot"),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
            {
                test: /\.scss$/,
                use: [
                    MiniCssExtractPlugin.loader, // Extracts CSS to a separate file (instead of style-loader)
                    'css-loader', // Translates CSS into CommonJS
                    'sass-loader', // Compiles Sass to CSS
                ],
            },
            {
                test: /\.(jpe?g|gif|png|svg|woff|ttf|wav|mp3|woff2|eot)$/,
                type: "asset/resource",
                generator: {
                    filename: ({ filename }) => {
                        const path = filename.substring(filename.indexOf('/') + 1, filename.lastIndexOf('/'));
                        return path + '/[name][ext][query]';
                    },
                }
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css', // Name of the output CSS file
            chunkFilename: 'css/[name].chunks.css'
        }),
        new CleanWebpackPlugin(),
        new RemoveEmptyScriptsPlugin(),
    ],
    optimization: {
        splitChunks: {
            minSize: 17000,
            minRemainingSize: 0,
            maxAsyncRequests: 30,
            maxInitialRequests: 30,
            automaticNameDelimiter: "_",
            enforceSizeThreshold: 30000,
            cacheGroups: {
                commons: {
                    name: 'js/common',
                    filename: "[name].chunk.js",
                    chunks: 'initial',
                    minChunks: 2,
                    priority: -10,
                },
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -5,
                    reuseExistingChunk: true,
                    chunks: "all",
                    minChunks: 1,
                    name: "js/vendor",
                    minSize: 0,
                    filename: "[name].chunk.js",
                },
                default: false
            },
        },
    },
};
