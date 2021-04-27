const { resolve } = require("path");
const webpackMerge = require('webpack-merge');

const baseConfig = require('./webpack.config.base.js');

module.exports = webpackMerge(baseConfig,{
    output: {
        filename: "[name].bundle.js",
        path: resolve(__dirname, "dist"),
        clean: true,
    },
});
