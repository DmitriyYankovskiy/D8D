require("../config.js");

const express = require("express");
const ws = require("ws");
const http = require("http");
const fileSys = require("./file-system");
const postgresql = require("pg");

const host = "localhost";
const httpPort = 8788;
const wsPort = 8787;

const app = express();
const server = http.createServer(app);
const wss = new ws.Server({port: wsPort});

wss.on("connection", ws => {
    console.log("new ws client");
    ws.on("message", message => { 
        console.log(message.toString());
    });
});

app.set("view engine", "ejs");
app.use("/www", express.static(global.__basedirname + "/www"));
app.use("/home", require("../controlers/home.js"));


server.listen(httpPort, host, ()=>{
    console.log("server was started");
});