require("../config.js");

const host = "localhost";
const httpPort = 8788;
const wsPort = 8787;

const express = require("express");
const ws = require("ws");

const app = express();

const http = require("http").createServer(app);

const wss = new ws.Server({port: wsPort});

const fileSys = require("./file-system");
const postgresql = require("pg");



wss.on("connection", ws => {
    console.log("new ws client");

    wss.on("message", message => {
        console.log(message);
    });
});



app.use("/www", express.static(global.__basedirname + "/www"));

app.get("/", function(request, responce){     
    responce.sendFile(fileSys.getHtmlUrl("", "index"));
});



http.listen(httpPort, host, ()=>{
    console.log("server was started");
});