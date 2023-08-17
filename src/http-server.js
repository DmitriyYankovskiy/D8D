let PORT = 8878;
let HOST = global.host;

const http = require("http");

const app = req.express();

app.set("view engine", "ejs");
app.set("layout", global.__basedirname + "/views");

app.use(req.express.static("./www"));
app.use(req.expressLayouts);

app.use("/characters", require("../controlers/characters.js"));

let httpServer = http.createServer(app);

httpServer.listen(PORT, HOST, () => {
    console.log("server was started");
});  