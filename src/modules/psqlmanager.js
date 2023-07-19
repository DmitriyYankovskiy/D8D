const {Client} = require('pg');

module.exports.openClient = (user, host, database, password, port) => {
    const client = new Client({ 
        user: user,
        host: host,
        database: database,
        password: password,
        port: port
    });
    client.connect();
    return client;
};

module.exports.getObject = (client, tablename,  key, value, columns) => {

    let query = `SELECT `;
    for(let i in columns){
        query += `${columns[i]}, `;
    }
    query = query.slice(0,-2);
    query += ` FROM ${tablename}`;

    if (typeof value == "string"){
        value = `'${value}'`;
    }

    if(where != ""){
        query += ` WHERE ${key} = ${value};`;
    }else{
        query += `;`;
    }
    
    return client.query(query);
};

module.exports.createTable = (client, tablename, typesOfColumns) => {
    let query = `CREATE TABLE ${tablename} ( `;
    for(let i in typesOfColumns){
        query += `${i} ${typesOfColumns[i]}, `;
    }
    query = query.slice(0,-2);
    query += " );";
    
    client.query(query, (err) => { 
        if(err){
            console.error(err); 
            return; 
        } 
        console.log(`Table ${tablename} is successfully created`); 
    }); 
};

module.exports.closeClient = (client) => {
    client.query(";", (err) => {  
        if(err){
            console.error(err); 
            return; 
        } 
        console.log(`End client`); 
        client.end();
    });
};

module.exports.addObject = (client, tablename, newObject) => {
    let query = ` 
                INSERT INTO ${tablename} ( 
                `;
    for(let i in newObject){
        query += `${i}, `;
    }

    query = query.slice(0,-2);
    query += " ) VALUES (";
    for(let i in newObject){
        if(typeof newObject[i] == "string"){
            query += `'${newObject[i]}', `;
        }else{
            query += `${newObject[i]}, `;
        }
    }
    query = query.slice(0,-2);
    query += " );";
    client.query(query, (err) => { 
        if(err){ 
            console.error(err); 
            return; 
        } 
        console.log(`Elements in table ${tablename} is successfully insert`); 
    }); 
};
module.exports.deleteObject = (client, tablename, key, value = "") => {

    let query;

    if(typeof value == "string")
        value = `'${value}'`;

    if(key=="*"){
        query=`DELETE FROM ${tablename};`
    }else{
        query = `
                DELETE FROM ${tablename} 
                WHERE ${key} = ${value};
                `; 
    }

    client.query(query, (err, res) => { 
        if(err){ 
            console.error(err); 
            return; 
        } 
        console.log('Strokes delete successful'); 
    });
};

