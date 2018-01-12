'use strict';
var express = require('express');
var router = express.Router();
var ap = require('../function/App.js')

router.get('/', function (req, res) {
    ap.test().then(function (affichageParLigne) {
        affichageParLigne = JSON.stringify(affichageParLigne);
        //console.log(affichageParLigne);
        //res.render('testSimu', { result: affichageParLigne });
        res.json(affichageParLigne);
    })

});

module.exports = router;
