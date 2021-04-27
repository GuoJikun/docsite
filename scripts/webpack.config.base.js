const marked = require("marked");
const renderer = new marked.Renderer();

module.exports = {
    module:{
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader"
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            pedantic: true,
                            renderer
                        }
                    }
                ]
            }
          ]
    }
};
