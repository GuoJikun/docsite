const { resolve } = require("path");

module.exports = {
    output: {
        filename: "[name].bundle.js",
        path: resolve(__dirname, "dist"),
        clean: true,
    },
};
