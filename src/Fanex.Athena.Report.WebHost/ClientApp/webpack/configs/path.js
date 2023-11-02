const path = require("path");

const projectRoot = path.resolve(__dirname, "../../../");
const jsPath = 'js';
const cssPath = 'css';

const scriptPath = {
    [`${jsPath}/index`]: "./src/index.js",

    // language script
    [`${jsPath}/lang-en-US`]: "./src/languages/ViewResources.js",
    [`${jsPath}/lang-vi-VN`]: "./src/languages/ViewResources.vi-VN.js",
    [`${jsPath}/lang-zh-CN`]: "./src/languages/ViewResources.zh-CN.js",
};

const stylePath = {
    [`${cssPath}/index`]: "./src/styles/index.scss",

    // report styles
};

module.exports = {
    projectRoot,
    scriptPath,
    stylePath
};
