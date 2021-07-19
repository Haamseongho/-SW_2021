var express = require("express");
var router = express.Router();
var admin = require("../../models/adminDB");
var crypto = require("crypto");
var cookieParser = require("cookie-parser");
var bodyParser = require("body-parser");
var session = require("express-session");
module.exports = function (router) {

    router.use(bodyParser.urlencoded({extended : true}));
    router.use(session({
        key: 'sid',
        secret: 'angel',
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 24000 * 60 * 60 // 쿠키 유효기간 : 하루
        }
    }));

    // 관리자 로그인
    router.post("/signup", function (req, res) {
        let email = req.body.adminEmail;
        let password = req.body.adminPassword;
        console.log("id : " + email +", password : " + password);
        admin.signInAdmin(email, password, function (err, data) {
            if (err) res.render("error.ejs",{message : "존재하는 관리자가 없습니다. 새로고침해서 다시 로그인해주세요"});
            else if(!data) res.render("error.ejs",{message : "존재하는 관리자가 없습니다. 새로고침해서 다시 로그인해주세요"});
            else {
                 res.redirect("/");
            }
        })
    });

    // 관리자 등록
    router.post("/register", function (req, res) {
        let email = req.body.admin_email;
        let password = req.body.admin_pw;
        admin.registerAdmin(email, password, function (err, data) {
            if (err) {
                console.log("등록 오류입니다.")
            } else if(!data){
                console.log("이미 등록된 관리자입니다.");
            }
            else {
                console.log("관리자 등록 완료");
                res.redirect("/");
            }
        })
    });
    // 사용자 등록(관리자)
    router.get("/register", function (req, res) {
        res.render("sign_up.ejs");
    });

    router.get("/logout", function (req, res) {
        req.session.destroy();
        res.clearCookie('sid');
        res.redirect("/");
    })
};