module.exports.start = (wsPort, controller) => {
    let wss = new req.ws.Server({port: wsPort});
    wss.on("connection", ws => {
        console.log(`<websocket> new client ${wsPort}`);
        ws.on("message", message => {            
            let query = {};
            query.request = JSON.parse(message.toString());            
            controller(query).then(() => {ws.send(query.toString());});           
        });
    });

    process.on("SIGINT", () => {
        console.log("closing server");

        wss.close(() => {
            process.exit();
        });
    });
};