const fs = require("fs");

global.__basedirname = __dirname;
global.host = "localhost";

global.dbClient;

global.build;

global.build.typeDB = process.argv[0];
global.config = JSON.parse(fs.readFileSync(".d8dconfig", "utf8"));

