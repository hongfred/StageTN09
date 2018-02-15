'use strict';
var express = require('express');
var router = express.Router();
var myDB = require('../database')
var Promise = require('bluebird');

//stringJ = JSON.stringify(stringJ);

//attention injection sql, y jeter un coup d'oeil pour le faire corectement
router.get('/:type', function (req, res) {
    console.log(req.params.type);
    if (req.params.type=== 'ligne') {
        var sql = "SELECT * FROM atelier";
        console.log(sql);
        myDB.Select(sql)
            .then(function (result) {
                console.log(result);
                res.json(
                    result
                );
            })
    }
    if (req.params.type === 'composants') {
        var sql = "SELECT idcomposante,NomComposante FROM composantes";
        console.log(sql);
        myDB.Select(sql)
            .then(function (result) {
                console.log(result);
                res.json(
                    result
                );
            })
    }
});

router.get('/composants/:ligne', function (req, res) {
    var sql = "SELECT DISTINCT idComposanteDepart FROM liensentrecomposantes where ligne= '" + req.params.ligne + "';";
    myDB.Select(sql)
        .then(function (result) {
            var promises = [];
            for (var i = 0; i < result.length; i++) {
                sql = "SELECT idcomposante,NomComposante FROM composantes WHERE composantes.idcomposante=" + result[i].idComposanteDepart + ";";
                promises.push(recupNom(sql))
            }
            Promise.all(promises)
                .then(function (listComponent) {
                    console.log(listComponent)
                    res.json(
                        listComponent
                    );

                })
        })
});

router.get('/voisins/:ligne/:id', function (req, res) {
    console.log(req.params.ligne)
    console.log(req.params.id)
    var sql = "SELECT liensentrecomposantes.idComposanteArrive FROM composantes INNER JOIN liensentrecomposantes ON composantes.idcomposante = liensentrecomposantes.idComposanteDepart AND composantes.idcomposante=" + req.params.id + " AND liensentrecomposantes.ligne='"+req.params.ligne+"';";
    myDB.Select(sql)
        .then(function (result) {
            console.log(result)
            var promises = [];
            for (var i = 0; i < result.length; i++) {
                sql = "SELECT idcomposante,NomComposante FROM composantes WHERE composantes.idcomposante=" + result[i].idComposanteArrive + ";";
                promises.push(recupNom(sql))
            }
            Promise.all(promises)
                .then(function (listComponent) {
                    console.log(listComponent)
                    res.json(
                        listComponent
                    );

                })

        })
});

function recupNom(sql) {
    return new Promise(
        function (resolve, reject) {
            myDB.Select(sql)
                .then(function (res) {
                    resolve(res[0]);
                })
        }
    )
}

module.exports = router;