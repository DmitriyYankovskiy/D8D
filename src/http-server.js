let req = global.req;
let server = global.server;

const app = req.express();

app.set("view engine", "ejs");
app.set("layout", global.__basedirname + "/views");
app.use(req.express.static("./www"));
app.use(req.expressLayouts);

app.use("/characters", require("../controlers/characters.js"));

let httpServer = req.http.createServer(app);

httpServer.listen(server.httpPort, server.host, () => {
    console.log("server was started");
});  