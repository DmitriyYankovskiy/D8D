const express = require("express");;
const fileSys = require("./file-system");
const postgresql = require("pg");


const app = express();

app.use("/www", express.static(__dirname + "/www"));

app.get("/", function(request, responce){
    console.log("/");
    responce.sendFile(fileSys.getHtmlUrl("", "index"));
});

app.listen(8888);