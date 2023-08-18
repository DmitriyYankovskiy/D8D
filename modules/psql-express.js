module.exports.getObject = (tableName, key, value, columns) => {
    let query = `SELECT `;
    for (let i in columns) {
        query += `${columns[i]}, `;
    }

    query = query.slice(0,-2);
    query += ` FROM ${tableName}`;

    if (typeof value == "string") {
        value = `'${value}'`;
    }

    if(key != ""){
        query += ` WHERE ${key} = ${value};`;
    }else{
        query += `;`;
    }
        
    return query;
};
module.exports.createTable = (tableName, typesOfColumns) => {
    let query = `CREATE TABLE ${tableName} (`;
    for (let i in typesOfColumns) {
        query += `${i} ${typesOfColumns[i]}, `;
    }
    query = query.slice(0,-2);
    query += " );";
    
    console.log(`Table ${tableName} is created`); 

    return query;    
};
module.exports.dropTable = (tableName) => {
    let query = `DROP TABLE ${tableName};`;
    
    return query; 
};        
module.exports.closeClient = () => {
    console.log(`<database> end client`); 
    
    return ";";            
};        
module.exports.addObject = (tableName, newObject) => {
    let query = ` 
                INSERT INTO ${tableName} (
                `;

    for (let i in newObject) {
        query += `${i}, `;
    }

    query = query.slice(0,-2);
    query += " ) VALUES (";

    for (let i in newObject) {
        if (typeof newObject[i] == "string") {
            query += `'${newObject[i]}', `;
        } else {
            query += `${newObject[i]}, `;
        }
    }
    query = query.slice(0,-2);
    query += " );";
    
    console.log(`<database> elements in table ${tableName} is insert`); 
    
    return query 
};
module.exports.deleteObject = (tableName, key, value = "") => {    
    let query;

    if (typeof value == "string") value = `'${value}'`;

    if (key == "*") {
        query=`DELETE FROM ${tableName};`
    } else {
        query = `
                DELETE FROM ${tableName} 
                WHERE ${key} = ${value};
                `; 
    }

    
    console.log('<database> strokes delete'); 
    return query;
};        
module.exports.setObject = (tableName, key, value, columns) => {    
    let query = `UPDATE ${tableName} SET `;
    for (let i in columns) {
        if (typeof columns[i] == "string") {
            columns[i] = `'${columns[i]}'`;
        }
        query += `${i} = ${columns[i]}, `;
    }
    query = query.slice(0,-2);

    if (key != "") {
        query += ` WHERE ${key} = ${value};`;
    } else {
        query += `;`;
    }
    
    return query;
};
