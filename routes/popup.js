var express = require("express");
var router = express.Router();

router.get("/popup_image",function (req,res) {
    res.render("image_popup.ejs");
});

router.get("/popup_login",function (req,res) {
   res.render("login_popup.ejs");
   /*
    let firebase = require("firebase");
    firebase.auth().signInWithEmailAndPassword(email,password)
        .catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if(errorCode == 'auth/wrong-password'){
                alert("비밀번호가 틀립니다.");
            } else {
                alert(errorMessage);
            }
        })
    */
});

module.exports = router;