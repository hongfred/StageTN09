'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var Promise = require('bluebird');
var myDB = require('../database')


router.post('/', function (req, res) {
    console.log(req.body[0].cas)
    var cas = JSON.stringify(req.body[0].cas)
    var sql = "INSERT INTO datafred (data) VALUES (" + cas + ")";
    myDB.InsertInto(sql)

    res.json(
        'Insert done'
    );
});
module.exports = router;