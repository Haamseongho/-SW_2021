var express = require("express");
var router = express.Router();

module.exports = function (router) {
    router.get("/", function (req, res) {
        res.render("report.ejs");
    });


    var multer = require("multer");
    var AWS = require("aws-sdk");
    AWS.config.loadFromPath(__dirname + "/../../auth_user_data/awsconfig.json");
    var s3 = new AWS.S3();
    var multerS3 = require("multer-s3");
    var path = require("path");
    var upload = multer({
        storage: multerS3({
            s3: s3,
            bucket: "helpbuckets/angel/images",
            shouldTransform: function (req, file, cb) {
                cb(null, /^image/i.test(file.mimetype))
            },
            key: function (req, file, cb) {
                cb(null, file.originalname);
            },
            acl: "public-read-write"
        })
    });

    router.post("/v1/upload", upload.array("imgFiles", 10), function (req, res) {
        console.log("이동완료");
        const imageDB = require("../../models/imageDB");
        var size = req.files.length;
        var imgFilesPath = new Array();
        for(var i=0;i<size;i++){
            imgFilesPath[i] = req.files[i].location;
            console.log(imgFilesPath[i]);
        }

        console.log(req.body);
        var imgSubNm = req.body.img_SubNm;
        var imgTransferDir = req.body.img_TransferDir;
        imageDB.insertImageData(imgSubNm,imgTransferDir,imgFilesPath,function (err,data) {
           if(err) console.log(new Error(err));
           else {
               res.status(200).send("이미지 전송 완료");
           }
        });
    });

    router.post("/", function (req, res) {

        // 문자열로 계속 넘어와서 JSON 형태로 강제 파싱
        let Elevator = JSON.parse(req.body.Elevator);
        let Lift = JSON.parse(req.body.Lift);
        let Direction = JSON.parse(req.body.Direction);

        let SubNm = req.body.SubNm;
        let SubLine = req.body.SubLine;
        let TransferLine = req.body.TransferLine;
        let PlatSpot = req.body.PlatSpot;
        let Time = req.body.Time;
        let TransferDir = req.body.TransferDir;


        const transferDB = require("../../models/transferDB");
        //let TransferInfo = new transferDB();

        transferDB.insertTransData(SubNm, SubLine, TransferLine, TransferDir, PlatSpot, Time, Elevator, Lift, Direction)
            .then((transData) => {
                if (!transData) return res.status(404).send({err: "데이터 입력 실패"});
                else return res.status(200).send(JSON.stringify(transData));
            }).catch(err => res.status(500).send(err));

    });
};
