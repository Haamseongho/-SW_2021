var express = require("express");
var router = express.Router();
var correctionController = require("./controllers/correction_controller");

correctionController(router);


module.exports = router;