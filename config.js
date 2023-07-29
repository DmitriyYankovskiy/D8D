global.__basedirname = __dirname;

global.req = {};

global.req.express = require("express");
global.req.expressLayouts = require("express-ejs-layouts");

global.req.http = require("http");
global.req.ws = require("ws");

global.req.fs = require('fs');
global.req.os = require("os");

global.req.ejs = require("ejs");

global.req.psqlm = require('./modules/psqlmanager');

global.config = JSON.parse(global.req.fs.readFileSync(global.req.os.homedir()+'/.d8dconfig', 'utf8'));
require("./modules/dbconfig");