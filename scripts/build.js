/*jslint node:true es5:true*/
/*global Promise*/

"use strict";

var fsPromise = require("fs-promise"),
    fs = require("fs"),
    UglifyJS = require("uglifyjs");

var inScriptFiles = [
    "src/js/hvWallet.module.js",
    "src/js/hvWallet.controller.js",
    "src/js/hvWallet.directive.js",
    "src/js/hvWalletCard.directive.js"
];

var inStyleFiles = [
    "src/css/hvWallet.css"
];

var outScriptFile = "dist/hvWallet.js";
var outStyleFile = "dist/hvWallet.css";

function buildJavaScript(input, output) {
    Promise.all(input.map(function (file) {
        return fsPromise.readFile(file, "utf8");
    })).then(function (fileSources) {
        return fileSources.reduce(function (prev, curr, idx, arr) {
            if (prev) {
                return UglifyJS.parse(curr, {
                    toplevel: prev
                });
            } else {
                return UglifyJS.parse(curr);
            }
        }, null);
    }).then(function (ast) {
        return fsPromise.writeFile(output, ast.print_to_string());
    });
}

function buildCSS(input, output) {
    if (Array.isArray(input)) {
        console.warn("Build does not support CSS input array yet.  Using first file only.");
        input = input[0];
    }
    return new Promise(function (resolve, reject) {
        var readStream = fs.createReadStream(input),
            writeStream = fs.createWriteStream(output);

        readStream.on("error", reject);
        writeStream.on("error", reject);
        writeStream.on("close", resolve);

        readStream.pipe(writeStream);
    });
}

function buildAll() {
    return Promise.all([buildJavaScript(inScriptFiles, outScriptFile), buildCSS(inStyleFiles, outStyleFile)]);
}

if (require.main === module) {
    buildAll().then(function () {
        console.log("Build complete");
    }).catch(console.error);
}

module.exports = {
    all: buildAll,
    js: buildJavaScript,
    css: buildCSS
};