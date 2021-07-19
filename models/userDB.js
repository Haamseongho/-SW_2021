var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userSchema = new Schema({
    UserId: {type: String},
    LiftUsuage: {type: Number},
    ElevUsuage: {type: Number},
    Token: {type: String, default: null}
});

var User = mongoose.model("User",userSchema);

module.exports = User;