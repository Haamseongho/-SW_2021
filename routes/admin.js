var express = require("express");
var router = express.Router();
var login_controller = require("./controllers/login_controller");

login_controller(router);

module.exports = router;