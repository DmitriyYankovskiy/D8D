function getHtmlUrl(path, name, type = "html"){   
    return __basedirname + "/www" + path + "/" + type + "/" + name + "." + type;     
}
module.exports.getHtmlUrl = getHtmlUrl;