var mysql = require('mysql');
var myDB;
var pUID = 'root';
var pPASS = '020295';
var DB = require('./function/DbConnect.js');

function connectDatabase() {
    if (!myDB) {
        var myDB = new DB.DBConnect(pUID, pPASS);
    }
    return myDB;
}

module.exports = connectDatabase();