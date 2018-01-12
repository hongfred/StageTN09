var iniF = require('./InitFunct.js');
var rail = require('./Rail.js');
var Promise = require('bluebird');

//initialisation des du nombre et des destinations des passagers ainsi que des capacités des trains
module.exports.loop1 = function (i, heure, capaciteAccueil, Vini, _noeud, myDB) {
    return new Promise(
        function (resolve, reject) {
            var pasDeTemps = Vini.pasDeTemps;
            var tempsCorrespondanceMetro = Vini.tempsCorrespondanceMetro;
            //console.log("heure" + heure);

            var sql = "SELECT nombre FROM Entrants_aux WHERE idComposante = " + (i + 1) + " AND heure = \'" + heure + "\'";

            //AFFICHAGE
            //console.log("voici mon i: " + i)
            //console.log('HEURE: ' + heure);

            myDB.Select(sql)
                .then(function (resultats) {
                    var nbReel = 0; //le nombre NbVenantDeEnvironnement réellement pris en compte 
                    var NbVenantDeEnvironnement = Math.floor(parseFloat(resultats[0].nombre) / pasDeTemps);
                    var myint = parseInt(resultats[0].nombre) - (NbVenantDeEnvironnement * pasDeTemps);//nombre de passagers perdu dû à l'arrondie

                    //AFFICHAGE
                    //console.log(resultats);
                    //console.log("nbvenant: " + NbVenantDeEnvironnement);
                    //console.log("myint: " + myint);

                    temps = heure * pasDeTemps + 1; //encore et toujours la même technique pour rendre synchrone
                    var destination = function (temps) {//permet dans plan de gestion de créer la liste des passagers
                        if (temps <= (heure + 1) * pasDeTemps) {
                            //simule la capacité des trains, le nombre de passager venant et leur temps de correspondance
                            //ligne 140
                            loopDest(temps).then(function () {
                                temps = temps + 1;
                                destination(temps);
                            })
                        }
                        else { //permet d'attendre que le tout soit fini avant de changer de i donc de garder l'order
                            resolve();
                        }
                    }
                    destination(temps);
                    function loopDest(temps) {
                        return new Promise(
                            function (resolve3, reject) {
                                _noeud.capaciteAccueilPassagers.push(capaciteAccueil);
                                _noeud.tempsCorrespondance.push(tempsCorrespondanceMetro);

                                //AFFICHAGE
                                //console.log("temps: " + temps);
                                //console.log("heure " + heure)
                                //console.log("temps correspondance" + _noeud.tempsCorrespondance)
                                //_noeud.tempsMoyenAvantPriseEnCharge = 0;
                                if (myint > 0) {
                                    _noeud.nombreDePassagersVenantDeEnv.push(NbVenantDeEnvironnement + 1);
                                    myint--;
                                    nbReel = NbVenantDeEnvironnement + 1;
                                }
                                else {
                                    _noeud.nombreDePassagersVenantDeEnv.push(NbVenantDeEnvironnement);
                                    nbReel = NbVenantDeEnvironnement;
                                }
                                //console.log(_noeud.nombreDePassagersVenantDeEnv)
                                //console.log(nbReel)

                                var dest = [];//station de destination de chaque passager
                                sql = "SELECT nombre FROM descendants WHERE heure = \'" + heure + "\' order by idcomposante";
                                myDB.Select(sql)
                                    .then(function (resultats) {
                                        //console.log("nbReel dedans: " + nbReel);
                                        //console.log(resultats.length);
                                        var sommeDestination = 1;//pour éviter des divisions par 0 lorsqu'il n'y a pas de passagers dans le système
                                        var iterSortie = 0;

                                        for (iterSortie = 0; iterSortie < resultats.length; iterSortie++) {
                                            sommeDestination += parseInt(resultats[iterSortie].nombre);
                                        }
                                        //console.log('sommeDesti: ' + sommeDestination);
                                        var listeProba = [];
                                        listeProba.push(parseFloat(resultats[0].nombre) / sommeDestination);


                                        for (iterSortie = 1; iterSortie < resultats.length; iterSortie++) {
                                            listeProba.push(listeProba[iterSortie - 1] + parseFloat(resultats[iterSortie].nombre) / sommeDestination);
                                            //console.log('liste prob: ' + listeProba);
                                        }

                                        var rnd = Math.random();
                                        var myRandom = Math.random();  //pourquoi double random avec my random qui utilise rnd
                                        var myDest = -1;


                                        //console.log("nb reel: " + nbReel);
                                        for (var iterDest = 0; iterDest < nbReel; iterDest++) {
                                            var exit = false;

                                            for (iterSortie = 0; iterSortie < resultats.length; iterSortie++) {
                                                //TEST CONDITION
                                                //console.log('look' + listeProba[iterSortie])
                                                //console.log('look bis' + myRandom)

                                                if (listeProba[iterSortie] > myRandom) {
                                                    //console.log('iter de sortie' + iterSortie)
                                                    myDest = iterSortie;
                                                    exit = true;
                                                    if (myDest == i) { //permet de vérifier que le passager ne va jamais descendre où il est monté
                                                        iterSortie = 0; //du coup on recommence la boucle qui trouve une desti random 
                                                        exit = false;
                                                        myRandom = Math.random();
                                                    }
                                                }
                                                //console.log("exit " + exit);

                                                if (exit) {
                                                    break;
                                                }
                                            }
                                            if (myDest == -1) {
                                                myDest = 356;
                                            }

                                            //AFFICHAGE 
                                            //while (myDest == i) 
                                            //{ myDest = rnd.Next(0, resultats[0].Count); }
                                            //console.log('mydest' + myDest);
                                            //console.log('dest av' + dest);
                                            dest.push(myDest);

                                            myRandom = Math.random();
                                            //console.log(myRandom);
                                        }
                                        _noeud.destinationPassagers.push(dest);
                                        resolve3();
                                    })
                                    .catch(function (error) {
                                        console.log(error.message);
                                    })
                            })
                    }//ici finit destination
                })
                .catch(function (error) {
                    console.log(error.message);
                })
        }
    )
}


