var express = require("express");
var router = express.Router();
var transferDB = require("../../models/transferDB");
var localStorage = require("local-storage");

module.exports = function (router) {
    router.get("/", function (req, res) {

        if (req.query.SubNm === undefined) {
            transferDB.findAllData(function (err, data) {
                if (err) return res.status(404).send({err: "데이터가 없습니다."});
                else return res.status(200).render("info.ejs", {transfer: data});
            })
        }
        else {
            var SubNm = req.query.SubNm;
            console.log(SubNm);
            transferDB.findTransferData(SubNm, function (err, data) {
                if (err) return res.status(404).send({err: "데이터가 없습니다."});
                else return res.status(200).render("info.ejs", {transfer: data});
            })
        }
    });


    router.post("/", function (req, res) {
        let SubLine = req.body.SubLine;
        let SubNm = req.body.SubNm;
        let TransferLine = req.body.TransferLine;
        let TransferDir = req.body.TransferDir;

        let data = {
            SubLine: SubLine,
            SubNm: SubNm,
            TransferLine: TransferLine,
            TransferDir: TransferDir
        };


        res.status(200).send(data);
    });

    router.post("/search", function (req, res) {
        var SubNm = req.body.SubNm;
        console.log("찾는 역 : " + SubNm);
        transferDB.findTransferData(SubNm, function (err, data) {
            if (err) {
                return res.status(404).send({err: "찾는 역에 대한 정보가 없습니다."})
            }
            else {
                console.log(JSON.stringify(data));
                return res.status(200).send(JSON.stringify(data))
            }
        })
    })
};