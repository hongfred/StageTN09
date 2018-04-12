'use strict';
var express = require('express');
var router = express.Router();
var Promise = require('bluebird');
var myDB = require('../database')
var ap = require('../function/App.js')

router.get('/', function (req, res) {
    ap.test(myDB).then(function (affichageParLigne) {
        affichageParLigne = JSON.stringify(affichageParLigne);
        res.json(affichageParLigne);
    })

});

module.exports = router;
