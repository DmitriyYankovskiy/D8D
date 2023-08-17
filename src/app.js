require("../config.js");
require("./db-config.js");

require("./http-server.js");
require("./ws-server.js");

let stdIn = process.openStdin();
stdIn.addListener("data", (cin) => {
    process.exit();
});