require("../config.js");

const req = global.req;
const psqlm=global.req.psqlm;
const host = "localhost";
const httpPort = 8788;
const wsPort = 8787;

const app = req.express();
const server = req.http.createServer(app);
const wss = new req.ws.Server({port: wsPort});

const client = global.db.client;

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

app.set("view engine", "ejs");
app.use(req.expressLayouts);
app.set("layout", global.__basedirname + "/views");

app.use("/www", req.express.static(global.__basedirname + "/www"));

app.use("/characters", require("../controlers/characters.js"));

// psqlm.addObject(client,"testable",{id:5,color:"blue"});
// psqlm.addObject(client,"testable",{id:6,color:"blue"});
// psqlm.getObject(client,"testable","id","5",["*"]).then((r)=>{console.log(r.rows)});
// psqlm.setObject(client,"testable","id",6,{color: "red", id: -10});
// psqlm.getObject(client,"testable","","",["*"]).then((r)=>{console.log(r.rows)});
// psqlm.deleteObject(client,"testable","*");

req.psqlm.closeClient(client);

server.listen(httpPort, host, ()=>{
    console.log("server was started");
});  