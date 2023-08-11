let req = require("../config.js");

const client = global.db.client;

let wss;

module.exports.start_server = (wsPort, path) => {
    wss = new req.ws.Server({port: wsPort, path: "database"});
    wss.on("connection", ws => {
    console.log("<websocket> new client");
    ws.on("message", message => {
        message=JSON.parse(message.toString());
        if(message.request=="SEARCH"){
            let responce=message;
            if(message.text[0]=="#"){
                // by id
                switch(message.type){
                case "i":
                    psqlm.getObject(
                        client,
                        "item",
                        "id",
                        message.condition.text,
                        message.things
                    ).then((r)=> {ws.send(responce.answer=JSON.stringify(r.rows));});
                    break;
                case "c":
                    psqlm.getObject(
                        client,
                        "characters",
                        "id",
                        message.condition.text,
                        message.things
                    ).then((r)=> {ws.send(responce.answer=JSON.stringify(r.rows));});
                    break;
                }
            }else{
                switch(message.type){
                case "i":
                    psqlm.getObject(
                        client,
                        "item",
                        "name",
                        message.condition.text,
                        message.things
                    ).then((r)=> {ws.send(responce.answer=JSON.stringify(r.rows));});
                    break;
                case "c":
                    psqlm.getObject(
                        client,
                        "characters",
                        "name",
                        message.condition.text,
                        message.things
                    ).then((r)=> {ws.send(responce.answer=JSON.stringify(r.rows));});
                    break;
                }
            }

        }
        //psqlm.getObject(client,"testable",message.condition.key,message.condition.value,["*"]).then((r)=> {console.log(r.rows);ws.send(JSON.stringify(r.rows));});
    });
});
}