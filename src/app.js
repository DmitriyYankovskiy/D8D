require("../config.js");

const req = global.req;
const psqlm = global.req.psqlm;
const host = "localhost";
const httpPort = 8788;
const wsPort = 8787;

const app = req.express();
const server = req.http.createServer(app);

require('../websocket/database.js').start_server(wsPort);

app.set("view engine", "ejs");
app.use(req.expressLayouts);
app.set("layout", global.__basedirname + "/views");

app.use("/www", req.express.static(global.__basedirname + "/www"));

app.use("/characters", require("../controlers/characters.js"));



server.listen(httpPort, host, ()=>{
    console.log("server was started");
});  