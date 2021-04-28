const { resolve, join } = require("path");
const fs = require("fs");
const marked = require("marked");

const renderer = {
    html(text) {
        return text;
    },
    blockquote(quote) {
        const target = quote.replace("<p>", `<p class="ds-blockquote">`);
        return target;
    },
};

marked.use({ renderer });

const rootPath = resolve(__dirname, "../src");
const destPath = resolve(__dirname, "../dist");

function getDirTree(path) {
    const target = [];
    const arr = fs.readdirSync(path);
    arr.forEach(element => {
        const tmpPath = join(path + "/" + element);
        const info = fs.statSync(tmpPath);
        if (info.isDirectory()) {
            const tmp = getDirTree(tmpPath);
            target.push(
                ...tmp.map(c => {
                    return `${element}/${c}`;
                })
            );
        } else if (info.isFile()) {
            target.push(element);
        }
    });
    return target;
}

const mdToHtml = html => {
    return marked(html);
};

const readFileSync = path => {
    return fs.readFileSync(path, { encoding: "utf8" });
};

const writeFileToDir = (file, dir) => {
    fs.writeFileSync(dir, file);
};

const clear = dir => {
    try {
        fs.rmdirSync(dir, { recursive: true });
        fs.mkdirSync(dir, { recursive: true });
    } catch (error) {
        throw error;
    }
};

const build = dir => {
    clear(destPath);
    const dirTree = getDirTree(dir);

    for (let value of dirTree) {
        const path = join(dir + "/" + value);
        const fileContent = readFileSync(path);
        const html = mdToHtml(fileContent);
        const tmpPath = path.replace(dir, destPath).replace(/\.md$/, ".html");
        writeFileToDir(html, tmpPath);
    }
};

console.log(build(rootPath));
