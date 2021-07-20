var mongoose = require("mongoose");
var Schema = mongoose.Schema;
var crypto = require("crypto-js/aes");


var adminSchema = new Schema({
    email: {type: String, required: true},
    password: {type: String, required: true}
});

/*
adminSchema.statics.signInAdmin = function (email,password,cb) {
    cipher.update(password,'ascii','hex');
    var newPassword = cipher.final('hex');
    this.model("Admin").collection.findOne({
        email : email,
        password : newPassword
    },cb)
};

adminSchema.statics.registerAdmin = function (email,password,cb) {
    cipher.update(password,'ascii','hex');
    var newPassword = cipher.final('hex');
    this.model("Admin").collection.insertOne({
        email : email,
        password : newPassword
    },cb)
};
*/

var Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;