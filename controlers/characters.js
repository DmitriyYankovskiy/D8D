const express = require("express");
let router = express.Router();

router.use("/create", (request, responce) => {
    responce.render("characters/create/index", {title: "Creaate chararacter", layout: 
    "characters/layout.ejs"});
});

module.exports = router;
