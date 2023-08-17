const {Client} = require("pg");

module.exports = () => {
    const client = new Client({ 
        user: user,
        host: host,
        database: database,
        password: password,
        port: port
    });
    client.connect();

    return {
        getObject: (client, tableName, key, value, columns) => {

            let query = `SELECT `;
            for(let i in columns){
                query += `${columns[i]}, `;
            }
            query = query.slice(0,-2);
            query += ` FROM ${tableName}`;
        
            if (typeof value == "string"){
                value = `'${value}'`;
            }
        
            if(key != ""){
                query += ` WHERE ${key} = ${value};`;
            }else{
                query += `;`;
            }
            
        
            return client.query(query);
        },
        createTable: (client, tableName, typesOfColumns) => {
            let query = `CREATE TABLE ${tableName} ( `;
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
                console.log(`Table ${tableName} is successfully created`); 
            }); 
        },
        dropTable: (client, tableName) => {
            let query = `DROP TABLE ${tableName};`;
            client.query(query, (err) => { 
                if(err){
                    console.error(err); 
                    return; 
                } 
                console.log(`Table ${tableName} is successfully dropped`); 
            }); 
        },        
        closeClient: (client) => {
            client.query(";", (err) => {  
                if(err){
                    console.error(err); 
                    return; 
                } 
                console.log(`<database> end client`); 
                client.end();
            });
        },        
        addObject: (client, tableName, newObject) => {
            let query = ` 
                        INSERT INTO ${tableName} ( 
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
                console.log(`<database> elements in table ${tableName} is successfully insert`); 
            }); 
        },
        deleteObject: (client, tableName, key, value = "") => {
        
            let query;
        
            if(typeof value == "string")
                value = `'${value}'`;
        
            if(key=="*"){
                query=`DELETE FROM ${tableName};`
            }else{
                query = `
                        DELETE FROM ${tableName} 
                        WHERE ${key} = ${value};
                        `; 
            }
        
            client.query(query, (err, res) => { 
                if(err){ 
                    console.error(err); 
                    return; 
                } 
                console.log('<database> strokes delete successful'); 
            });
        },        
        setObject: (client, tableName, key, value, columns) => {
        
            let query = `UPDATE ${tableName} SET `;
            for(let i in columns){
                if (typeof columns[i] == "string"){
                    columns[i] = `'${columns[i]}'`;
                }
                query += `${i} = ${columns[i]}, `;
            }
            query = query.slice(0,-2);
        
            if(key != ""){
                query += ` WHERE ${key} = ${value};`;
            }else{
                query += `;`;
            }
            
            return client.query(query);
        }
    };
};