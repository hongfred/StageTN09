'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');

var routes = require('./routes/index');
var users = require('./routes/users');
var testSimu = require('./routes/testSimu');
var insertScenarios = require('./routes/insertScenarios');
var fetch = require('./routes/fetch');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(function (req, res, next) {
    var time = new Date().toLocaleString();
    var log_string = time + "  IP:  " + req.ip + " Method: " + req.method + "  Url: " + req.originalUrl + "  Body: " + JSON.stringify(req.body);
    console.log(log_string);
    fs.appendFile("Api_log.log", log_string + '\r\n', 'utf-8', function (err) { if (err) { throw Error(err); } });
    res.set({ 'Access-Control-Allow-Origin': '*' });
    res.set({ 'Access-Control-Allow-Credentials': true });
    res.set({ 'Access-Control-Allow-Headers': 'content-type' });
    res.set({ 'Access-Control-Allow-Methods': 'POST,GET,PUT,OPTIONS' });
    next();
});
/*
app.use(function (req, res, next) {
    if (req.method == 'OPTIONS') {
        res.set({ 'Access-Control-Allow-Methods': 'POST,GET,PUT,OPTIONS' });
        res.set({ 'Access-Control-Allow-Headers': 'content-type' });
        res.status(204);
        next();
    }
});*/

app.use('/', routes);
app.use('/users', users);
app.use('/testSimu', testSimu);
app.use('/insertScenarios', insertScenarios);
app.use('/fetch', fetch); 

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
