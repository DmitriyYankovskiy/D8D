const req = global.req;
const server = global.server;
const wsManager = req.wsManager;

wsManager.start("/database", require("../websockets/database.js"));
