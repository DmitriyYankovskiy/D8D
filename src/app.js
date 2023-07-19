require("../config.js");

// settings & includes
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

// ws server setings
wss.on("connection", ws => {
    console.log("new ws client");

    wss.on("message", message => { 
        console.log(message);
    });
});

// http server
//     settings
app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));

//     work
app.use("/www", express.static(global.__basedirname + "/www"));
app.get("/home", require("../controlers/home.js"));


// starting
server.listen(httpPort, host, ()=>{
    console.log("server was started");
});