function getHtmlUrl(path, name, type = "html"){   
    return global.__basedirname + "/www" + path + "/" + type + "/" + name + "." + type;     
}
module.exports.getHtmlUrl = getHtmlUrl;