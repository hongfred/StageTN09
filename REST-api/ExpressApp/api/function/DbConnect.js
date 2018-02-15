'use strict';
var mysql = require('mysql');
var Promise = require('bluebird');

module.exports.DBConnect = function (uid, pass) {
    //regarder pool pour la connection
    var pool = mysql.createPool({
        connectionLimit:10,
        server: 'localhost',
        user: uid,
        password: pass,
        database: 'interdependance',
        port: 1000
    });

    this.Select = function (query) {
        return new Promise(
            function (resolve, reject) {
                pool.getConnection(function (err, connection) {
                    if (err) throw err;
                    connection.query(query, function (err, result, fields) {
                            
                        resolve(result);
                            
                    });
                    connection.release();
                });
            }
        );
    }

    this.Count = function (query) {
        return new Promise(
            function (resolve, reject) {
                    pool.getConnection(function (err, connection) {
                        if (err) throw err;
                        connection.query(query, function (err, result, fields) {
                            
                            var compteur = result.length;
                            resolve(compteur);                           
                        });
                        connection.release();
                    });
            }
        );
    }

    this.InsertInto = function (query) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(query, function (err, result) {
                console.log("inster data done");
            });
            connection.release();
        });
    }
    this.Delete = function (query) {
        pool.getConnection(function (err, connection) {
            if (err) throw err;
            connection.query(query, function (err, result) {
                console.log("delete done");
            });
            connection.release();
        });
    }

}
