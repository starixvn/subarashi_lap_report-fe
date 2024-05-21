const { merge } = require("webpack-merge");
const webpackConfig = require("./webpack.config.base");

module.exports = merge(webpackConfig, {
    mode: "development",
    devtool: "source-map",
    watch: false,
});
