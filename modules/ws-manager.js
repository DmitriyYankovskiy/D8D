let wsPort = global.server.wsPort;

module.exports.start = (path,  controller) => {
    let wss = new req.ws.Server({port: wsPort, path: path});
    wss.on("connection", (ws, request) => {
        console.log(`<websocket> new client ${wsPort}`);
        
        ws.on("message", message => {            
            let query = {};
            query.request = JSON.parse(message.toString());            
            controller.message(query).then(() => ws.send(query.toString()));           
        });
        ws.on("close", () => controller.close());
    });

    process.on("SIGINT", () => {
        console.log("closing server");

        wss.close(() => {
            process.exit();
        });
    });
};