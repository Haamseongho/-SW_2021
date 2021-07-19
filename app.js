var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var infoRouter = require("./routes/info"); // 환승정보 확인 페이지
var rptRouter = require("./routes/report"); // 환승 정보 입력
var detailRouter = require("./routes/detail");
var correctionRouter = require("./routes/correctSubInfo");
var popupRouter = require("./routes/popup");
var loginRouter = require("./routes/admin");



var mongoose = require("mongoose");
var port = process.env.PORT || 2721;
mongoose.connect("mongodb://cadi_project:123123@ds155418.mlab.com:55418/cadi_project"
    , {useNewUrlParser: true}, function (err) {
        if (err) console.log(new Error("DB connection failure"));
        else console.log("DB connection succeeded");
    });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('port', port);


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// 라우터
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/info', infoRouter);
app.use('/report', rptRouter);
app.use('/', detailRouter);
app.use('/correct', correctionRouter);
app.use('/', popupRouter);
app.use("/admin",loginRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


var http = require("http");
var server = http.createServer(app);
server.listen(app.get('port'), function () {
    console.log('Express server listening on port:' + app.get('port') + " ");
});


module.exports = app;
