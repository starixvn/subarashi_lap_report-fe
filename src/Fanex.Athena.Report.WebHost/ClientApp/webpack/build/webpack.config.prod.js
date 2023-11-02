const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config.base");
const TerserPlugin = require("terser-webpack-plugin");

module.exports = merge(webpackConfig, {
    mode: "production",
    watch: false,
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    compress: {
                        drop_console: true,
                    },
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
            }),
        ],
    },
});
