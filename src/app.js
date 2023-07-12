require("../config.js");
const express = require("express");
const fileSys = require("./file-system");
const postgresql = require("pg");

const app = express();

app.use("/www", express.static(global.__dirname + "/www"));

app.get("/", function(request, responce){     
    responce.sendFile(fileSys.getHtmlUrl("", "index"));
});

app.listen(8788);