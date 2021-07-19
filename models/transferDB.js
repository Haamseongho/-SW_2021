var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ElevSchema = new Schema({
    ElevLocation: {type: String, default: ""},
    ElevName: {type: String, default: ""},
    ElevUsage: {type: String, default: "사용가능"},
    ElevDir: {type: String, default: ""}
});

var LiftSchema = new Schema({
    LiftLocation: {type: String, default: ""},
    LiftName: {type: String, default: ""},
    LiftUsage: {type: String, default: "사용가능"},
    LiftDir: {type: String, default: ""}
});
var DirSchema = new Schema({
    Turn: {type: String, default: ""},
    Dist: {type: String, default: ""},
    Spot: {type: String, default: ""},
    Feature: {type: String, default: ""},
    Start: {type: String, default: ""}, // 현재 위치
    Dest: {type: String, default: ""}, // 최종 목적지
    Todo: {type: String, default: ""},
    D_Feature_A: {type: String, default: ""},
    D_Feature_B: {type: String, default: ""}
});

var ImageSchema = new Schema({
    ImagePath: {type: String, default: null}
});


var transferSchema = new Schema({
    SubNm: {type: String, required: true},
    SubLine: {type: String, required: true},
    TransferLine: {type: String, required: true},
    TransferDir: {type: String, required: true},
    PlatSpot: {type: String, required: true},
    Time: {type: String, required: true},
    Elevator: [ElevSchema],
    Lift: [LiftSchema],
    Direction: [DirSchema],
    Images : [ImageSchema]
});



transferSchema.statics.findImageData = function (SubNm,TransferDir,cb) {
    return this.model("Transfer").collection.find({
        SubNm : SubNm,
        TransferDir : TransferDir
    }).toArray(cb);
};


transferSchema.statics.insertTransData = function (SubNm, SubLine, TransferLine, TransferDir, PlatSpot, Time, Elevator, Lift, Direction) {
    return this.model("Transfer").collection.insertOne({
        SubNm: SubNm,
        SubLine: SubLine,
        TransferLine: TransferLine,
        TransferDir: TransferDir,
        PlatSpot: PlatSpot,
        Time: Time,
        Elevator: Elevator,
        Lift: Lift,
        Direction: Direction
    });
};

transferSchema.statics.findTransData = function (SubLine, SubNm, TransferLine, TransferDir, cb) {
    return this.model("Transfer").collection.find({
        SubLine: SubLine,
        SubNm: SubNm,
        TransferLine: TransferLine,
        TransferDir: TransferDir
    }).toArray(cb);
};

transferSchema.statics.findAllData = function (cb) {
    this.model("Transfer").collection.find({}).sort({_id: 1}).toArray(cb);
};

// 역조회
transferSchema.statics.findTransferData = function (SubNm, cb) {
    this.model("Transfer").collection.find({SubNm: SubNm}).sort({_id: 1}).toArray(cb);
};

// 수정사항 체크하기 전 데이터 찾기 (SubNm , TransferDir)
transferSchema.statics.correctTransInfo = function (SubNm, TransferDir, cb) {
    this.model("Transfer").collection.find({SubNm: SubNm, TransferDir: TransferDir}).sort({_id: 1}).toArray(cb);
};

// 역 수정
transferSchema.statics.updateTransferData = function (SubNm, SubLine, TransferLine, TransferDir, cb) {
    this.model("Transfer").collection.update({
        SubNm: SubNm,
        SubLine: SubLine,
        TransferLine: TransferLine,
        TransferDir: TransferDir
    }, {upsert: true, multi: true}, cb)
};
// 엘리베이터 정보 수정
transferSchema.statics.updateTransferElev = function (SubNm, TransferDir, Elevator, cb) {
    this.model("Transfer").collection.findOneAndUpdate({
        SubNm: SubNm,
        TransferDir: TransferDir
    }, {$set: {Elevator: Elevator}}, cb);
};

// 리프트 정보 수정
transferSchema.statics.updateTransferLift = function (SubNm, TransferDir, Lift, cb) {
    this.model("Transfer").collection.findOneAndUpdate({
        SubNm: SubNm,
        TransferDir: TransferDir
    }, {$set: {Lift: Lift}}, cb);
};

// 환승 경로 정보 수정
transferSchema.statics.updateTransferDir = function (SubNm, TransferDir, Direction, cb) {
    this.model("Transfer").collection.findOneAndUpdate({
        SubNm: SubNm,
        TransferDir: TransferDir
    }, {$set: {Direction: Direction}}, cb);
};

transferSchema.statics.removeTransferData = function (SubLine, SubNm, TransferLine, TransferDir, cb) {
    this.model("Transfer").collection.remove({
        SubLine: SubLine,
        SubNm: SubNm,
        TransferLine: TransferLine,
        TransferDir: TransferDir
    }, {justOne: true})
};
var Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;