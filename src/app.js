require("../config.js");

const req = global.req;
const psqlm=global.req.psqlm;
const host = "localhost";
const httpPort = 8788;
const wsPort = 8787;
const d8dconfig = JSON.parse(req.fs.readFileSync(req.os.homedir()+'/.d8dconfig', 'utf8'));
const app = req.express();
const server = req.http.createServer(app);
const wss = new req.ws.Server({port: wsPort});

const client = req.psqlm.openClient(d8dconfig.dbuser, 
                              d8dconfig.dbhost, 
                              d8dconfig.dbname, 
                              d8dconfig.dbpassword, 
                              d8dconfig.dbport
)

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


psqlm.createTable(client,"characters",{
    id:"varchar",
    name:"varchar",
    class:"varchar",
    level:"varchar",
    race:"varchar",
    experience:"int",
    background:"varchar",
    aligment:"int",
    prof_bonus:"int",
    armor_class:"int",
    max_hp:"int",
    temp_hp:"int",
    current_hp:"int",
    hit_dice:"varchar",

    strength:"int",
    dexterity:"int",
    constitution:"int",
    intelligence:"int",
    wisdom:"int",
    charisma:"int",

    st_strength:"int",
    st_dexterity:"int",
    st_constitution:"int",
    st_intelligence:"int",
    st_wisdom:"int",
    st_charisma:"int",

    acrobatics:"int",
    animal_handling:"int",
    arcana:"int",
    athletics:"int",
    deception:"int",''
    history:"int",
    insight:"int",
    intimidation:"int",
    investigation:"int",
    medicine:"int",
    nature:"int",
    perception:"int",
    perfomance:"int",
    persuasion:"int",
    religion:"int",
    sleight_of_hand:"int",
    stealth:"int",
    survival:"int",
    passive_perception:"int",

    initiative:"int",
    speed:"int",
    vision:"varchar",

    spells:"varchar",
    features:"varchar",
    traits:"varchar",
    proficience:"varchar",
    languages:"varchar",
    items:"varchar",
    coins:"varchar"
});
psqlm.createTable(client,"items",{
    id:"varchar",
    name:"varchar",
    type:"varchar",
    attacks:"varchar",
    description:"varchar",
    jsondesc:"varchar",
    other:"varchar" 
});
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