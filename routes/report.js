var express = require("express");
var router = express.Router();
var report_controller = require("./controllers/report_controller");

report_controller(router);

module.exports = router;