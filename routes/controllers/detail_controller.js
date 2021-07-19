var express = require("express");
var router = express.Router();

module.exports = function (router) {
    router.get("/detail", function (req, res) {
        var SubNm = req.query.SubNm;
        var SubLine = req.query.SubLine;
        var TransferLine = req.query.TransferLine;
        var TransferDir = req.query.TransferDir;

        SubNm = decodeURI(SubNm);
        SubLine = decodeURI(SubLine);
        TransferLine = decodeURI(TransferLine);
        TransferDir = decodeURI(TransferDir);
        console.log(SubNm + "/" + SubLine + "/" + TransferDir + "/" + TransferLine);
        const imageDB = require("../../models/imageDB");

        imageDB.findImageData(SubNm, TransferDir, function (err, ImagePath) {
            if (err) return res.status(500).send({err: "이미지 불러오기 오류"});
            else if (!ImagePath) return res.status(404).send({err: "이미지가 존재하지 않음"});
            else {
                sendTransData(req, res, SubLine, SubNm, TransferLine, TransferDir, ImagePath);
            }
        });


        //

    });

    function sendTransData(req, res, SubLine, SubNm, TransferLine, TransferDir, ImagePath) {
        const transferDB = require("../../models/transferDB");
        transferDB.findTransData(SubLine, SubNm, TransferLine, TransferDir, function (err, TransData) {
            if (err) return res.status(404).send({err: "데이터가 없습니다."});
            else {
                var data = new Object();
                let user_id = req.session.user_id;
                data = TransData;
                data.ImagePath = ImagePath.Images;
                data.user_id = user_id;

                console.log(data);
                console.log(data.user_id);
                return res.status(200).render("detail.ejs", {TransData: data});
            }
        })
    }
};