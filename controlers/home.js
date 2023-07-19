const express = require("express");
const ejs = require("ejs");

let router = express.Router();

router.use("/", (request, responce) => {
    responce.render("home/index", {title: "home page"});
});

module.exports = router;