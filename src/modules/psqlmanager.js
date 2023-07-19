module.exports.getClient = (user, host, database, password, port) => {
    const client = new require('pg')({ 
        user: user,
        host: host,
        database: database,
        password: password,
        port: port
    });
    client.connect();
    return client;
};

module.exports.getFrom = (client, columns, tablename) => {
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
};

module.exports.createTable = (client, tablename, typesOfColumns) => {
    let query = `CREATE TABLE ${tablename} ( `;
    for(let i in typesOfColumns){
        query+=`${i} ${typesOfColumns[i]}, `;
    }
    query=query.slice(0,-2);
    query+=" );";
    
    client.query(query, (err, _) => { 
        if (err) {
            console.error(err); 
            return; 
        } 
        console.log(`Table ${tablename} is successfully created`); 
    }); 
};

module.exports.closeClient = (client) => {
    client.query(";", (err, res) => {  
        if (err) {
            console.error(err); 
            return; 
        } 
        console.log(`End client`); 
        client.end();
    });
};

module.exports.insertInto = (client, tablename, newObject) => {
    let query = ` 
    INSERT INTO ${tablename} ( 
    `;
    for(let i in newObject){
        query+=`${i}, `;
    }
    query=query.slice(0,-2);
    query+=" ) VALUES (";
    for(let i in newObject){
        if(typeof newObject[i] =="string"){
            query+=`'${newObject[i]}', `;
        }else{
            query+=`${newObject[i]}, `;
        }
    }
    query=query.slice(0,-2);
    query+=" );";
    client.query(query, (err,_) => { 
        if (err) { 
            console.error(err); 
            return; 
        } 
        console.log(`Elements in table ${tablename} is successfully insert`); 
    }); 
};
module.exports.deleteStrokes = (client, tablename, where) => {

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
};

module.exports=exported;