//initialisation des voisins de chaque gare
module.exports.loop2 = function (i, j, Vini, capacite1, _noeud, myDB) { //trouve l'operabilité d'un lien, la capacité du lien, le temps moyen avant prise en charge, la distance pour un voisin

    var pasDeTemps = Vini.pasDeTemps;
    var tempsMoyenAvantPriseEnChargeRERPointe = Vini.tempsMoyenAvantPriseEnChargeRERPointe;
    var tempsMoyenAvantPriseEnChargeRERCreuse = Vini.tempsMoyenAvantPriseEnChargeRERCreuse;
    var tempsMoyenAvantPriseEnChargeMetroPointe = Vini.tempsMoyenAvantPriseEnChargeMetroPointe;
    var tempsMoyenAvantPriseEnChargeMetroCreuse = Vini.tempsMoyenAvantPriseEnChargeMetroCreuse;

    var sql = "SELECT * FROM liensEntreComposantes where idComposanteDepart =" + (i + 1) + " AND idComposanteArrive = " + (j + 1);
    myDB.Select(sql)
        .then(function (nbLiens) {
            //console.log(nbLiens);
            if (nbLiens.length > 0) {
                //console.log('j où on trouve les liens: ' + j);
                //MAJ des informations sur le lien (i,j)
                var lesLignes = [];
                var tpsParcours = [];
                var distances = [];
                sql = "SELECT ligne, Distance, tempsParcours FROM liensEntreComposantes where idComposanteDepart =" + (i + 1) + " AND idComposanteArrive = " + (j + 1);
                myDB.Select(sql)
                    .then(function (resultats) {
                        //console.log(resultats);
                        for (var k = 0; k < resultats.length; k++) {
                            lesLignes.push(resultats[k].ligne);//il peut y avoir plusieurs liens (i,j)
                            distances.push(parseInt(resultats[k].Distance));
                            tpsParcours.push(parseInt(resultats[k].tempsParcours));
                        }

                        for (var k = 0; k < lesLignes.length; k++) {
                            var _fluxDePassagersVersVoisin = new rail.Rail();
                            _fluxDePassagersVersVoisin.indiceVoisin = j;
                            _fluxDePassagersVersVoisin.nbPasEnvoyes = 0;//A supprimer????
                            _fluxDePassagersVersVoisin.ligne = lesLignes[k];
                            _fluxDePassagersVersVoisin.distance = distances[k];


                            for (var heure = 0; heure <= /*23*/23; heure++) {
                                for (temps = heure * pasDeTemps + 1; temps <= (heure + 1) * pasDeTemps; temps++) {
                                    _fluxDePassagersVersVoisin.tempsParcoursLien.push(tpsParcours[k]);
                                    //if ((_fluxDePassagersVersVoisin.ligne == "ligneA") || (_fluxDePassagersVersVoisin.ligne == "ligneB"))
                                    //    _fluxDePassagersVersVoisin.tempsParcoursLien.push(tempsDeParcoursLienRER);
                                    //else
                                    //{
                                    //    if (_fluxDePassagersVersVoisin.ligne == "ligne1") _fluxDePassagersVersVoisin.tempsParcoursLien.push(1);
                                    //    else _fluxDePassagersVersVoisin.tempsParcoursLien.push(tempsDeParcoursLienMetro);
                                    //}
                                    if ((iniF.heureDePointe(temps, pasDeTemps)) && (_fluxDePassagersVersVoisin.ligne == "ligneA" || _fluxDePassagersVersVoisin.ligne == "ligneB"))
                                        _fluxDePassagersVersVoisin.tempsMoyenAvantPriseEnCharge.push(tempsMoyenAvantPriseEnChargeRERPointe);
                                    if (!(iniF.heureDePointe(temps, pasDeTemps)) && (_fluxDePassagersVersVoisin.ligne == "ligneA" || _fluxDePassagersVersVoisin.ligne == "ligneB"))
                                        _fluxDePassagersVersVoisin.tempsMoyenAvantPriseEnCharge.push(tempsMoyenAvantPriseEnChargeRERCreuse);

                                    if ((iniF.heureDePointe(temps, pasDeTemps)) && !(_fluxDePassagersVersVoisin.ligne == "ligneA" || _fluxDePassagersVersVoisin.ligne == "ligneB"))
                                        _fluxDePassagersVersVoisin.tempsMoyenAvantPriseEnCharge.push(tempsMoyenAvantPriseEnChargeMetroPointe);
                                    if (!(iniF.heureDePointe(temps, pasDeTemps)) && !(_fluxDePassagersVersVoisin.ligne == "ligneA" || _fluxDePassagersVersVoisin.ligne == "ligneB"))
                                        _fluxDePassagersVersVoisin.tempsMoyenAvantPriseEnCharge.push(tempsMoyenAvantPriseEnChargeMetroCreuse);

                                    //cette capacité doit être la quantité moyenne de places disponibles 
                                    //dans les trains à la station i pendant cette période.
                                    _fluxDePassagersVersVoisin.capaciteDuLien.push(Math.floor(capacite1 / pasDeTemps));//A supprimer???
                                    _fluxDePassagersVersVoisin.operabilite.push(true);
                                }
                            }
                            _noeud.voisins.push(_fluxDePassagersVersVoisin);
                            //console.log(_noeud.voisins)
                        }

                    })
                    .catch(function (error) {
                        console.log(error.message);
                    })
            }
        })
        .catch(function (error) {
            console.log(error.message);
        })
}


