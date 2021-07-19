var express = require("express");
var router = express.Router();
var info_controller = require("./controllers/info_controller");

info_controller(router);

module.exports = router;