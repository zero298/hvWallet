/*jslint node:true es5:true*/

"use strict";

var StaticServer = require("node-static").Server,
    http = require("http");

var file = new StaticServer("./");

var server = http.createServer(function (req, res) {
    req.addListener("end", function () {
        file.serve(req, res);
    }).resume();
});

server.listen(8081, function () {
    console.log("Server listening on %s", 8081);
});

module.exports = server;