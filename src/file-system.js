function getHtmlUrl(path, name, type = "html"){
    return __dirname + "/www" + path + "/" + type + "/" + name + "." + type;  
}
module.exports.getHtmlUrl = getHtmlUrl;