'use strict';
var mysql = require('mysql');
var Promise = require('bluebird');

var wanttofetch = true;

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
                if (wanttofetch) {
                    pool.getConnection(function (err, connection) {
                        if (err) throw err;
                        connection.query(query, function (err, result, fields) {
                            
                            resolve(result);
                            
                        });
                        connection.release();
                    });
                } 
                else {
                    var reason = new Error("couldn't fetch data");
                    reject(reason); // reject
                }
            }
        );
    }
    this.SelectBis = function (query) {
        return new Promise(
            function (resolve, reject) {
                if (wanttofetch) {
                    pool.getConnection(function (err, connection) {
                        if (err) throw err;
                        connection.query(query, function (err, result, fields) {
                            
                            resolve(result);

                        });
                        connection.release();
                    });
                }
                else {
                    var reason = new Error("couldn't fetch data");
                    reject(reason); // reject
                }
            }
        );
    }
    this.Count = function (query) {
        return new Promise(
            function (resolve, reject) {
                if (wanttofetch) {
                    pool.getConnection(function (err, connection) {
                        if (err) throw err;
                        connection.query(query, function (err, result, fields) {
                            
                            var compteur = result.length;
                            resolve(compteur);                           
                        });
                        connection.release();
                    });
                } else {
                    var reason = new Error("couldn't count the data");
                    reject(reason); 
                }

            }
        );
    }

    this.InsertInto = function (query) {
        if (wanttofetch) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(query, function (err, result) {
                    console.log("inster data done");
                });
                connection.release();
            });
        }
        else {
            var reason = new Error("couldn't insert data");
            reject(reason); // reject
        }
    }
    this.Delete = function (query) {
        if (wanttofetch) {
            pool.getConnection(function (err, connection) {
                if (err) throw err;
                connection.query(query, function (err, result) {
                    console.log("delete done");
                });
                connection.release();
            });
        }
        else {
            var reason = new Error("couldn't insert data");
            reject(reason); // reject
        }
    }

}
