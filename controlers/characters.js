const req = global.req;
let router = req.express.Router();

router.use("/create", (request, responce) => {
    responce.render("characters/create", {title: "Create chararacter", layout: 
    "characters/layout.ejs"});
});

module.exports = router;