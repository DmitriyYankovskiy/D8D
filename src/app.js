require("../config.js");

const express = require("express");
const ws = require("ws");
const http = require("http");
const postgresql = require("pg");
const fs = require('fs');
const psqlm = require('./modules/psqlmanager');
const os = require("os");

const host = "localhost";
const httpPort = 8788;
const wsPort = 8787;
const d8dconfig = JSON.parse(fs.readFileSync(os.homedir()+'/.d8dconfig', 'utf8'));

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({port: wsPort});

const client=psqlm.getClient(d8dconfig.dbuser, 
                             d8dconfig.dbhost, 
                             d8dconfig.dbname, 
                             d8dconfig.dbpassword, 
                             d8dconfig.dbport
);

wss.on("connection", ws => {
    console.log("new ws client");
    ws.on("message", message => { 
        console.log(message.toString());
    });
});

app.set("view engine", "ejs");
app.use("/www", express.static(global.__basedirname + "/www"));
app.use("/home", require("../controlers/home.js"));


/*psqlm.createTable(client,"testable",{name:"varchar", id:"int", color:"varchar"});
psqlm.insertInto(client,"testable",{id:5,color:"blue"});
console.log(psqlm.getFrom(client,["*"],"testable"));
psqlm.deleteStrokes(client,"testable","*");
psqlm.endClient(client);*/

server.listen(httpPort, host, ()=>{
    console.log("server was started");
});