const psqlm = global.req.psqlm;

const config = global.config;

const client = psqlm.openClient(config.dbuser, 
    config.dbhost, 
    config.dbname, 
    config.dbpassword, 
    config.dbport
);
global.db = {};
global.db.client = client;

//--- characters sheet --- //

psqlm.createTable(client,"characters",{
    name:"varchar",
    class:"int",
    level:"varchar",
    race:"int",
    experience:"int",
    background:"int",
    aligment:"int",
    prof_bonus:"int",
    armor_class:"int",
    max_hp:"int",
    temp_hp:"int",
    current_hp:"int",
    hit_dice:"varchar",

    strength:"int",
    dexterity:"int",
    constitution:"int",
    intelligence:"int",
    wisdom:"int",
    charisma:"int",

    st_strength:"int",
    st_dexterity:"int",
    st_constitution:"int",
    st_intelligence:"int",
    st_wisdom:"int",
    st_charisma:"int",

    acrobatics:"int",
    animal_handling:"int",
    arcana:"int",
    athletics:"int",
    deception:"int",
    history:"int",
    insight:"int",
    intimidation:"int",
    investigation:"int",
    medicine:"int",
    nature:"int",
    perception:"int",
    perfomance:"int",
    persuasion:"int",
    religion:"int",
    sleight_of_hand:"int",
    stealth:"int",
    survival:"int",
    passive_perception:"int",

    initiative:"int",
    speed:"int",
    vision:"varchar",

    attacks_and_spells:"varchar",
    features_and_traits:"varchar",
    proficience_and_languages:"varchar",
    inventory_and_equipment:"varchar"
});

psqlm.createTable(client,"items",{
    id:"varchar",
    name:"varchar",
    type:"varchar",
    attacks:"varchar",
    description:"varchar",
    jsondesc:"varchar",
    other:"varchar" 
});