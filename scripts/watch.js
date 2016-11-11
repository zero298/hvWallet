/*jslint node:true nomen:true es5:true*/

"use strict";

var chokidar = require("chokidar"),
    server = require("./start"),
    builder = require("./build");

var watcher = chokidar.watch("src/**/*.*", {
    persistent: true,
    cwd: "."
});

function buildAction() {
    builder.all().then(function () {
        console.log("Build finished");
    }).catch(function () {
        console.error("Build failed");
    });
}

watcher.on("change", function (path) {
    console.log("%s changed", path);
    buildAction();
});

buildAction();

console.log("Watching");