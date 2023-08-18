module.exports.set = (wsServer, controller) => {
    wsServer.on("connection", (ws, request) => {
        //console.log(`<wsServer> new client ${wsPort}`);
        
        ws.on("message", message => {
            let query = {};
            query.request = JSON.parse(message.toString());            
            controller.message(query).then(() => ws.send(query.toString()));           
        });
        ws.on("close", () => controller.close());
    });

    process.on("exit", () => {
        console.log("closing server");

        wsServer.close();
    });
};