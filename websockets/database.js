let req = global.req;

const client = global.db.client;

module.exports = message => {
    if (message.request == "SEARCH") {
        if (message.text[0] == "#") {
            // by id
            switch(message.type){
            case "i":
                return psqlm.getObject(
                    client,
                    "item",
                    "id",
                    message.condition.text,
                    message.things                    
                ).then((r) => {
                    message.response = JSON.stringify(r.rows);
                });
            case "c":
                return psqlm.getObject(
                    client,
                    "characters",
                    "id",
                    message.condition.text,
                    message.things
                ).then((r)=> {
                    message.response = JSON.stringify(r.rows);
                });
            }
        } else {
            switch(message.type){
            case "i":
                return psqlm.getObject(
                    client,
                    "item",
                    "name",
                    message.condition.text,
                    message.things
                ).then((r)=> {
                    message.response = JSON.stringify(r.rows);
                });
            case "c":
                return psqlm.getObject(
                    client,
                    "characters",
                    "name",
                    message.condition.text,
                    message.things
                ).then((r) => {
                    message.response = JSON.stringify(r.rows);
                });
            }
        }

    }
};