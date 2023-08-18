const psql = require("../modules/psql-express");
const client = global.dbClient;

module.exports.message = message => {
    let request = message.request;
    let response = {};
    switch (request.type) {
        case "search" :
            let indexType = (request.id[0] == "#" ? "id" : "name");
            let findObject = request.findObject;
            
            return client.query(psql.getObject(
                findObject,
                indexType,
                request.id,
                request.things                    
            )).then((r) => {
                response = JSON.stringify(r.rows);
                message.response = response;
            });      
    }
};
module.exports.close = () => {};
