require("../config.js");
require("./db-config");

const req = global.req;
const host = "localhost";
const httpPort = 8878;
const wsPort = 7777;
const wsManager = req.wsManager;

const app = req.express();
const server = req.http.createServer(app);

app.set("view engine", "ejs");
app.use(req.expressLayouts);
app.set("layout", global.__basedirname + "/views");

app.use("/www", req.express.static(global.__basedirname + "/www"));

app.use("/characters", require("../controlers/characters.js"));

wsManager.start(wsPort, require("../websockets/database.js"));

server.listen(httpPort, host, () => {
    console.log("server was started");
});  

let stdIn = process.openStdin();
stdIn.addListener("data", (cin) => {
    process.exit();
})