var express = require('express');
var router = express.Router();
var session = require("express-session");


router.use(session({
    key: 'sid',
    secret: 'angel',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 24000 * 60 * 60 // 쿠키 유효기간 : 하루
    }
}));


/* GET home page. */
router.get('/', function (req, res, next) {

    /*let user_id = "";
    if (req.session.user_id == undefined) {
        user_id = "nouser";
    }
    else {
        user_id = req.session.user_id;
    }*/
    res.render('index.ejs', {
        title: "Main",
        length: 5,
    });
});

module.exports = router;
