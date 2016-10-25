/*jslint node:true nomen:true es5:true*/

"use strict";

var express = require("express"),
    app = express(),
    compression = require("compression"),
    fs = require("fs"),
    path = require("path");

var caching = {
    maxAge: 31536000000
};

function cacher(req, res, next) {
    res.setHeader("Cache-Control", "public, max-age=31536000000");
    next();
}

app.set("views", ["private/views", "private/pug"]);
app.set("view engine", "pug");

app.locals.pretty = true;

app.use(compression());

app.get("/", cacher, function (req, res) {
    res.render("index");
});

app.get("/calc", function (req, res) {
    res.render("index");
});

app.get("/wallet", function (req, res) {
    res.render("index");
});

app.get("/pug/wallet", cacher, function (req, res) {
    fs.readFile(path.join("private", "content", "json", "lorem.json"), "utf8", function (err, data) {
        if (!err) {
            try {
                var lorem = JSON.parse(data);
                res.render("wallet", {
                    cards: lorem
                });
            } catch (e) {
                console.error(e);
                res.sendStatus(500);
                return;
            }
        } else {
            console.error(err);
            res.sendStatus(500);
            return;
        }
    });
});

app.get("/pug/calc", function (req, res) {
    res.render("calc");
});

app.use("/libs", express.static("bower_components", caching));
app.use("/css", express.static("private/css", caching));
app.use("/src", express.static("private/src", caching));

app.use("/", function (req, res) {
    res.sendStatus(404);
});

app.listen(8081, function () {
    console.log("App listening on 8081");
});