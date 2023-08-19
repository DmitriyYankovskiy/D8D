const {Client} = require("pg");

let client = new Client({ 
    user: global.config.user,
    host: global.config.host,
    database: global.config.database,
    password: global.config.password,
    port: global.config.port
});
client.connect();

global.dbClient = client;

const psql = require("../modules/psql-express");

let dataBases = [
    {
        name: "items",
        columns: {
            name: "varchar",
            description: "varchar",
            class: "int",
            level: "varchar",
            race: "int",

            experience: "int",
            background: "int",
            aligment: "int",
            prof_bonus: "int",
            
            armor_class: "int",
            max_hp: "int",
            temp_hp: "int",
            current_hp: "int",
            hit_dice: "varchar",

            strength: "int",
            dexterity: "int",
            constitution: "int",
            intelligence: "int",
            wisdom: "int",
            charisma: "int",

            st_strength: "int",
            st_dexterity: "int",
            st_constitution: "int",
            st_intelligence: "int",
            st_wisdom: "int",
            st_charisma: "int",

            acrobatics: "int",
            animal_handling: "int",
            arcana: "int",
            athletics: "int",
            deception: "int",
            history: "int",
            insight: "int",
            intimidation: "int",
            investigation: "int",
            medicine: "int",
            nature: "int",
            perception: "int",
            perfomance: "int",
            persuasion: "int",
            religion: "int",
            sleight_of_hand: "int",
            stealth: "int",
            survival: "int",

            passive_perception: "int",

            initiative: "int",
            speed: "int",
            vision: "varchar",

            attacks_and_spells: "varchar",
            features_and_traits: "varchar",
            proficience_and_languages: "varchar",
            inventory_and_equipment: "varchar"
        }
    }, 
    {
        name: "characters",
        columns: {
            id: "varchar",
            name: "varchar",
            type: "varchar",

            attacks: "varchar",
            description: "varchar",

            jsonDesc: "varchar",
            other: "varchar" 
        }
    }
]


for (let i of dataBases) {
    if (global.build.typeDB == "r") {
        client.query(psql.dropTable(i.name));
    }
    if (global.build.typeDB == "r" || global.build.typeDB == "b") {
        client.query(psql.createTable(i.name, i.columns));
    }
}

process.on("exit", () => {
    client.query(psql.closeClient);
    client.end();
});