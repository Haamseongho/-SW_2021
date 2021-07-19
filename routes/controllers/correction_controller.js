var express = require("express");
var router = express.Router();
var transferDB = require("../../models/transferDB");

module.exports = function (router) {

    // /correct/search --> 데이터 우선 찾은 다음에 수정 페이지로 이동 (한단계 거치는 미들웨어)
    router.post("/search", function (req, res) {
        var SubNm = req.body.SubNm;
        var TransferDir = req.body.TransferDir;
        transferDB.correctTransInfo(SubNm, TransferDir, function (err, data) {
            if (err) res.status(404).send({err: "데이터 찾기 에러_/search"});
            else if (!data) res.status(500).send({err: "입력 데이터 에러"});
            else {
                res.status(200).send(JSON.stringify(data));
            }
        })
    });

    // type : 1 --> 엘리베이터 정보 수정 페이지
    router.get("/elevInfo", function (req, res) {
        // 엘리베이터 정보 수정 페이지로 렌더링
        // 현재 역과 환승할 역을 같이 넘기면서 해당 내용에 대한 엘리베이터 정보 수정
        var SubNm = req.query.SubNm;
        var TransferDir = req.query.TransferDir;
        transferDB.correctTransInfo(SubNm, TransferDir, function (err, data) {
            if (err) res.status(404).send({err: "엘리베이터 수정 에러"});
            else if (!data) res.status(500).send({err: "데이터 입력 된 것이 없음"});
            else {

                var transData = new Object();
                transData = data;
                transData.Type = 1;

                res.status(200).render("correct.ejs", {data: transData});
            }
        });
    });

    // 리프트 정보 수정
    router.get("/liftInfo", function (req, res) {
        var SubNm = req.query.SubNm;
        var TransferDir = req.query.TransferDir;
        transferDB.correctTransInfo(SubNm, TransferDir, function (err, data) {
            if (err) res.status(404).send({err: "엘리베이터 수정 에러"});
            else if (!data) res.status(500).send({err: "데이터 입력 된 것이 없음"});
            else {

                var transData = new Object();
                transData = data;
                transData.Type = 2;
                console.log(transData);


                res.status(200).render("correct.ejs", {data: transData});
            }
        });
    });

    // 이동경로 수정
    router.get("/transInfo", function (req, res) {
        var SubNm = req.query.SubNm;
        var TransferDir = req.query.TransferDir;
        console.log(SubNm + "/// " + TransferDir);
        transferDB.correctTransInfo(SubNm, TransferDir, function (err, data) {
            if (err) res.status(404).send({err: "엘리베이터 수정 에러"});
            else if (!data) res.status(500).send({err: "데이터 입력 된 것이 없음"});
            else {

                var transData = new Object();
                transData = data;
                transData.Type = 3;

                res.status(200).render("correct.ejs", {data: transData});
            }
        });
    });

    // 엘리베이터 데이터 수정 적용하기
    router.post("/elevData", function (req, res) {
        if (req.body.Elevator === undefined) {
            console.log("데이터 에러");
        }
        var SubNm = req.body.SubNm;
        var TransferDir = req.body.TransferDir;
        var Elevator = JSON.parse(req.body.Elevator);
        transferDB.updateTransferElev(SubNm, TransferDir, Elevator, function (err, data) {
            console.log(JSON.stringify(data));

            if (err) return res.status(500).send({err: "데이터 전송 내부 에러"});
            else if (!data) return res.status(404).send({err: "검색한 데이터가 없거나 수정할 데이터가 없습니다."});
            else return res.status(200).send(JSON.stringify(data));
        })
    });

    // 리프트 수정 정보 적용하기
    router.post("/liftData", function (req, res) {
        if (req.body.Lift === undefined) {
            console.log("데이터 에러");
        }
        var SubNm = req.body.SubNm;
        var TransferDir = req.body.TransferDir;
        var Lift = JSON.parse(req.body.Lift);
        transferDB.updateTransferLift(SubNm, TransferDir, Lift, function (err, data) {
            if (err) return res.status(500).send({err: "데이터 전송 내부 에러"});
            else if (!data) return res.status(404).send({err: "검색한 데이터가 없거나 수정할 데이터가 없습니다."});
            else return res.status(200).send(JSON.stringify(data));
        })
    });

    router.post("/dirData",function (req,res) {
        if(req.body.Direction === undefined)
            console.log("데이터 에러");

        var SubNm = req.body.SubNm;
        var TransferDir = req.body.TransferDir;
        var Direction = JSON.parse(req.body.Direction);
        transferDB.updateTransferDir(SubNm,TransferDir,Direction,function (err,data) {
            if(err) return res.status(500).send({err : "데이터 전송 내부 에러"});
            else if(!data) return res.status(404).send({err :"검색한 데이터가 없거나 수정할 데이터가 없습니다."});
            else return res.status(200).send(JSON.stringify(data));
        })
    })
};