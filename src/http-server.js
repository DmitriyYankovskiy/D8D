let PORT = 8878;
let HOST = global.host;

const http = require("http");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const app = express();

app.set("view engine", "ejs");
app.set("layout", global.__basedirname + "/views");

app.use(express.static("./www"));
app.use(expressLayouts);

app.use("/characters", require("../controlers/characters.js"));

let httpServer = http.createServer(app);

httpServer.listen(PORT, HOST, () => {
    console.log("server was started");
});  