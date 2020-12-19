module.exports = app => {

    //var bodyParser = require('body-parser')
    const translate = require("../controllers/translate-controller.js");
    var router = require("express").Router();


    router.post("/", translate.newLyrics);



    app.use('/translate', router);
}