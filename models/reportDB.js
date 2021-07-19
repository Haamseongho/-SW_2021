var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var reportSchema = new Schema({
    UserId: {type: String},
    Photo: {type: String}, // s3경로
    SubNm: {type: Number},
    Title: {type: String},
    Contents: {type: String},
    Date: {type: Date},

});
var Report = mongoose.model("Report", reportSchema);
/*reportSchema.methods.findReportById = function (UserId, callback) {
    this.model("Report").collection.findOne({UserId: UserId}, callback);
};*/

module.exports = Report;