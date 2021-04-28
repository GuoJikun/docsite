const marked = require("marked");

const renderer = {
    html(html) {
        console.log(html);
        return `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                    <title>Document</title>
                </head>
                <body>
                    <div id="app">${html}</div>
                </body>
            </html>`;
    },
};

marked.use({ renderer });

const render = new marked.Renderer();

// Override function

module.exports = {
    module: {
        rules: [
            {
                test: /\.md$/,
                use: [
                    {
                        loader: "html-loader",
                        options: {
                            preprocessor: content => {
                                console.log(content);

                                return content;
                            },
                        },
                    },
                    {
                        loader: "markdown-loader",
                        options: {
                            pedantic: true,
                            headerIds: true,
                            renderer: render,
                        },
                    },
                ],
            },
        ],
    },
};
