global.__basedirname = __dirname;
global.host = "localhost";
global.dbClient;

global.req = {};
global.build = {};

global.req.express = require("express");
global.req.expressLayouts = require("express-ejs-layouts");

global.req.http = require("http");
global.req.ws = require("ws");

global.req.fs = require("fs");
global.req.os = require("os");

global.req.ejs = require("ejs");

global.req.psqlManager = require("./modules/psql-express");
global.req.wsManager = require("./modules/ws-express");

global.build.typeDB = process.argv[0];
global.config = JSON.parse(global.req.fs.readFileSync(".d8dconfig", "utf8"));