module.exports.loop3 = function (i, iter, Vini, _noeud, myDB) {
    return new Promise(
        function (resolve, reject) {
            var nbGares = Vini.nbGares;
            //console.log((i * nbGares + (iter + 1)));
            sql = "SELECT parcours FROM parcours where id= " + (i * nbGares + (iter + 1));
            myDB.Select(sql)
                .then(function (resultats) {
                    //console.log("parcours: " + resultats[0].parcours);
                    _noeud.parcoursTEMPS.push(resultats[0].parcours);

                    //calcule du coût de ce parcours normal
                    iniF.coutNominalParcours(resultats[0].parcours, myDB, Vini)
                        .then(function (result) {
                            _noeud.tempsParcoursTEMPS.push(result);
                            //console.log("trouver iter: " + iter);
                            resolve(); //permet de garder les iter dans l'ordre
                        })
                })
        })
}


module.exports.coutNominalParcours= function(parcours, myDB, Vini) { //ça marche
    return new Promise(
        function (resolve, reject) {

            var tempsAvantPriseEnChargeMetro = Vini.tempsAvantPriseEnChargeMetro;
            var tempsAvantPriseEnChargeRER = Vini.tempsAvantPriseEnChargeRER; //Cela modélise le temps de parcours depuis l'entrée de la station jusqu'au quai
            var tempsCorrespondanceRER = Vini.tempsCorrespondanceRER;
            var tempsCorrespondanceMetro = Vini.tempsCorrespondanceMetro;
            var tempsDeParcoursLienRER = Vini.tempsDeParcoursLienRER;
            var tempsDeParcoursLienMetro = Vini.tempsDeParcoursLienMetro;

            var sql = "";

            var lesLignes = [];
            var lienPrecedent = "";

            var strArray = parcours.split('-');
            var tempsParcours = 0;

            if (strArray.length <= 1) {
                resolve(0);
            }
            else {//si le trajet est plus long que seulement un trajet sur lui même
                //console.log(strArray.length)
                /*for (var i = 0; i <= strArray.length - 2; i++) {
                    loop(i);
                }*/
                var i = 0;
                var calculParcours = function (i) { //récursivité très efficace pour imposer une itération de la boucle synchrone
                    if (i <= strArray.length - 2) {
                        //console.log(i);
                        loop(i).then(function () {
                            i = i + 1;
                            calculParcours(i);
                        })
                    }
                }
                calculParcours(i);
                function loop(i) {
                    return new Promise(
                        function (resolve2, reject2) {
                            if (i == 0) {
                                //console.log((parseInt(strArray[i]) + 1), (parseInt(strArray[i + 1]) + 1));
                                sql = "SELECT ligne FROM liensEntreComposantes where idComposanteDepart =" + (parseInt(strArray[i]) + 1) + " AND idComposanteArrive = " + (parseInt(strArray[i + 1]) + 1);
                                myDB.Select(sql)
                                    .then(function (resultats) {
                                        lesLignes.length = 0; //clear the array
                                        for (var k = 0; k < resultats.length; k++) {
                                            lesLignes.push(resultats[k].ligne);//multigraphe. il peut y avoir deux liens
                                        }
                                        //console.log(lesLignes)
                                        if (lesLignes.length > 1) {
                                            if (strArray.length == 2) {
                                                if (lesLignes[0] == "ligneA" || lesLignes[0] == "ligneB") {
                                                    tempsParcours += tempsAvantPriseEnChargeRER + tempsDeParcoursLienRER;
                                                    //resolve(tempsParcours);
                                                }
                                                else {
                                                    tempsParcours += tempsAvantPriseEnChargeMetro + tempsDeParcoursLienMetro;
                                                    //resolve(tempsParcours);
                                                }
                                            }
                                            else {
                                                sql = "SELECT ligne FROM liensEntreComposantes where idComposanteDepart =" + (parseInt(strArray[i + 1]) + 1) + " AND idComposanteArrive = " + (parseInt(strArray[i + 2]) + 1);
                                                myDB.Select(sql)
                                                    .then(function (resultats) {
                                                        for (var k = 0; k < lesLignes.length; k++) {
                                                            //on privilégie moins de correspondances
                                                            if (lesLignes[k] == resultats[0].ligne) {
                                                                lienPrecedent = lesLignes[k];
                                                                break;
                                                            }
                                                            else {
                                                                lienPrecedent = lesLignes[k];
                                                            }
                                                        }
                                                        if (lienPrecedent == "ligneA" || lienPrecedent == "ligneB") {
                                                            tempsParcours += tempsAvantPriseEnChargeRER + tempsDeParcoursLienRER;
                                                        }
                                                        else {
                                                            tempsParcours += tempsAvantPriseEnChargeMetro + tempsDeParcoursLienMetro;
                                                        }
                                                    })
                                                    .catch(function (error) {
                                                        console.log(error.message);
                                                    })
                                            }
                                        }
                                        else {
                                            if (lesLignes.length == 1) {
                                                lienPrecedent = lesLignes[0];
                                                if (lienPrecedent == "ligneA" || lienPrecedent == "ligneB")
                                                { tempsParcours += tempsAvantPriseEnChargeRER + tempsDeParcoursLienRER; }
                                                else
                                                { tempsParcours += tempsAvantPriseEnChargeMetro + tempsDeParcoursLienMetro; }
                                            }
                                        }
                                        //console.log('temps parcours: ' + tempsParcours);
                                        //console.log('str length: ' + strArray.length);
                                        //console.log('i: ' + i);
                                        if (strArray.length == 2) {
                                            //console.log('temps parcours: ' + tempsParcours);
                                            resolve(tempsParcours);
                                        }
                                        resolve2();
                                    })
                                    .catch(function (error) {
                                        console.log(error.message);
                                    })

                            } //ligne602
                            else {
                                //console.log((parseInt(strArray[i]) + 1), (parseInt(strArray[i + 1]) + 1))
                                sql = "SELECT ligne FROM liensEntreComposantes where idComposanteDepart =" + (parseInt(strArray[i]) + 1) + " AND idComposanteArrive = " + (parseInt(strArray[i + 1]) + 1);
                                myDB.Select(sql)
                                    .then(function (resultats) {
                                        lesLignes.length = 0; //clear the array
                                        for (var k = 0; k < resultats.length; k++) {
                                            lesLignes.push(resultats[k].ligne);
                                        }
                                        if (lesLignes.length > 1) {
                                            var choisi = "";
                                            for (var k = 0; k < lesLignes.length; k++) {
                                                if (lesLignes[k] == lienPrecedent) {
                                                    choisi = lesLignes[k];
                                                    break;
                                                }
                                                else {
                                                    choisi = lesLignes[k];
                                                }
                                            }
                                            if (choisi == lienPrecedent) {
                                                if (choisi == "ligneA" || choisi == "ligneB") {
                                                    tempsParcours += 3;
                                                }
                                                else {
                                                    tempsParcours += 2;
                                                }
                                            }
                                            else {
                                                if (choisi == "ligneA" || choisi == "ligneB") {
                                                    tempsParcours += tempsCorrespondanceRER + tempsDeParcoursLienRER;
                                                    lienPrecedent = choisi;
                                                }
                                                else {
                                                    tempsParcours += tempsCorrespondanceMetro + tempsDeParcoursLienMetro;
                                                    lienPrecedent = choisi;
                                                }
                                            }
                                        }
                                        else {
                                            if (lesLignes.length == 1) {
                                                if (resultats[0].ligne == lienPrecedent) {
                                                    if (resultats[0].ligne == "ligneA" || resultats[0].ligne == "ligneB") {
                                                        tempsParcours += 3;
                                                    }
                                                    else {
                                                        tempsParcours += 2;
                                                    }
                                                }
                                                else {
                                                    if (resultats[0].ligne == "ligneA" || resultats[0].ligne == "ligneB") {
                                                        tempsParcours += tempsCorrespondanceRER + tempsDeParcoursLienRER;
                                                        lienPrecedent = resultats[0].ligne;
                                                    }
                                                    else {
                                                        tempsParcours += tempsCorrespondanceMetro + tempsDeParcoursLienMetro;
                                                        lienPrecedent = resultats[0].ligne;
                                                    }
                                                }
                                            }
                                        }
                                        //console.log('temps2: ' + tempsParcours)
                                        //console.log('str length: ' + strArray.length);
                                        //console.log('i: ' + i);
                                        if (i + 2 == strArray.length) {
                                            //console.log('temps parcours: ' + tempsParcours)
                                            resolve(tempsParcours);
                                        }
                                        resolve2();
                                    })
                                    .catch(function (error) {
                                        console.log(error.message);
                                    })
                            }
                        })
                }

            }
            // ?????
        }
    )
}


//ligne 542
module.exports.heureDePointe = function (temps, pasDeTemps) { //ça marche
    return ((temps >= pasDeTemps * 7.5 && temps <= pasDeTemps * 9.5) || (temps >= pasDeTemps * 16.5 && temps <= pasDeTemps * 19.5));
}