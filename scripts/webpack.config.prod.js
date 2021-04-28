const { resolve } = require("path");
const { merge } = require("webpack-merge");
// const HtmlWebpackPlugin = require("html-webpack-plugin");

const baseConfig = require("./webpack.config.base.js");

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        filename: "[name].html",
        path: resolve(__dirname, "../dist"),
        clean: true,
    },
    entry: {
        index: resolve(__dirname, "../src/index.md"),
    },
    target: false,
    // plugins: [
    //     new HtmlWebpackPlugin({
    //         template: resolve(__dirname, "../src/index.html"),
    //     }),
    // ],
});
