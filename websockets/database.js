let req = global.req;

const psqlm = global.req.psqlm;
const client = global.db.client;

module.exports = message => {
    let request = message.request;
    let response = {};
    switch (request.type) {
        case "search":
            let indexType = (request.id[0] == "#" ? "id" : "name");
            let findObject = request.findObject;
            
            return psqlm.getObject(
                client,
                findObject,
                indexType,
                request.id,
                request.things                    
            ).then((r) => {
                response = JSON.stringify(r.rows);
                message.response = response;
            });      
    }
};