const PORT = 8777;
const PATH = "/database";

const ws = require("ws");
const wsManager = require("../modules/ws-express.js");

let wsServer = new ws.Server({port: PORT, path: PATH});

wsManager.set(wsServer, require("../websockets/database.js"));
