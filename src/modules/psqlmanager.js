const {Client} = require('pg');

let exported = {
    getClient(user, host, database, password, port){
        const client = new Client({ 
            user: user,
            host: host,
            database: database,
            password: password,
            port: port
        });
        client.connect();
        return client;
    },
    getFrom(client, columns, tablename){
        let query = `SELECT `;
        let answer;
        for(let i in columns){
            query+=`${columns[i]}, `;
        }
        query=query.slice(0,-2);
        query+=` FROM ${tablename};`;
        //console.log(query);
        client.query(query, (err, res,ans) => { 
            if (err) {
                console.error(err); 
                return; 
            } 
            console.log(`Columns from ${tablename} is successfully got`);
            answer=res;
        }); 
        return answer;
    },
    createTable(client, tablename, columns){
        let query = `CREATE TABLE ${tablename} ( `;
        for(let i in columns){
            query+=`${i} ${columns[i]}, `;
        }
        query=query.slice(0,-2);
        query+=" );";
        
        client.query(query, (err, res) => { 
            if (err) {
                console.error(err); 
                return; 
            } 
            console.log(`Table ${tablename} is successfully created`); 
        }); 
    },
    endClient(client){
        client.query(";", (err, res) => {  
            if (err) {
                console.error(err); 
                return; 
            } 
            console.log(`End client`); 
            client.end();
        });
    },
    insertInto(client, tablename, elements){
        let query = ` 
        INSERT INTO ${tablename} ( 
        `;
        for(let i in elements){
            query+=`${i}, `;
        }
        query=query.slice(0,-2);
        query+=" ) VALUES (";
        for(let i in elements){
            if(typeof elements[i] =="string"){
                query+=`'${elements[i]}', `;
            }else{
                query+=`${elements[i]}, `;
            }
        }
        query=query.slice(0,-2);
        query+=" );";
        client.query(query, (err, res) => { 
            if (err) { 
                console.error(err); 
                return; 
            } 
            console.log(`Elements in table ${tablename} is successfully insert`); 
        }); 
    },
    deleteStrokes(client, tablename, where){

        let query = ` 
        DELETE FROM ${tablename} 
        WHERE ${where} ;
        `; 
        if(where=="*"){
            query=`DELETE FROM ${tablename};`
        }

        client.query(query, (err, res) => { 
            if (err) { 
                console.error(err); 
                return; 
            } 
            console.log('Strokes delete successful'); 
        });
    }
};

module.exports=exported;

