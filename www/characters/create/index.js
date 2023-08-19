const url = `ws://${HOST}:${WS_PORT}/database`;
const connection = new WebSocket(url);

connection.onopen = () => {
    let msg = {
        findObject: "items",
        id: "ht",
        type: "search",
        things: ["description"]
    };
    connection.send(JSON.stringify(msg));
};

connection.onmessage = mes =>{
    console.log(mes.data);
    connection.close();
};