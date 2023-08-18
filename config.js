const fs = require("fs");

global.__basedirname = __dirname;
global.host = "localhost";

global.dbClient;

global.build = {};

global.build.typeDB = process.argv[2];
//console.log(JSON.parse(fs.readFileSync(".d8dconfig", "utf8")));
global.config = JSON.parse(fs.readFileSync(".d8dconfig", "utf8")).db;

