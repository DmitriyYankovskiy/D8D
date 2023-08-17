global.__basedirname = __dirname;

global.server = {
    httpPort: 8878,
    wsPort: 8877,
    host: "localhost"
};

global.req = {};
global.build = {};

global.req.express = require("express");
global.req.expressLayouts = require("express-ejs-layouts");

global.req.http = require("http");
global.req.ws = require("ws");

global.req.fs = require("fs");
global.req.os = require("os");

global.req.ejs = require("ejs");

global.req.psqlm = require("./modules/psql-manager");
global.req.wsManager = require("./modules/ws-manager");

global.build.typeDB = process.argv[0];
global.config = JSON.parse(global.req.fs.readFileSync(global.req.os.homedir() + "/.d8dconfig", "utf8"));
