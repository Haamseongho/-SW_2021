var mongoose = require("mongoose");
var Schema = mongoose.Schema;


var ImageSchema = new Schema({
    ImagePath: {type: String, default: null}
});

var transImageSchema = new Schema({
    SubNm: {type: String, required: true},
    TransferDir: {type: String, required: true},
    Images: [ImageSchema]
});

transImageSchema.statics.insertImageData = function (SubNm, TransferDir, Images, cb) {
    this.model("Image").collection.insertOne({
        SubNm: SubNm,
        TransferDir: TransferDir,
        Images: Images
    }, cb)
};

transImageSchema.statics.findImageData = function (SubNm, TransferDir, cb) {
    this.model("Image").collection.findOne({
        SubNm: SubNm,
        TransferDir: TransferDir
    },cb);
};

var Image = mongoose.model("Image", transImageSchema);

module.exports = Image;