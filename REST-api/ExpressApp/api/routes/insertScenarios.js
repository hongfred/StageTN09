'use strict';
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var DB = require('../function/DbConnect.js');
var Promise = require('bluebird');
var stringJ = "lol";
//stringJ = JSON.stringify(stringJ);

router.get('/', function (req, res) {
    var pUID = 'root';
    var pPASS = '020295';
    var myDB = new DB.DBConnect(pUID, pPASS);
    var sql = "INSERT INTO datafred (data) VALUES (" + stringJ + ")";
    console.log(stringJ);
    //myDB.InsertInto(sql)

    res.send(
        'insert into database done'
    );
});
module.exports = router;