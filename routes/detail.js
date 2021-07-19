var express = require("express");
var router = express.Router();
var detailRouter = require("./controllers/detail_controller");

detailRouter(router);

module.exports = router;