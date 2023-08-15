module.exports.start = (wsPort, controller) => {
    let wss = new req.ws.Server({port: wsPort});
    wss.on("connection", ws => {
        console.log(`<websocket> new client ${wsPort}`);
        ws.on("message", message => {            
            message = JSON.parse(message.toString());            
            controller(mesage).then(() => ws.send(message));           
        });
    });
}