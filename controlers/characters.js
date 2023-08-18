const express = require("express");
let router = express.Router();

router.use("/create", (request, responce) => {
    responce.render("characters/create", {title: "Create chararacter", layout: 
    "characters/layout.ejs"});
});

module.exports = router;