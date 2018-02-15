'use strict';

var Promise = require('bluebird');
var mysql = require('mysql');
var DB = require('./DbConnect.js');
var struct = require('./Structure.js');
var rail = require('./Rail.js');
var direction = require('./Direction.js');
var inc = require('./Incident.js');
var sortod = require('./sortOnHeureDebut.js');
var pass = require('./Passager.js');
var tr = require('./Train.js');
var result = require('./Resultat.js');
var lpt = require('./LienPccTrain.js');
var VaIni = require('./VarIni.js');
var res = require('./Reseau.js');
var iniF = require('./InitFunct.js');
var rech = require('./Recherche.js');

//bool sansScenario = false;//permet d'executer la partie scénarion ou pas

var SORTIE = false;//permet de ne pas executer le modèle si on a pas chargé le fichier XML

//var ContextMenuStrip lstPerturbationsContextMenu;//menu click droit sur les scénarios dans l'interface graphique

//Reseau reseau = new Reseau();
//Les données transport
//var gares = []; //type gare
//var directions = [];
//List < List < int >> resultatsRef;
var affichageParLigne = [[]]; //int
//var scenarios = []; //liste de scenarios
var incidents = []; //list d'incidents
var incidentsBackup = []; //liste de procédure
/*
Transport transport = new Transport();

//les données Energie
List < PHT > PHTs;
List < PR > PRs;
List < PEF > PEFs;

Energie energie = new Energie();

//Les données Organisation
List < Noeud > batiments;
List < PCC > PCCs;
List < Atelier > Ateliers;
List < ChefDeGare > ChefsDeGare;

Organisation organisation = new Organisation();

//les données Telecommunication
List < Serveur > serveurs;
List < LocalTechnique > locauxTechnique;

Telecommunication telecommunication = new Telecommunication();*/

var resultat = new result.AfficheResultats();

//graphe dynamique
var tabBetweeness = [[[[]]]]; //int 4 dimensions
var tabAverageShortestPath = [[[]]]; //float  3 dimensions
var myListPCC = []; //float


// <summary>
// Fonction permettant d'initialiser les structure nécessaires à la modélisation et à la simulation du modèle
// </summary>
var initialisation = function (Vini, reseau,myDB) {
    return new Promise(
        function (resolve, reject) {
            //initialisation des var ini
            var pUID = Vini.pUID;
            var pPASS = Vini.pPASS;
            var heureDebut = Vini.heureDebut;
            var nbGares = Vini.nbGares;

            //initialisation des var reseau
            var gares = reseau.gares;

            var sql = "SELECT * FROM Composantes";
            var resultats = [];
            var rd = Math.random();

           
            myDB.Count(sql)
                .then(function (compteurGares) {
                    //console.log('mon compteur: ' + compteurGares);
                    nbGares = compteurGares;
                    Vini.nbGares = compteurGares;
                    //if (!chkDonneesXML.Checked) {
                    var temps;

                    //#region Transport
                    //Première grande LOOP avec le nombre de gare, on initialise toutes les gares
                    var i = 0;
                    var initia = function (i) {
                        if (i < /*nbGares*/357) {
                            console.log('iniGares: ' + i);
                            execution(i).then(function () {
                                i = i + 1;
                                initia(i);
                            })

                        }
                        else { //c'est iCi que  l'ini se finit, c'est pour ça qu'on appelle le tout ici
                            //appel des grosses fonctions

                            //direction.MajDirections(Vini, reseau); A REMETTREEEEE
                            console.log("INITIALISATION DONE");
                            console.log("");
                            console.log("");
                            //console.log(reseau.gares[0]); 
                            for (var m = 0; m < gares.length; m++) {
                                //console.log(gares[m])
                            }
                            for (var m = 0; m < reseau.directions.length; m++) {
                                //console.log(reseau.directions[m].ligne);
                            }
                            planDeGestion(Vini, reseau)
                                .then(function (affichageParLigne) {
                                    //on return le résultat qu'on a tout à la fin 
                                    console.log(affichageParLigne);
                                    resolve(affichageParLigne);
                            })

                            //return 0;
                        }
                    }
                    initia(i);
                    function execution(i) {
                        return new Promise(
                            function (resolve2, reject2) {
                                var capacite1 = 10000000;
                                var capaciteAccueil = 15000;
                                var _noeud = new struct.Structure();
                                _noeud.Gare();
                                _noeud.indice = i;
                                sql = "SELECT nomComposante FROM Composantes WHERE idComposante = ";
                                sql += i + 1;
                                myDB.Select(sql)
                                    //initialise le nombre et la desti des passagers ainsi que la capacité des trains
                                    .then(function (resultats) {
                                        _noeud.nom = resultats[0].nomComposante;
                                        //maj des informations sur le noeud i
                                        var heure = 0;
                                        var entreEnv = function (i, heure, capaciteAccueil, Vini, _noeud, myDB) {//permet dans plan de gestion de créer la liste des passagers
                                            if (heure <= /*23*/0) { //j'utilise cette méthode avec le if à la place du for pour rendre le tout synchrone
                                                //simule la capacité des trains, le nombre de passager venant et leur temps de correspondance
                                                //ligne 140
                                                iniF.loop1(i, heure, capaciteAccueil, Vini, _noeud, myDB)
                                                    .then(function () {
                                                        heure = heure + 1;
                                                        entreEnv(i, heure, capaciteAccueil, Vini, _noeud, myDB);
                                                    })
                                            }
                                            else { //permet d'attendre que le tout soit fini avant de changer de i donc de garder l'order
                                                return 0;
                                            }
                                        }
                                        entreEnv(i, heure, capaciteAccueil, Vini, _noeud, myDB);
                                    })

                                    //permet de trouver les voisins de chaque gares
                                    .then(function () {
                                        //2 ème petite LOOP avec j
                                        for (var j = 0; j < /*nbGares*/357; j++) { //permet à maj direction de se faire
                                            //ligne 205
                                            //pareil que pour loop1
                                            iniF.loop2(i, j, Vini, capacite1, _noeud, myDB);
                                        }
                                    })

                                    //initialise les parcours et leur temps de parcours
                                    .then(function () {
                                        _noeud.parcoursTEMPS = [];//liste, par rapport au noeud de destination, des parcours en plus court chemin en temps
                                        _noeud.tempsParcoursTEMPS = [];//liste, par rapport au noeud de destination, des temps de parcours

                                        //3ème petite loop
                                        //solution pour que tout soit dans l'ordre et pas random, rendre synchrone le non synchrone!
                                        var iter = 0;
                                        var distance = function (i, iter, Vini, _noeud, myDB) {//calcul tous les temps de parcours des différents trajets
                                            if (iter < /*nbGares*/5) {
                                                //console.log(it2);
                                                iniF.loop3(i, iter, Vini, _noeud, myDB)
                                                    .then(function () {
                                                        iter = iter + 1;
                                                        distance(i, iter, Vini, _noeud, myDB);
                                                    })
                                            }
                                            else { //permet d'attendre que le tout soit fini avant de changer de i donc de garder l'ordre, de plus ça push une gares à chaque i
                                                gares.push(_noeud);
                                                resolve2();
                                            }
                                        }
                                        distance(i, iter, Vini, _noeud, myDB);
                                    })
                                    .catch(function (error) {
                                        console.log(error.message);
                                    })

                            })
                    }

                    //on l'a quand on fait une simulation sans scénario'
                    /*var resultatsRef = [];
                    sql = "SELECT * FROM resultatreference";
                    myDB.Select(sql)
                        .then(function(resultats) {
                            for (var iterLigne = 1; iterLigne <= 18; iterLigne++) {
                                var maCharge = [];
                                for (var iterCharge = 0; iterCharge < 1440; iterCharge++) {
                                    maCharge.push(int.Parse(resultats[iterLigne][iterCharge]));
                                }
                                resultatsRef.push(maCharge);
                            }
                        })*/
                    //                MajDirections(); mis au dessus
                    //}
                    /*else
                      {
                         if (this.openFileDialogDeserialiser.ShowDialog() == DialogResult.OK) {
        
                            deSerialiser(openFileDialogDeserialiser.FileName);
                         }
                         else SORTIE = true;
                      }*/
                    //ICI se finit le graaand then
                })
                .catch(function (error) {
                    console.log(error.message);
                })
        })
};

//ligne 542
//FONCTION 
function heureDePointe(temps, pasDeTemps) { //ça marche
    return ((temps >= pasDeTemps * 7.5 && temps <= pasDeTemps * 9.5) || (temps >= pasDeTemps * 16.5 && temps <= pasDeTemps * 19.5));
}


/// <summary>
/// Simulation de l'effet des scénarios sur la capacité des trains d'une ligne (des liens d'une ligne)
/// </summary>
/// <param name="elmScenarios">un scénario</param>
//ligne 1073
function scenarioLigneCapacite(elmScenarios) { //return void

    //test fonction
    //console.log('start: ' + elmScenarios.heureDebut);
    //console.log('end: ' + (elmScenarios.heureDebut + elmScenarios.duree));

    /*console.log(gares[0].voisins);
    console.log(elmScenarios);
    elmScenarios.ligne = 'ligne1';*/

    for (var tmp = elmScenarios.heureDebut; tmp < elmScenarios.heureDebut + elmScenarios.duree; tmp++) {
        /*for (var k = 0; k < directions.length; k++)
        {
            if (directions[k].ligne == elmScenarios.ligne)
            {
                directions[k].capaciteTrains[tmp] -= (int)(directions[k].capaciteTrains[tmp] * elmScenarios.taux / 100);
            }
        }*/
        //console.log(gares.length);
        for (var k = 0; k < gares.length; k++) {
            //console.log(gares[k].voisins.length)
            for (var l = 0; l < gares[k].voisins.length; l++) {
                if (gares[k].voisins[l].ligne == elmScenarios.ligne) {
                    //gares[k].voisins[l].capaciteDuLien[tmp] -= (int)(gares[k].voisins[l].capaciteDuLien[tmp] * elmScenarios.taux / 100);
                    gares[k].voisins[l].operabilite[tmp] = false;
                    //console.log(gares[k].voisins[l])
                }
            }

        }
    }
}

/// <summary>
/// Simulation de l'effet des scénarios sur le temps de parcours d'une ligne (des liens d'une ligne)
/// </summary>
/// <param name="elmScenarios">scénario</param>
//ligne 1105
function scenarioLigneTemps(elmScenarios) { //return void
    for (var tmp = elmScenarios.heureDebut; tmp < elmScenarios.heureDebut + elmScenarios.duree; tmp++) {
        for (var k = 0; k < gares.length; k++) {
            for (var l = 0; l < gares[k].voisins.length; l++) {

                //test
                /*elmScenarios.ligne = 'ligne1';
                console.log("elm lign:" + elmScenarios.ligne);
                elmScenarios.taux = 100;
                console.log('taux: ' + elmScenarios.taux);
                console.log('res: ' + gares[k].voisins[l].tempsParcoursLien[tmp]);*/

                if (gares[k].voisins[l].ligne == elmScenarios.ligne) {
                    gares[k].voisins[l].tempsParcoursLien[tmp] += parseInt(gares[k].voisins[l].tempsParcoursLien[tmp] * elmScenarios.taux / 100);
                    //console.log('res: ' + gares[k].voisins[l].tempsParcoursLien[tmp]);
                }
            }
        }
    }
}

/// <summary>
/// Simulation de l'effet des scénarios sur la capacité d'un lien
/// </summary>
/// <param name="elmScenarios"></param>
//ligne 1126
function scenarioLienCapacite(elmScenarios) { //return void
    //test
    /*console.log('heure début: ' + elmScenarios.heureDebut);
    console.log('heure fin: ' + (elmScenarios.heureDebut + elmScenarios.duree));
    console.log('gare length: ' + gares.length);
    console.log('voisin length: ' + gares[0].voisins.length);
    console.log('indice voisin:  ' + gares[0].voisins[0].indiceVoisin);
    console.log('gare nom: ' + gares[0].nom);
    elmScenarios.nomComposanteDepart = 'ALESIA';
    elmScenarios.nomComposanteArrive = 'ABBESSES';
    console.log('compo arrivé: ' + elmScenarios.nomComposanteArrive);
    console.log('gare ligne: ' + gares[0].voisins[0].ligne);
    elmScenarios.ligne = 'ligne1';
    console.log('elm sce ligne:  ' + elmScenarios.ligne);
    console.log(gares[1].voisins[0].operabilite);*/

    for (var tmp = elmScenarios.heureDebut; tmp < elmScenarios.heureDebut + elmScenarios.duree; tmp++) {
        for (var k = 0; k < gares.length; k++) {
            if (gares[k].nom == elmScenarios.nomComposanteDepart) {
                for (var l = 0; l < gares[k].voisins.length; l++) {
                    if (gares[gares[k].voisins[l].indiceVoisin].nom == elmScenarios.nomComposanteArrive && gares[k].voisins[l].ligne == elmScenarios.ligne) {
                        //console.log("après fonction")
                        //gares[k].voisins[l].capaciteDuLien[tmp] -= (int)(gares[k].voisins[l].capaciteDuLien[tmp] * elmScenarios.taux / 100);
                        gares[k].voisins[l].operabilite[tmp] = false;
                        //console.log(gares[k].voisins[l].operabilite);
                    }
                }
            }
        }
    }
}

/// <summary>
/// Simulation de l'effet des scénarios sur le temps de parcours d'un lien
/// </summary>
/// <param name="elmScenarios"></param>
function scenarioLienTemps(elmScenarios) { //return void
    for (var tmp = elmScenarios.heureDebut; tmp < elmScenarios.heureDebut + elmScenarios.duree; tmp++) {
        for (var k = 0; k < gares.length; k++) {
            //console.log(gares[k].nom);
            elmScenarios.nomComposanteDepart = 'ABBESSES';
            if (gares[k].nom == elmScenarios.nomComposanteDepart) {
                for (var l = 0; l < gares[k].voisins.length; l++) {
                    //test
                    /*console.log(gares[gares[k].voisins[l].indiceVoisin].nom);
                    elmScenarios.nomComposanteArrive = 'ABBESSES';
                    console.log(gares[k].voisins[l].ligne);
                    elmScenarios.ligne = 'ligne1';
                    elmScenarios.taux = 1000;
                    console.log(gares[k].voisins[l].tempsParcoursLien[tmp]);
                    gares[k].voisins[l].tempsParcoursLien[tmp] = 4;*/

                    if (gares[gares[k].voisins[l].indiceVoisin].nom == elmScenarios.nomComposanteArrive
                        && gares[k].voisins[l].ligne == elmScenarios.ligne) {
                        if (gares[k].voisins[l].tempsParcoursLien[tmp] >= 4) {
                            gares[k].voisins[l].operabilite[tmp] = false;
                            //console.log(gares[k].voisins[l].operabilite[tmp]);
                        }
                        else {
                            gares[k].voisins[l].tempsParcoursLien[tmp] += parseInt(gares[k].voisins[l].tempsParcoursLien[tmp] * elmScenarios.taux / 100);
                            //console.log(gares[k].voisins[l].tempsParcoursLien[tmp]);
                        }
                    }
                }
            }
        }
    }
}

/// <summary>
/// Simulation de l'effet des scénarios sur la capacité d'un noeud
/// </summary>
/// <param name="elmScenarios"></param>
//ligne 1179
function scenarioNoeudCapacite(elmScenarios) { //return void
    for (var tmp = elmScenarios.heureDebut; tmp < elmScenarios.heureDebut + elmScenarios.duree; tmp++) {
        /*for (var k = 0; k < gares.Count; k++)
        {
            if (gares[k].nom == elmScenarios.nomComposanteAReduire)
            {
                gares[k].capaciteAccueilPassagers[tmp] -= (int)(gares[k].capaciteAccueilPassagers[tmp] * elmScenarios.taux / 100);
                return;
            }
        }*/

        for (var k = 0; k < gares.length; k++) {

            for (var l = 0; l < gares[k].voisins.length; l++) {
                //test
                /*elmScenarios.ligne = 'ligne1';
                console.log(gares[0].voisins[0].ligne)
                elmScenarios.taux = 10;
                console.log('taux: ' + elmScenarios.taux)
                console.log('capacité: ' + gares[k].voisins[l].capaciteDuLien[tmp])*/

                if (gares[k].voisins[l].ligne == elmScenarios.ligne) {
                    gares[k].voisins[l].capaciteDuLien[tmp] -= parseInt(gares[k].voisins[l].capaciteDuLien[tmp] * elmScenarios.taux / 100);
                    //console.log("res: " + gares[k].voisins[l].capaciteDuLien[tmp]);
                    //gares[k].voisins[l].operabilite[tmp] = false;
                }
            }

        }
    }
}

/// <summary>
/// Simulation de l'effet des scénarios sur le temps de parcours dans un noeud
/// </summary>
/// <param name="elmScenarios"></param>
//ligne 1211
function scenarioNoeudTemps(elmScenarios) { //return void
    for (var tmp = elmScenarios.heureDebut; tmp < elmScenarios.heureDebut + elmScenarios.duree; tmp++) {
        for (var k = 0; k < gares.length; k++) {
            //test
            /*elmScenarios.nomComposanteDepart = 'ABBESSES';
            elmScenarios.nomComposanteArrive = 'ABBESSES';
            console.log(gares[k].nom);
            elmScenarios.ligne = 'ligne1';
            console.log(elmScenarios.ligne)
            elmScenarios.taux = 20;*/

            if (gares[k].nom == elmScenarios.nomComposanteDepart) {

                for (var l = 0; l < gares[k].voisins.length; l++) {
                    //console.log(gares[k].voisins[l].ligne);


                    if (gares[gares[k].voisins[l].indiceVoisin].nom == elmScenarios.nomComposanteArrive && elmScenarios.ligne.includes(gares[k].voisins[l].ligne)) {

                        //AFFICHAGE
                        //gares[iterNoeud].tempsCorrespondance[temps]
                        //gares[k].voisins[l].tempsMoyenAvantPriseEnCharge[tmp] += (int)(gares[k].voisins[l].tempsMoyenAvantPriseEnCharge[tmp] * elmScenarios.taux / 100);
                        //gares[k].voisins[l].tempsMoyenAvantPriseEnCharge[tmp] += elmScenarios.taux;
                        gares[k].tempsCorrespondance[tmp] += elmScenarios.taux;
                        //console.log(gares[k].tempsCorrespondance)
                    }
                }
            }
        }
    }
}

//ligne 1237 scénario
function scenario(Vini, reseau) { //void

    //ligne 1654
    //initialisation var ini
    var debutScenario = Vini.debutScenario;
    //initialisation reseau
    //var scenarios = reseau.scenarios;

    var sql = "";
    var resultats = []; //liste de string
    var pert = new inc.Incident();//Scenario
    pert.Scenario();
    //console.log(pert);
    var myListe = []; //liste de int
    var myDB = new DB.DBConnect(pUID, pPASS);

    var supprimerDernierElt;
    var tempsSupplementaire;

    //test du if
    /*var stop = 'true';
    var sc1 = new inc.Incident;
    sc1.Scenario();
    sc1.choix = 1;
    sc1.heureDebut = 1;
    sc1.duree = 1;
    incidents[0] = sc1;
    var sc2 = new inc.Incident;
    sc2.Scenario();
    sc2.choix = 2;
    sc2.heureDebut = 0;
    sc2.duree = 1;
    incidents[1] = sc2;
    var sc3 = new inc.Incident;
    sc3.Scenario();
    sc3.choix = 3;
    sc3.heureDebut = 0;
    sc3.duree = 1;
    incidents[2] = sc3;
    var sc4 = new inc.Incident;
    sc4.Scenario();
    sc4.choix = 11;
    sc4.heureDebut = 0;
    sc4.duree = 1;
    incidents[3] = sc4;
    var sc5 = new inc.Incident;
    sc5.Scenario();
    sc5.choix = 22;
    sc5.heureDebut = 0;
    sc5.duree = 1;
    incidents[4] = sc5;
    var sc6 = new inc.Incident;
    sc6.Scenario();
    sc6.choix = 33;
    sc6.heureDebut = 0;
    sc6.duree = 1;
    incidents[5] = sc6;*/

    //test du else
    //var sc1 = new inc.Incident;
    //sc1.Scenario();
    //sc1.type = 'lol';
    //incidents[0] = sc1;
    //console.log(incidents.length);

    while (incidents.length > 0 && stop) {
        var soh = new sortod.sortOnHeureDebut();
        //console.log(soh);
        //incidents.sort(soh);
        //console.log(incidents);

        //lorsqu'on rajoute des proc à "incidents" on met cette variable à false (et on fait break pour quitter la proc courante. 
        //Pour proc PHT, avant de rajouter les élts, on note la position de la proc courante
        //puis on la supprime après avoir ajouté les proc.
        supprimerDernierElt = true;

        if (incidents[incidents.length - 1].type == "Scenario") {
            //int positionScenarion;
            var elmScenarios = new inc.Incident();
            elmScenarios.Scenario();
            elmScenarios = incidents[incidents.length - 1];
            //positionScenarion = incidents.length - 1;
            debutScenario = elmScenarios.heureDebut;
            if (elmScenarios.choix == 1) scenarioLigneCapacite(elmScenarios);
            if (elmScenarios.choix == 2) scenarioLienCapacite(elmScenarios);
            if (elmScenarios.choix == 3) scenarioNoeudCapacite(elmScenarios);

            if (elmScenarios.choix == 11) scenarioLigneTemps(elmScenarios);
            if (elmScenarios.choix == 22) scenarioLienTemps(elmScenarios);
            if (elmScenarios.choix == 33) scenarioNoeudTemps(elmScenarios);
            /*incidents.splice(positionScenario, 1);
            supprimerDernierElt = false;*/
        }
        else {
            var procedure = new inc.Incident();
            procedure.Procedure();
            console.log(procedure);
            switch (procedure.typeComposanteDefaillante) {
                case "PCC":
                    //#region partie PCC
                    positionPHT = incidents.Count - 1;
                    tempsSupplementaire = 0;
                    for (var k = 0; k < procedure.actions.length; k++) {
                        var arretTrafic = 0;
                        switch (procedure.actions[k].nomAction) {
                            case "Arret du trafic":
                                arretTrafic = procedure.actions[k].duree;
                                break;

                            case "PCC de replie":
                                break;

                            case "PCC-Consequence":
                                if (procedure.actions[k].duree < arretTrafic) {
                                    for (var ttmp = procedure.heureDebut; ttmp < procedure.heureDebut + procedure.actions[k].duree; ttmp++) {
                                        for (var kk = 0; kk < gares.length; kk++) {
                                            for (var ll = 0; ll < gares[kk].voisins.length; ll++) {
                                                if (gares[kk].voisins[ll].ligne == procedure.nomComposanteDefaillante) {
                                                    gares[kk].voisins[ll].operabilite[ttmp] = false;
                                                }
                                            }
                                        }
                                    }
                                }
                                else {
                                    for (var ttmp = procedure.heureDebut; ttmp < procedure.heureDebut + arretTrafic; ttmp++) {
                                        for (var kk = 0; kk < gares.length; kk++) {
                                            for (var ll = 0; ll < gares[kk].voisins.length; ll++) {
                                                if (gares[kk].voisins[ll].ligne == procedure.nomComposanteDefaillante) {
                                                    gares[kk].voisins[ll].operabilite[ttmp] = false;
                                                }
                                            }
                                        }
                                    }

                                    for (var ttmp = procedure.heureDebut + arretTrafic; ttmp < procedure.heureDebut + procedure.actions[k].duree; ttmp++) {
                                        for (var kk = 0; kk < gares.length; kk++) {
                                            for (var ll = 0; ll < gares[kk].voisins.length; ll++) {
                                                if (gares[kk].voisins[ll].ligne == procedure.nomComposanteDefaillante) {
                                                    gares[kk].voisins[ll].tempsParcoursLien[ttmp] += (int)(gares[kk].voisins[ll].tempsParcoursLien[ttmp] * 100 / 100);
                                                }
                                            }
                                        }
                                    }
                                }
                                incidents.RemoveAt(positionPHT);
                                supprimerDernierElt = false;
                                break;
                        }
                    }
                    //#endregion
                    break

                default:
                    break;
            }
        }
        //console.log(incidents);
        if (supprimerDernierElt) {
            incidents.splice(incidents.length - 1, 1);
        }

        //stop = false;
    }
}


//ligne 2842
function planDeGestion(Vini, reseau) { //void
    return new Promise(
        function (resolve, reject) {
            //ini variable
            var pUID = Vini.pUID;
            var pPASS = Vini.pPASS;
            var pasDeTemps = Vini.pasDeTemps;
            var dureeTotale = Vini.dureeTotale;
            var heureDebut = Vini.heureDebut;
            var nbGares = Vini.nbGares;

            var tempsCorrespondanceRER = Vini.tempsCorrespondanceRER;
            var tempsCorrespondanceMetro = Vini.tempsCorrespondanceMetro;
            var tempsDeParcoursLienRER = Vini.tempsDeParcoursLienRER;
            var tempsDeParcoursLienMetro = Vini.tempsDeParcoursLienMetro;
            //intervalle de temps séparant chaque départ de train dans les terminus des lignes
            var intervalleDepartTrainsPointe = Vini.intervalleDepartTrainsPointe;
            var intervalleDepartTrainsCreuse = Vini.intervalleDepartTrainsCreuse;
            var intervalleDepartMetrosPointe = Vini.intervalleDepartMetrosPointe;
            var intervalleDepartMetrosCreuse = Vini.intervalleDepartMetrosCreuse;

            var compteurTrain = Vini.compteurTrain;

            //ini reseau
            var gares = reseau.gares;
            var directions = reseau.directions;

            var rd = Math.random();
            var _temps = 0;//peut dépasser 24h selon l'heure de début de la simulation
            var temps = 0;//donne l'équivalence de 'temps' entre 0 et 24h

            var sql = "";
            var resultats = []; //liste de string
            var tabLignes = []; //liste de string
            var myConstante = 10;//15
            var myConstante1 = 1;

            var kmParcouruParLigne = []; //liste de float
            var compteNbPassagersParLigne = []; //liste de int
            var fff = 0;
            //int capGare = 150000;
            //if (!sansScenario) scenario();//a supprimer

            //scenario(); A REMETRE

            sql = 'SELECT DISTINCT NomLigne FROM composantes';
            var myDB = new DB.DBConnect(pUID, pPASS);
            myDB.Select(sql)
                .then(function (tabLignes) {

                    //AFFICHAGE
                    //console.log(tabLignes);
                    //console.log(tabLignes.length);

                    for (var i = 0; i < tabLignes.length; i++) {
                        kmParcouruParLigne.push(0);
                        compteNbPassagersParLigne.push(0);
                    }
                    var affichage = [nbGares, heureDebut * pasDeTemps + dureeTotale * pasDeTemps];//pour enregistrer les données de charge des passagers
                    //console.log('affichage: ' + affichage);
                    affichageParLigne = new Array(/*1440 / pasDeTemps*/18); //pourquoi 360 alors qu'il n'y a que 16 lignes?
                    //console.log(affichageParLigne.length)
                    for (var crea = 0; crea < affichageParLigne.length; crea++) {
                        affichageParLigne[crea] = new Array(/*heureDebut * pasDeTemps + dureeTotale * pasDeTemps*/19);
                    }
                    //console.log(affichageParLigne);
                    var sb_dynamique = [];
                    //System.Text.StringBuilder sb_dynamique = new System.Text.StringBuilder();
                    //console.log(heureDebut * pasDeTemps + dureeTotale * pasDeTemps)

                    //console.log(heureDebut * pasDeTemps + dureeTotale * pasDeTemps)
                    //POUR CHAQUE HORAIRE, ON FAIT TOUT TOURNER
                    //chaque itération représente 15 min
                    //16 à ... ;
                    //ça marche quand on met le max
                    for (_temps = heureDebut * pasDeTemps; _temps < /*heureDebut * pasDeTemps + dureeTotale * pasDeTemps*/20; _temps++) {
                        console.log("");
                        console.log("       ITEMPS: " + _temps);

                        sb_dynamique.push("*Network Net" + 1 + "\n");
                        sb_dynamique.push("*Vertices" + gares.length + "\n");
                        //console.log(sb_dynamique);
                        temps = _temps % (24 * pasDeTemps);

                        //TEST FOR
                        //var passager = new pass.Passager();
                        //console.log(passager)

                        for (var k = 0; k < gares.length; k++) {
                            //gares[k].listeDesPassagers.push(passager);
                            for (var l = 0; l < gares[k].listeDesPassagers.length; l++) {
                                gares[k].listeDesPassagers[l].premierPasSurLien = false;
                                //console.log(gares[k].listeDesPassagers[l].premierPasSurLien)
                            }
                        }

                        //MAJ de la capacité des train relative aux passagers qui font une correspondance 
                        /*for (int k1 = 0; k1 < directions.Count; k1++)
                        {
                            for (int k = 0; k < directions[k1].trains.Count; k++)
                            {
                                if ((directions[k1].trains[k]._timer == 0) && (directions[k1].trains[k].nombreStationsVisitees > 1))
                                {
                                    directions[k1].trains[k].capacite += directions[k1].trains[k].nbCorrespondance;
                                    directions[k1].trains[k].nbCorrespondance = 0;
                                }
                            }
                        }*/


                        //ligne2905
                        //POUR CHAQUE GARES, ON FAIT TOURNER LA SIMULATION
                        //ça marche
                        for (var iterNoeud = 0; iterNoeud < /*nbGares*/357; iterNoeud++) {


                            console.log("");
                            console.log('ITERNOEUD: ' + iterNoeud);
                            console.log('listepass length: ' + gares[iterNoeud].listeDesPassagers.length);
                            if (_temps > 17) {
                                //console.log(gares[iterNoeud].listeDesPassagers[0])
                                //console.log(directions[18].trains);
                            }

                            //NE SE FAIT PAS A L ITE 1 PARCE QUIL FAUT INITIALISER DES TRAINS DANS DIRECTION VOIR LIGNE 3217
                            //On supprime les trains arrivés au terminus
                            //SUPPRESSION DES TRAINS
                            for (var iter = 0; iter < directions.length; iter++) {
                                //console.log('nb trains: ' + directions[iter].trains.length + '  direction: ' + iter);
                                //console.log(directions[iter].trains);
                                for (var ite = 0; ite < directions[iter].trains.length; ite++) {
                                    if ((directions[iter].trains.length > 0) && (directions[iter].trains[ite]._timer <= 0) && (directions[iter].trains[ite].parcours.length <= directions[iter].trains[ite].nombreStationsVisitees)) {
                                        console.log("je suis dans la suppression de train GOOOOOAAAAL")
                                        var nbPassagersTransportes_;
                                        if (directions[iter].trains[ite].nbPassagersTransportes > directions[iter].trains[ite].capacite) {
                                            nbPassagersTransportes_ = directions[iter].trains[ite].capacite;
                                        }
                                        else {
                                            nbPassagersTransportes_ = directions[iter].trains[ite].nbPassagersTransportes;
                                        }
                                        //AFFiCHAGE
                                        //console.log('nb pass transporté: ' + nbPassagersTransportes_)

                                        //TEST PREMIER PREDICATE
                                        //ajoutons des voisins
                                        //var vois = new rail.Rail;
                                        //vois.ligne = "ligne2";
                                        //vois.indiceVoisin = 0;
                                        //vois.tempsParcoursLienDynamique.push(1,3,4);
                                        //gares[0].voisins.push(vois);

                                        //mettons les bons arguments à envoyer pour que choisir la voisin qu'on veut
                                        //directions[iter].trains[ite].parcours.push(0);
                                        //directions[iter].trains[ite].ligne = 'ligne2';
                                        //console.log('ligne: ' + directions[iter].trains[ite].ligne);
                                        //console.log(arcDIndiceEtDeLigne(directions[iter].trains[ite].parcours[ind1], directions[iter].trains[ite].ligne));

                                        //gares[directions[iter].trains[ite].parcours.Count-2].voisins.Find(arcDIndiceEtDeLigne(directions[iter].trains[ite].parcours.Count-1,directions[iter].trains[ite].ligne)

                                        var ind = directions[iter].trains[ite].parcours[directions[iter].trains[ite].parcours.length - 2];
                                        var ind1 = (directions[iter].trains[ite].parcours.length - 1);
                                        console.log(directions[iter].trains[ite]);
                                        //console.log(directions[iter].trains[ite].parcours.length - 2);
                                        //console.log('ind: ' + ind);
                                        //console.log('ind1: ' + ind1);
                                        var niveauRemplissage = rech.arcDIndiceEtDeLigne(gares[ind].voisins, directions[iter].trains[ite].parcours[ind1], directions[iter].trains[ite].ligne);
                                        //console.log(niveauRemplissage);
                                        niveauRemplissage = niveauRemplissage.tempsParcoursLienDynamique.length;
                                        console.log('niv remplissage: ' + niveauRemplissage);

                                        //TEST FOR
                                        //directions[iter].trains[ite].dateDernierDepart = 1;
                                        //console.log(directions[iter]);
                                        //console.log('date depart: ' + directions[iter].trains[ite].dateDernierDepart);

                                        for (var myIt = niveauRemplissage + 1; myIt <= directions[iter].trains[ite].dateDernierDepart; myIt++) {
                                            /*gares[directions[iter].trains[ite].parcours[directions[iter].trains[ite].parcours.Count - 2]].voisins.Find(arcDIndiceEtDeLigne(directions[iter].trains[ite].parcours[directions[iter].trains[ite].parcours.Count - 1], directions[iter].trains[ite].ligne)).tempsParcoursLienDynamique.Add
                                                ((int)(
                                                directions[iter].trains[ite].dateDernierDepart - myIt-
                                                myConstante * (temps - directions[iter].trains[ite].dateDernierDepart) *
                                                (1-(double)directions[iter].trains[ite].nbPassagersTransportes/60000)
                                                ));*/

                                            //AFFICHAGE
                                            //console.log(directions[iter].trains);
                                            //console.log('parcours: ' + directions[iter].trains[ite].parcours[directions[iter].trains[ite].parcours.length - 1]);
                                            //console.log('ligne: ' + directions[iter].trains[ite].ligne);

                                            //console.log(parseFloat(directions[iter].trains[ite].capacite));
                                            var ind = directions[iter].trains[ite].parcours[directions[iter].trains[ite].parcours.length - 2];
                                            var tempsPLD = parseInt(0.5 * myConstante1 * (_temps - myIt) + 0.5 * myConstante * (1 - (parseFloat(nbPassagersTransportes_) / parseFloat(directions[iter].trains[ite].capacite))));
                                            var trouve = rech.arcDIndiceEtDeLigneBis(gares[ind].voisins, directions[iter].trains[ite].parcours[directions[iter].trains[ite].parcours.length - 1], directions[iter].trains[ite].ligne)
                                            gares[ind].voisins[trouve].tempsParcoursLienDynamique.push(tempsPLD);

                                            //AFFICHAGE VARIABLE
                                            //console.log(gares[0].voisins[trouve]);
                                            //console.log(trouve);
                                            //console.log(gares[0].voisins);

                                            //(directions[iter].trains[ite].dateDernierDepart - myIt) * (1 - 1 / ((double)directions[iter].trains[ite].nbPassagersTransportes / (directions[iter].trains[ite].dateDernierDepart-niveauRemplissage)))
                                            //+ (_temps - directions[iter].trains[ite].dateDernierDepart) * (1 - ((double)nbPassagersTransportes_ / (double)directions[iter].trains[ite].capacite))));
                                        }
                                        console.log(gares[ind].voisins[trouve].tempsParcoursLienDynamique);
                                        //console.log(directions[iter].trains);
                                        directions[iter].trains.splice(ite, 1);
                                        //console.log(directions[iter])
                                    }
                                }
                            }

                            //RETIRE PASSAGER ARRIVES
                            for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {
                                //console.log("");
                                //console.log("je suis dans le retire passager")
                                //VERIFICATION D ENTREE DANS LA CONDITION
                                //console.log(gares[iterNoeud].listeDesPassagers[iter]._timer);

                                if (gares[iterNoeud].listeDesPassagers[iter]._timer <= 0) {
                                    //console.log("je suis dans le premier if retire pass")
                                    //VERIFICATION D ENTREE DANS LA CONDITION
                                    //console.log('nb stations visit: ' + gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees);
                                    //console.log('length parcours effectif: ' + gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif.length);

                                    //une fois que le passager à parcouru ce qu'il devait faire, on met à jour les km parcourus
                                    if (gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees >= gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif.length) {//pour chaque passager sur un quai (a fini de faire sa correspondance) au noeud 'iterNoeud' et qui est arrivés à destination
                                        //console.log("je suis dans le 2eme if retire pass GOAAAAAL")
                                        //recherche du train que le passager 'iter' a pris
                                        /*bool trainTrouve = false;
                                        for (int iterDirs = 0; iterDirs < directions.Count; iterDirs++)
                                        {
                                            if (directions[iterDirs].ligne == gares[iterNoeud].listeDesPassagers[iter].ligne)
                                            {
                                                for (int iterTrains = 0; iterTrains < directions[iterDirs].trains.Count; iterTrains++)
                                                {
                                                    if ((directions[iterDirs].trains[iterTrains]._timer <= 0) && (directions[iterDirs].trains[iterTrains].parcours[directions[iterDirs].trains[iterTrains].nombreStationsVisitees - 1] == iterNoeud))
                                                    {
                                                        //si ce train est celui qu'il a pris pour arrivé au noeud 'iterNoeud'
                                                        if ((directions[iterDirs].trains[iterTrains].nombreStationsVisitees > 1) && (directions[iterDirs].trains[iterTrains].parcours[directions[iterDirs].trains[iterTrains].nombreStationsVisitees - 2] == gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif.Count - 2]))
                                                        {
                                                            directions[iterDirs].trains[iterTrains].capacite++;
                                                            trainTrouve = true;
                                                            break;
                                                        }
                                                    }
                                                }
                                            }
                                            if (trainTrouve) break;
                                        }*/

                                        //CHECK CONDITION DU FOR
                                        //console.log(tabLignes);
                                        //console.log("tabligne length: " + tabLignes.length);

                                        for (var iterDistance = 0; iterDistance < tabLignes.length; iterDistance++) {

                                            //CHECK CONDITION
                                            //console.log('km parcou:' + kmParcouruParLigne)
                                            //console.log('nb km sur ligne: ' + gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne)

                                            if (kmParcouruParLigne[iterDistance] < 0)
                                                fff = kmParcouruParLigne[iterDistance];

                                            if (gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne[iterDistance] < 0)
                                                fff = gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne[iterDistance];

                                            if (kmParcouruParLigne[iterDistance] + gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne[iterDistance] < 0)
                                                fff = kmParcouruParLigne[iterDistance];

                                            kmParcouruParLigne[iterDistance] += gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne[iterDistance];
                                            if (gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne[iterDistance] > 0)
                                                compteNbPassagersParLigne[iterDistance]++;
                                            //console.log(compteNbPassagersParLigne);
                                        }

                                        //MAJ des indicateurs DATE ENTREE N EST JAMAIS DEFINIE AVANT ZARB, DU COUP LE RESTE NE PEUX PAS FONCTIONNER
                                        gares[iterNoeud].listeDesPassagers[iter].dateSortie = _temps;
                                        gares[iterNoeud].listeDesPassagers[iter].tempsParcoursEffectif = gares[iterNoeud].listeDesPassagers[iter].dateSortie - gares[iterNoeud].listeDesPassagers[iter].dateEntree;
                                        resultat.indicateurTempsDeParcours += (gares[iterNoeud].listeDesPassagers[iter].tempsParcoursEffectif - gares[gares[iterNoeud].listeDesPassagers[iter].idStationEntree].tempsParcoursTEMPS[gares[iterNoeud].listeDesPassagers[iter].idStationSortie] - 1);
                                        resultat.nombrePassagersArrivesDestination++;
                                        console.log(gares[iterNoeud].listeDesPassagers[iter])
                                        gares[iterNoeud].listeDesPassagers.splice(iter, 1);

                                        iter--;
                                    }
                                }
                            }

                            //ligne 2994
                            //PASSAGER EN ATTENTE
                            for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {
                                gares[iterNoeud].listeDesPassagers[iter].passagerTraite = false;
                                //console.log("");
                                //console.log("je suis dans le for de pass en attente");

                                if (gares[iterNoeud].listeDesPassagers[iter]._timer <= 0 && gares[iterNoeud].listeDesPassagers[iter].correspondanceAEffectuer) {
                                    //console.log("je suis dans le if du pass en attente gooaaaaal");
                                    gares[iterNoeud].listeDesPassagers[iter]._timer = gares[iterNoeud].tempsCorrespondance[temps];
                                    gares[iterNoeud].listeDesPassagers[iter].etat = 3;
                                    gares[iterNoeud].listeDesPassagers[iter].correspondanceAEffectuer = false;
                                    //console.log(gares[iterNoeud].listeDesPassagers[iter]);
                                }
                            }

                            //parcours des liens incidents au noeud 'iterNoeud' 
                            //ligne 3005
                            //pour chaque voisins
                            for (var iterVoisins = 0; iterVoisins < gares[iterNoeud].voisins.length; iterVoisins++) {
                                console.log("");
                                console.log("   ITERVOISINS: " + iterVoisins);
                                //console.log("je suis dans le premier for du géant");
                                var nbVersVoisin = 0;
                                var MajCapacite = 0;//à retrancher de la capacité d'un train lorsque des passager entrent dans le train (correspondance ou entrée dans le système) 
                                for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {
                                    //console.log("   je suis dans le for du premier for");
                                    //console.log(gares[iterNoeud].listeDesPassagers[iter])
                                    if (((gares[iterNoeud].listeDesPassagers[iter]._timer <= 0)
                                        && (!gares[iterNoeud].listeDesPassagers[iter].passagerTraite))
                                        && (gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees] == gares[iterNoeud].voisins[iterVoisins].indiceVoisin)) {
                                        nbVersVoisin++;
                                        //AFFICHAGE
                                        if (iter == gares[iterNoeud].listeDesPassagers.length - 1) {
                                            console.log("       je suis dans le if qui met à jour nbversvoisin dans le deuxième for du géant");
                                            console.log('           nbversvoisin: ' + nbVersVoisin);
                                        }//
                                    }
                                }

                                //recherche du train à ce noeud qui va emprunter ce lien
                                var trainTrouve = false;
                                var indiceDir = 0;
                                var indiceTrain = 0;
                                //console.log(directions)

                                //on trouve la direction qui correspond à la gare(dépend du grand du for qui englobe tout et qui le fait 357fois) où on est grâce à la ligne avec ce for puis le if.
                                for (var iterDirs = 0; iterDirs < directions.length; iterDirs++) {
                                    //console.log("iterdirs: " + iterDirs);
                                    //on cherche la ligne de la direction qui correspond à la gare qu'on est entrain de mettre à jouer
                                    if (directions[iterDirs].ligne == gares[iterNoeud].voisins[iterVoisins].ligne) {
                                        //console.log("       ITERDIRS: " + iterDirs);

                                        //console.log(directions[iterDirs]);
                                        //console.log(gares[iterNoeud].voisins[iterVoisins]);

                                        //pour chaque train dans une direction,
                                        for (var iterTrains = 0; iterTrains < directions[iterDirs].trains.length; iterTrains++) {
                                            //console.log("       je suis dans le for de iterDirs");
                                            //console.log("           ligne direction: " + directions[iterDirs].ligne); 
                                            /*console.log("           parcours de la direction que je prends: " + directions[iterDirs].trains[iterTrains].parcours);
                                            console.log('           parcours du train à parcours-1 où le train se situe: ' + directions[iterDirs].trains[iterTrains].parcours[directions[iterDirs].trains[iterTrains].nombreStationsVisitees - 1]);
                                            console.log("           iter noeud où je suis: " + iterNoeud);
                                            console.log("           ind voisins où je veux aller: " + gares[iterNoeud].voisins[iterVoisins].indiceVoisin);
                                            console.log('')*/
                                            //regarde (position du train) compare (la gare dans laquelle on se trouve et la gare voisine où on veut aller)
                                            //si c'est la bonne position, on met entre dans le train trouve!!
                                            //si timer est plus petit que 0 et que le parcours-1 de la direct correspond à l'iterN où on se trouve et que le parcours correspond à l'indiceVoisin de la gare
                                            if ((directions[iterDirs].trains[iterTrains]._timer <= 0) && (directions[iterDirs].trains[iterTrains].parcours[directions[iterDirs].trains[iterTrains].nombreStationsVisitees - 1] == iterNoeud)) {
                                                if (directions[iterDirs].trains[iterTrains].parcours[directions[iterDirs].trains[iterTrains].nombreStationsVisitees] == gares[iterNoeud].voisins[iterVoisins].indiceVoisin) {
                                                    /*console.log("           ligne direction: " + directions[iterDirs].ligne);
                                                    console.log("               parcours de la direction que je prends: " + directions[iterDirs].trains[iterTrains].parcours);
                                                    console.log('               parcours du train à parcours-1 où le train se situe: ' + directions[iterDirs].trains[iterTrains].parcours[directions[iterDirs].trains[iterTrains].nombreStationsVisitees - 1]);
                                                    console.log("               iter noeud où je suis: " + iterNoeud);
                                                    console.log("               ind voisins où je veux aller: " + gares[iterNoeud].voisins[iterVoisins].indiceVoisin);
                                                    console.log('')*/
                                                    if (iterTrains > 0)//traitement particulier pour le train qui est tout devant
                                                    {
                                                        //console.log("               je suis dans le triple if du for GOOOOAL");
                                                        //permet de rentrer dans le if(trouve)        
                                                        directions[iterDirs].trains[iterTrains].stop = true;

                                                        if (!(directions[iterDirs].trains[iterTrains].nombreMinutesDeMarche - 1 >= directions[iterDirs].trains[iterTrains - 1].nombreMinutesDeMarche)) {

                                                            directions[iterDirs].trains[iterTrains].stop = false;
                                                            indiceDir = iterDirs;
                                                            indiceTrain = iterTrains;
                                                            trainTrouve = true;
                                                            break;
                                                        }
                                                    }
                                                    else {
                                                        //console.log("               je suis dans le else du double if du for GOOOAAAAL");
                                                        //permet de rentrer dans le if(trouve)
                                                        indiceDir = iterDirs;
                                                        indiceTrain = iterTrains;
                                                        trainTrouve = true;
                                                        break;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                    if (trainTrouve) break;
                                }
                                //ligne 3056
                                //si on trouve un train au passager, on met tout à jour et on le retire de la liste des passagers
                                if (trainTrouve) {
                                    console.log("WOOOOOOOOOOOWWWWWWWWWWWW je suis dans le géaaant if du géant car j'ai trouvé un train qui fait parcours-1 à parcours");
                                    //console.log("nbversvoisin: " + nbVersVoisin);
                                    //grand if
                                    if (directions[indiceDir].trains[indiceTrain].capacite >= nbVersVoisin) {
                                        //console.log("je suis dans le grand if du géant");

                                        if (gares[iterNoeud].voisins[iterVoisins].operabilite[temps]) {
                                            //console.log("   je suis dans le moyen if du grand if");
                                            //TEST FOR
                                            //console.log('       listepass length: ' + gares[iterNoeud].listeDesPassagers.length);
                                            //console.log(gares[iterNoeud].listeDesPassagers);

                                            for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {
                                                //console.log("       je suis dans le for du moyen if");

                                                if (((gares[iterNoeud].listeDesPassagers[iter]._timer <= 0)
                                                    && (!gares[iterNoeud].listeDesPassagers[iter].passagerTraite))
                                                    && (gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees] == gares[iterNoeud].voisins[iterVoisins].indiceVoisin)) {
                                                    //console.log("           je suis dans le if du for du moyen if");

                                                    var stockVoisins = rech.arcDIndice(gares[iterNoeud].voisins, gares[iterNoeud].voisins[iterVoisins].indiceVoisin);
                                                    //console.log(stockVoisins);
                                                    if (stockVoisins.length == 1) { //ligne 3069
                                                        //console.log("               je suis dans le if dans le if du for");
                                                        //console.log(gares[iterNoeud].listeDesPassagers[iter]);
                                                        gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees++;
                                                        gares[iterNoeud].listeDesPassagers[iter].passagerTraite = true;
                                                        gares[iterNoeud].listeDesPassagers[iter].direction = indiceDir;
                                                        gares[iterNoeud].listeDesPassagers[iter].idTrain = directions[indiceDir].trains[indiceTrain].id;

                                                        var ind = gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees - 1];
                                                        var stockVoisins1 = rech.arcDIndice(gares[ind].voisins, gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees]);
                                                        var stockVoisins1S = rech.arcDeLigne(stockVoisins1, gares[iterNoeud].voisins[iterVoisins].ligne);

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif.length > gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees)
                                                            && !(stockVoisins1S.length > 0)) {
                                                            //console.log("                   je suis dans la maj correspondanceeffectuer")
                                                            gares[iterNoeud].listeDesPassagers[iter].correspondanceAEffectuer = true;
                                                            directions[indiceDir].trains[indiceTrain].nbCorrespondance++;
                                                        }

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].etat == 1) || (gares[iterNoeud].listeDesPassagers[iter].etat == 3)) {
                                                            //console.log("                   je suis dans la maj état");
                                                            MajCapacite++;
                                                            gares[iterNoeud].listeDesPassagers[iter].etat = 2;
                                                            //console.log(gares[0].listeDesPassagers);
                                                        }

                                                        gares[iterNoeud].listeDesPassagers[iter]._timer = 0;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligneOld = gares[iterNoeud].listeDesPassagers[iter].ligne;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligne = gares[iterNoeud].voisins[iterVoisins].ligne;
                                                        //console.log("                   tempsparcourslien: " + gares[iterNoeud].voisins[iterVoisins].tempsParcoursLien[temps])
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer += gares[iterNoeud].voisins[iterVoisins].tempsParcoursLien[temps];
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                                        gares[iterNoeud].listeDesPassagers[iter].premierPasSurLien = true;
                                                        gares[gares[iterNoeud].voisins[iterVoisins].indiceVoisin]._listeDesPassagersEnAttente.push(gares[iterNoeud].listeDesPassagers[iter]);

                                                        var index = rech.indexOf(tabLignes, gares[iterNoeud].listeDesPassagers[iter].ligne); //ne  pas mettre en commentaire


                                                        //Km parcouru sur une ligne
                                                        gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne[index] += gares[iterNoeud].voisins[iterVoisins].distance;
                                                        //console.log("iterNoeud: " + iterNoeud);
                                                        //console.log("iter: " + iter);
                                                        //console.log(gares[iterNoeud].listeDesPassagers[iter]);
                                                    }
                                                    else { //ligne 3098
                                                        //console.log("               je suis dans le else dans le if du for")
                                                        gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees++;
                                                        gares[iterNoeud].listeDesPassagers[iter].passagerTraite = true;
                                                        gares[iterNoeud].listeDesPassagers[iter].direction = indiceDir;
                                                        gares[iterNoeud].listeDesPassagers[iter].idTrain = directions[indiceDir].trains[indiceTrain].id;

                                                        var myLine = "";
                                                        var fl_bis = new rail.Rail();

                                                        var stockVoisins2 = rech.arcDIndice(gares[iterNoeud].voisins, gares[iterNoeud].voisins[iterVoisins].indiceVoisin);
                                                        //console.log(stockVoisins2)
                                                        var keepGoing = true;
                                                        stockVoisins2.forEach(function (fl) { //fl est un rail

                                                            loop5(fl) //même solution qu'avant pour avoir les bons fl
                                                        })
                                                        function loop5(fl) {
                                                            //console.log(fl)
                                                            var compteur = 0;
                                                            while (keepGoing && compteur < 1) { // solution temporaire, pose problème si on entre jamais dans le else
                                                                if (fl.ligne != gares[iterNoeud].listeDesPassagers[iter].ligne) {
                                                                    myLine = fl.ligne;
                                                                    fl_bis = fl;
                                                                }
                                                                else { //gares[iterNoeud].listeDesPassagers[iter]._timer = 0; 
                                                                    myLine = fl.ligne;
                                                                    fl_bis = fl;
                                                                    keepGoing = false;
                                                                }
                                                                compteur++;
                                                            }
                                                        }

                                                        var ind1 = gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees - 1];
                                                        var stockVoisins3 = rech.arcDIndice(gares[ind1].voisins, gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees]);
                                                        var stockVoisins3bis = rech.arcDeLigne(stockVoisins3, myLine);

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif.length > gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees)
                                                            && !(stockVoisins3bis.length > 0)) {

                                                            gares[iterNoeud].listeDesPassagers[iter].correspondanceAEffectuer = true;
                                                            directions[indiceDir].trains[indiceTrain].nbCorrespondance++;
                                                        }

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].etat == 1) || (gares[iterNoeud].listeDesPassagers[iter].etat == 3)) {
                                                            MajCapacite++;
                                                            gares[iterNoeud].listeDesPassagers[iter].etat = 2;
                                                        }

                                                        gares[iterNoeud].listeDesPassagers[iter]._timer = 0;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligneOld = gares[iterNoeud].listeDesPassagers[iter].ligne;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligne = myLine;
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer += fl_bis.tempsParcoursLien[temps];

                                                        //gares[iterNoeud].listeDesPassagers[iter]._timer += gares[iterNoeud].voisins[fl_bis.indiceVoisin].tempsParcoursLien[temps];
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                                        gares[iterNoeud].listeDesPassagers[iter].premierPasSurLien = true;
                                                        gares[gares[iterNoeud].voisins[iterVoisins].indiceVoisin]._listeDesPassagersEnAttente.push(gares[iterNoeud].listeDesPassagers[iter]);

                                                        var index1 = rech.indexOf(tabLignes, gares[iterNoeud].listeDesPassagers[iter].ligne); //ne  pas mettre en commentaire

                                                        //Km parcouru sur une ligne
                                                        gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne[index1] += gares[iterNoeud].voisins[iterVoisins].distance;
                                                        //console.log(gares[iterNoeud].listeDesPassagers[iter].NbKmSurLigne)
                                                    }
                                                }
                                            }//ligne 3149

                                            //si le passager est traité, alors on l'enlève des passagers
                                            for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {
                                                //console.log("       je suis dans le splice passager");
                                                //console.log('       listepass length: ' + gares[iterNoeud].listeDesPassagers.length);
                                                //console.log(gares[iterNoeud].listeDesPassagers[iter].passagerTraite)
                                                if ((gares[iterNoeud].listeDesPassagers[iter].passagerTraite)) {
                                                    gares[iterNoeud].listeDesPassagers.splice(iter, 1);
                                                    iter--;
                                                    //console.log(gares[iterNoeud].listeDesPassagers)
                                                    //console.log('       listepass length: ' + gares[iterNoeud].listeDesPassagers.length);
                                                }
                                            }
                                            ////directions[indiceDir].trains[indiceTrain].capacite -= MajCapacite;
                                        }
                                        else {
                                            //console.log('   je suis dans le moyen else du grand if');
                                            directions[indiceDir].trains[indiceTrain].stop = true;
                                            //console.log(directions[indiceDir].trains[indiceTrain]);
                                        }
                                    }
                                    //grand else
                                    else {//ligne 3164
                                        //console.log("je suis dans le grand else du géant");
                                        if (gares[iterNoeud].voisins[iterVoisins].operabilite[temps]) {
                                            var nbEnvoyes = 0;

                                            //console.log(gares[iterNoeud].listeDesPassagers.length)
                                            for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {

                                                //ligne 3172
                                                if (((gares[iterNoeud].listeDesPassagers[iter]._timer <= 0)
                                                    && (!gares[iterNoeud].listeDesPassagers[iter].passagerTraite))
                                                    && (nbEnvoyes < directions[indiceDir].trains[indiceTrain].capacite)
                                                    && (gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees] == gares[iterNoeud].voisins[iterVoisins].indiceVoisin)) {

                                                    var stockVoisins4 = rech.arcDIndice(gares[iterNoeud].voisins, gares[iterNoeud].voisins[iterVoisins].indiceVoisin);
                                                    //console.log(stockVoisins4);

                                                    if (stockVoisins4.length == 1) {
                                                        gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees++;
                                                        nbEnvoyes++;
                                                        gares[iterNoeud].listeDesPassagers[iter].passagerTraite = true;
                                                        gares[iterNoeud].listeDesPassagers[iter].direction = indiceDir;
                                                        gares[iterNoeud].listeDesPassagers[iter].idTrain = directions[indiceDir].trains[indiceTrain].id;

                                                        var ind2 = gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees - 1];
                                                        var stockVoisins5 = rech.arcDIndice(gares[ind2].voisins, gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees]);
                                                        var stockVoisins5bis = rech.arcDeLigne(stockVoisins5, gares[iterNoeud].voisins[iterVoisins].ligne);

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif.length > gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees)
                                                            && !(stockVoisins5bis.length > 0)) {
                                                            gares[iterNoeud].listeDesPassagers[iter].correspondanceAEffectuer = true;
                                                            directions[indiceDir].trains[indiceTrain].nbCorrespondance++;
                                                        }

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].etat == 1) || (gares[iterNoeud].listeDesPassagers[iter].etat == 3)) {
                                                            MajCapacite++;
                                                            gares[iterNoeud].listeDesPassagers[iter].etat = 2;

                                                            //console.log(gares[iterNoeud].listeDesPassagers)
                                                        }

                                                        gares[iterNoeud].listeDesPassagers[iter]._timer = 0;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligneOld = gares[iterNoeud].listeDesPassagers[iter].ligne;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligne = gares[iterNoeud].voisins[iterVoisins].ligne;
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer += gares[iterNoeud].voisins[iterVoisins].tempsParcoursLien[temps];
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                                        gares[iterNoeud].listeDesPassagers[iter].premierPasSurLien = true;
                                                        gares[gares[iterNoeud].voisins[iterVoisins].indiceVoisin]._listeDesPassagersEnAttente.push(gares[iterNoeud].listeDesPassagers[iter]);
                                                    }
                                                    else {//2 gares avec 2 liens differents  ligne 3203
                                                        gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees++;
                                                        nbEnvoyes++;
                                                        gares[iterNoeud].listeDesPassagers[iter].passagerTraite = true;
                                                        gares[iterNoeud].listeDesPassagers[iter].direction = indiceDir;
                                                        gares[iterNoeud].listeDesPassagers[iter].idTrain = directions[indiceDir].trains[indiceTrain].id;
                                                        //console.log(gares[iterNoeud].listeDesPassagers[iter]);
                                                        var myLine = "";

                                                        var fl_bis = new rail.Rail();

                                                        var stockVoisins6 = rech.arcDIndice(gares[iterNoeud].voisins, gares[iterNoeud].voisins[iterVoisins].indiceVoisin);
                                                        //console.log(stockVoisins6)
                                                        var keepGoing1 = true;
                                                        stockVoisins6.forEach(function (fl) { //fl est un rail
                                                            loop6(fl) //même solution qu'avant pour avoir les bons fl
                                                        })

                                                        function loop6(fl) {
                                                            //console.log(fl)
                                                            var compteur = 0;
                                                            while (keepGoing1 && compteur < 1) { // solution temporaire, pose problème si on entre jamais dans le else
                                                                if (fl.ligne != gares[iterNoeud].listeDesPassagers[iter].ligne) {
                                                                    //gares[iterNoeud].listeDesPassagers[iter]._timer = tempsCorrespondanceMetro; 
                                                                    //directions[indiceDir].trains[indiceTrain].nbCorrespondance++; 
                                                                    myLine = fl.ligne;
                                                                    fl_bis = fl;
                                                                }
                                                                else { //gares[iterNoeud].listeDesPassagers[iter]._timer = 0; 
                                                                    myLine = fl.ligne;
                                                                    fl_bis = fl;
                                                                    keepGoing1 = false;
                                                                }
                                                                compteur++;
                                                            }
                                                        }

                                                        var ind1 = gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees - 1];
                                                        var stockVoisins7 = rech.arcDIndice(gares[ind1].voisins, gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees]);
                                                        var stockVoisins7bis = rech.arcDeLigne(stockVoisins7, myLine);

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif.length > gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees)
                                                            && !(stockVoisins7bis.length > 0)) {
                                                            gares[iterNoeud].listeDesPassagers[iter].correspondanceAEffectuer = true;
                                                            directions[indiceDir].trains[indiceTrain].nbCorrespondance++;
                                                        }

                                                        //TEST CONDITION
                                                        //console.log(gares[iterNoeud].listeDesPassagers[iter]);

                                                        if ((gares[iterNoeud].listeDesPassagers[iter].etat == 1) || (gares[iterNoeud].listeDesPassagers[iter].etat == 3)) {
                                                            MajCapacite++;
                                                            gares[iterNoeud].listeDesPassagers[iter].etat = 2;
                                                        }

                                                        gares[iterNoeud].listeDesPassagers[iter]._timer = 0;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligneOld = gares[iterNoeud].listeDesPassagers[iter].ligne;
                                                        gares[iterNoeud].listeDesPassagers[iter].ligne = myLine;
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer += fl_bis.tempsParcoursLien[temps];
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                                        gares[iterNoeud].listeDesPassagers[iter].premierPasSurLien = true;
                                                        gares[gares[iterNoeud].voisins[iterVoisins].indiceVoisin]._listeDesPassagersEnAttente.push(gares[iterNoeud].listeDesPassagers[iter]);
                                                    }
                                                }
                                            }
                                            for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {
                                                if (gares[iterNoeud].listeDesPassagers[iter].passagerTraite) {
                                                    gares[iterNoeud].listeDesPassagers.splice(iter, 1);
                                                    //console.log(gares[iterNoeud].listeDesPassagers)
                                                    iter--;
                                                }
                                            }
                                            ///////////directions[indiceDir].trains[indiceTrain].capacite = 0;
                                            //faire un traitement sur ceux qui sont resté en gares[iterNoeud] et qui devraient aller à gares[iterNoeud].voisins[iterVoisins]
                                        }
                                        else {
                                            directions[indiceDir].trains[indiceTrain].stop = true;

                                            //AFFICHAGE
                                            //console.log(directions[indiceDir].trains)
                                        }
                                    }//ligne 3263
                                    //2grand
                                    if (directions[indiceDir].trains[indiceTrain].nombreStationsVisitees - 2 >= 0) { //ne pas oublier d'enlever comment
                                        //console.log("je suis dans le 2grand if du géant");

                                        var ind3 = directions[indiceDir].trains[indiceTrain].parcours[directions[indiceDir].trains[indiceTrain].nombreStationsVisitees - 2];
                                        var ind4 = directions[indiceDir].trains[indiceTrain].parcours[directions[indiceDir].trains[indiceTrain].nombreStationsVisitees - 1];
                                        var ind5 = directions[indiceDir].trains[indiceTrain].ligne;
                                        var niveauRemplissage = rech.arcDIndiceEtDeLigne(gares[ind3].voisins, ind4, ind5);
                                        //console.log(niveauRemplissage);
                                        niveauRemplissage = niveauRemplissage.tempsParcoursLienDynamique.length;
                                        //console.log(niveauRemplissage);

                                        for (var myIt = niveauRemplissage + 1; myIt <= directions[indiceDir].trains[indiceTrain].dateDernierDepart; myIt++) {
                                            //console.log("je suis dans le for du 2grand if");
                                            var nbPassagersTransportes_;

                                            if (directions[indiceDir].trains[indiceTrain].nbPassagersTransportes > directions[indiceDir].trains[indiceTrain].capacite) {
                                                nbPassagersTransportes_ = directions[indiceDir].trains[indiceTrain].capacite;
                                                //console.log(nbPassagersTransportes_);
                                            }
                                            else {
                                                nbPassagersTransportes_ = directions[indiceDir].trains[indiceTrain].nbPassagersTransportes;
                                                //console.log(nbPassagersTransportes_);
                                            }

                                            if ((_temps - myIt) < 0) {
                                                //myIt = myIt;
                                            }
                                            if (parseFloat(nbPassagersTransportes_) > parseFloat(directions[indiceDir].trains[indiceTrain].capacite)) {
                                                //nbPassagersTransportes_ = nbPassagersTransportes_;
                                            }
                                            if (directions[indiceDir].trains[indiceTrain].dateDernierDepart - niveauRemplissage < 0) {
                                                //niveauRemplissage = niveauRemplissage;
                                            }

                                            //TEST CONDITION
                                            //console.log(directions[indiceDir].trains[indiceTrain].nombreStationsVisitees - 2);
                                            if (directions[indiceDir].trains[indiceTrain].nombreStationsVisitees - 2 >= 0) { //enlever comment!

                                                var ind6 = directions[indiceDir].trains[indiceTrain].parcours[directions[indiceDir].trains[indiceTrain].nombreStationsVisitees - 2]; //ind de gare
                                                var ind7 = directions[indiceDir].trains[indiceTrain].parcours[directions[indiceDir].trains[indiceTrain].nombreStationsVisitees - 1]; //indice à trouver
                                                var ind8 = directions[indiceDir].trains[indiceTrain].ligne; //ligne à trouver
                                                var trouve1 = rech.arcDIndiceEtDeLigneBis(gares[ind6].voisins, ind7, ind8);  //ne pas oublier d'enlever ce qui est en comment
                                                gares[ind6].voisins[trouve1].tempsParcoursLienDynamique.push(parseInt(
                                                    /*directions[indiceDir].trains[indiceTrain].dateDernierDepart - myIt -
                                                    myConstante * (temps - directions[indiceDir].trains[indiceTrain].dateDernierDepart) *
                                                    (1 - (double)directions[indiceDir].trains[indiceTrain].nbPassagersTransportes / 60000))*/
                                                    //((directions[indiceDir].trains[indiceTrain].dateDernierDepart - myIt) * (double)directions[indiceDir].trains[indiceTrain].nbPassagersTransportes / (directions[indiceDir].trains[indiceTrain].dateDernierDepart - niveauRemplissage))
                                                    //////////myConstante1 * (_temps - myIt) + myConstante * (1 - ((double)nbPassagersTransportes_ / (double)directions[indiceDir].trains[indiceTrain].capacite /*capGare*/))
                                                    //((directions[indiceDir].trains[indiceTrain].dateDernierDepart - myIt) * (1-1/((double)directions[indiceDir].trains[indiceTrain].nbPassagersTransportes / (directions[indiceDir].trains[indiceTrain].dateDernierDepart - niveauRemplissage))))
                                                    0.5 * myConstante1 * (_temps - myIt) + 0.5 * myConstante * (1 - (parseFloat(nbPassagersTransportes_) / parseFloat(directions[indiceDir].trains[indiceTrain].capacite))) /*capGare*/
                                                ));
                                            }
                                        }
                                    }

                                    //si c'est opérable,on met à jour les trains dans les directions (nbversvoisin, temps passa trans, nb stations visitées)
                                    //3grand
                                    if (gares[iterNoeud].voisins[iterVoisins].operabilite[temps]) { //ligne 3303
                                        //console.log("je suis dans le 3grand if du géant");

                                        //TEST CONDITION 
                                        //console.log(directions[indiceDir].trains[indiceTrain].ligne);
                                        //console.log(tempsDeParcoursLienRER);

                                        if ((directions[indiceDir].trains[indiceTrain].ligne == "ligneA") || (directions[indiceDir].trains[indiceTrain].ligne == "ligneB")) {
                                            directions[indiceDir].trains[indiceTrain]._timer = tempsDeParcoursLienRER;
                                            //console.log("je suis dans le if du 3grand");
                                            /*int niveauRemplissage = gares[iterNoeud].voisins[iterVoisins].tempsParcoursLienDynamique.Count;
                                            for (int myIt = niveauRemplissage + 1;
                                                    myIt <= directions[indiceDir].trains[indiceTrain].dateDernierDepart; myIt++)
                                            {
                                                gares[iterNoeud].voisins[iterVoisins].tempsParcoursLienDynamique.Add((int)(
                                                    temps-myIt+myConstante*(1-((double)directions[indiceDir].trains[indiceTrain].nbPassagersTransportes / capGare))
                                                    ));
                                            }*/
                                            directions[indiceDir].trains[indiceTrain].nbPassagersTransportes = nbVersVoisin;
                                            directions[indiceDir].trains[indiceTrain].dateDernierDepart = temps;

                                            //AFFICHAGE
                                            //console.log(directions[indiceDir].trains[indiceTrain]);
                                        }
                                        else {
                                            //console.log("je suis dans le else du 3grand");
                                            directions[indiceDir].trains[indiceTrain]._timer = tempsDeParcoursLienMetro;
                                            /*int niveauRemplissage = gares[iterNoeud].voisins[iterVoisins].tempsParcoursLienDynamique.Count;
                                            for (int myIt = niveauRemplissage + 1;
                                                    myIt <= directions[indiceDir].trains[indiceTrain].dateDernierDepart; myIt++)
                                            {
                                                gares[iterNoeud].voisins[iterVoisins].tempsParcoursLienDynamique.Add((int)(
                                                    
                                                    temps - myIt + myConstante * (1 - ((double)directions[indiceDir].trains[indiceTrain].nbPassagersTransportes / capGare))
                                                    ));
                                            }*/
                                            directions[indiceDir].trains[indiceTrain].nbPassagersTransportes = nbVersVoisin;
                                            directions[indiceDir].trains[indiceTrain].dateDernierDepart = temps;

                                            //AFFICHAGE
                                            //console.log(directions[indiceDir].trains[indiceTrain]);
                                        }
                                        //directions[indiceDir].trains[indiceTrain].capacite += directions[indiceDir].trains[indiceTrain].nbCorrespondance;
                                        //directions[indiceDir].trains[indiceTrain].nbCorrespondance = 0;
                                        //directions[indiceDir].trains[indiceTrain].nombreMinutesDeMarche += directions[indiceDir].trains[indiceTrain]._timer;
                                        /////gestion des chevauchements
                                        directions[indiceDir].trains[indiceTrain].nombreStationsVisitees++;
                                        //console.log(directions[indiceDir].trains[indiceTrain]);
                                    }
                                }
                            }

                            //ligne 3344
                            //TRAITE PASSAGER  
                            for (var iter = 0; iter < gares[iterNoeud].listeDesPassagers.length; iter++) {
                                //console.log("for de traite passager")
                                //console.log(gares[iterNoeud].listeDesPassagers[iter])
                                if (!gares[iterNoeud].listeDesPassagers[iter].premierPasSurLien)//pour éviter de traiter encore une fois les passagers qui viennent d'être envoyé à la station 'iterNoeud' en traitant une station d'indice < 'iterNoeud'
                                {
                                    //console.log(    "je suis dans if dans for");
                                    //gestion des passagers qui sont dans les interstation et qui arrivent à 'iterNoeud'
                                    if (gares[iterNoeud].listeDesPassagers[iter]._timer > 0) {
                                        //console.log(        "je suis dans if dans if");

                                        var ind9 = gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees - 2]; //voisin
                                        var ind10 = gares[iterNoeud].listeDesPassagers[iter].parcoursEffectif[gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees - 1]; //indi à trouver
                                        var ind11 = gares[iterNoeud].listeDesPassagers[iter].ligne; //ligne à trouver
                                        var stockVoisins8 = rech.arcDIndice(gares[ind9].voisins, ind10);
                                        var stockVoisins8Bis = rech.arcDeLigne(stockVoisins8, ind11);

                                        //test de l'opérabilité du lien
                                        if ((gares[iterNoeud].listeDesPassagers[iter].nombreStationsVisitees > 1)
                                            && (stockVoisins8Bis[0].operabilite[temps])) {
                                            //console.log(            "je suis dans if dans if dans if")

                                            //2ème condition 
                                            var ind12 = directions[gares[iterNoeud].listeDesPassagers[iter].direction].trains //direction où on cherche le train
                                            var stockTrains = rech.trainDId(ind12, gares[iterNoeud].listeDesPassagers[iter].idTrain);

                                            //3ème condition
                                            var ind13 = directions[gares[iterNoeud].listeDesPassagers[iter].direction].trains; //les trains où on fait la recherche
                                            var stockTrains1 = rech.trainDId(ind13, gares[iterNoeud].listeDesPassagers[iter].idTrain);

                                            if ((gares[iterNoeud].listeDesPassagers[iter].direction > -1) && (gares[iterNoeud].listeDesPassagers[iter].idTrain > -1)
                                                && (stockTrains > 0)
                                                && (ind13[stockTrains1 - 1].nombreMinutesDeMarche > ind13[stockTrains1].nombreMinutesDeMarche + 1)) {
                                                //le train peut avancer sans collision du train qui le précède
                                                gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                                //console.log(gares[iterNoeud].listeDesPassagers[iter])
                                            }
                                            else {
                                                //si c'est le train qui est tout devant, pas de risque de collision. Il peut avancer

                                                var ind14 = directions[gares[iterNoeud].listeDesPassagers[iter].direction].trains;
                                                var stockTrains2 = rech.trainDId(ind14, gares[iterNoeud].listeDesPassagers[iter].idTrain);

                                                if ((gares[iterNoeud].listeDesPassagers[iter].direction > -1) && (gares[iterNoeud].listeDesPassagers[iter].idTrain > -1)
                                                    && (stockTrains2 == 0)) {
                                                    gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                                    //console.log(gares[iterNoeud].listeDesPassagers[iter]);
                                                }
                                                else {
                                                    //lorsqu'un passager entre dans le système et monte dans un train, l'indice de son train ne lui est pas attribué tout de suite
                                                    var ind15 = directions[gares[iterNoeud].listeDesPassagers[iter].direction].trains;
                                                    var stockTrains3 = rech.trainDId(ind15, gares[iterNoeud].listeDesPassagers[iter].idTrain);

                                                    if (stockTrains3 == -1)  //!!!!!!!!!!!!!!!!????????????????????? comment l'index peut être -1? ça commence à 0
                                                        gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                                }
                                            }
                                        }
                                    }
                                    else {
                                        //console.log(        "je suis dans else dans if")
                                        gares[iterNoeud].listeDesPassagers[iter]._timer--;
                                        //console.log(gares[iterNoeud].listeDesPassagers[iter]);
                                    }
                                }
                                //gares[iterNoeud].listeDesPassagers[iter].premierPasSurLien = false;
                            }//ligne 3377

                            //on créer le nombre de passager qui a été estimé dans l'initialisation
                            //ICI LES LISTES DE PASSAGERS SONT CREES
                            //CA MARCHE
                            console.log("");
                            console.log("   JE CREE PASSAGER");
                            console.log('   look ' + gares[iterNoeud].nombreDePassagersVenantDeEnv[temps])
                            for (var i = 0; i < gares[iterNoeud].nombreDePassagersVenantDeEnv[temps]; i++) { //ça fonctionne avec la condi normale mais elle vaut souvent 0 du coup c'est chiant
                                //console.log('commenceee');

                                var passager = new pass.Passager();
                                passager.idStationEntree = iterNoeud;
                                passager.etat = 1;
                                //console.log(gares[iterNoeud].destinationPassagers)
                                passager.idStationSortie = gares[iterNoeud].destinationPassagers[temps][i];  //choisit dans la liste random où sortent les passagers
                                passager.dateEntree = _temps;
                                //console.log("heyyy: " + passager.idStationSortie);
                                var strArray = gares[iterNoeud].parcoursTEMPS[passager.idStationSortie].split('-'); //on choisit le parcours, on va dire que les passagers veulent toujours prendre ce trajet
                                for (var iter = 0; iter < strArray.length; iter++) {
                                    //console.log("iter yo " + iter)
                                    passager.parcoursNormal.push(parseInt(strArray[iter]));

                                }
                                passager.parcoursEffectif = passager.parcoursNormal;


                                ///////////////AAAAAAAAAAAAA REGARDEEEEEEEEEEEEEEEEEEEEEEEEEERRRRRRRRRRRRRRRR
                                /*if ((temps > debutScenario + 5) && (temps < debutScenario + 5 + 120) && (chkGestion.Checked)) {///// le checked sert à vérifier si une case est cochée
                                    passager.parcoursEffectif = trouverChemin(gares, gares[iterNoeud], gares[passager.idStationSortie], "", 3);
                                    //console.log(passager)
                                }*/

                                var monArc = new rail.Rail();

                                var stockVoisins9 = rech.arcDIndice(gares[iterNoeud].voisins, passager.parcoursEffectif[1]);
                                //console.log(stockVoisins9);
                                if ((passager.parcoursEffectif.length > 2) && (stockVoisins9.length > 1)) {
                                    var keepGoing2 = true;
                                    /*stockVoisins9.forEach(function (fl) { //fl est un rail    j'ai remplacé le  foreach par un for, je ne pense pas qu'il y ait une diff
                                        loop7(fl) //même solution qu'avant pour avoir les bons fl
                                    })*/
                                    for (var fl = 0; fl < stockVoisins9.length; fl++) {
                                        loop7(stockVoisins9[fl]);
                                    }
                                    function loop7(fl) { //fl est un rail
                                        //console.log(fl);
                                        var compteur = 0;
                                        while (keepGoing2 && compteur < 1) { // solution temporaire, pose problème si on entre jamais dans le else
                                            var stockVoisins10 = rech.arcDIndiceBis(gares[passager.parcoursEffectif[1]].voisins, passager.parcoursEffectif[2])

                                            if (fl.ligne == stockVoisins10.ligne) {
                                                monArc = fl;
                                                //break; resolu normalement
                                                keepGoing2 = false;
                                            }
                                            else {
                                                monArc = fl;
                                            }
                                            compteur++;
                                        }
                                    }
                                }
                                else {
                                    monArc = rech.arcDIndiceBis(gares[iterNoeud].voisins, passager.parcoursEffectif[1]);
                                }

                                //passager._timer += monArc.tempsParcoursLien[temps];
                                passager._timer += monArc.tempsMoyenAvantPriseEnCharge[temps];
                                passager.ligne = monArc.ligne;
                                resultat.nombrePassagerEntresDansLetransport++;
                                gares[iterNoeud]._listeDesPassagersEnAttente.push(passager);
                            }
                        }

                        //ligne 3414  
                        //on met les passagers en attente dans la liste de passager
                        for (var iterNoeud = 0; iterNoeud < /*nbGares*/357; iterNoeud++) {

                            /*gares[iterNoeud]._listeDesPassagersEnAttente.forEach(function (passager) { j'ai remplacé le  foreach par un for, je ne pense pas qu'il y ait une diff
                                gares[iterNoeud].listeDesPassagers.push(passager);
                                //console.log(gares[iterNoeud].listeDesPassagers);
                            })*/
                            //console.log('length' + gares[iterNoeud]._listeDesPassagersEnAttente.length);
                            for (var lpass = 0; lpass < gares[iterNoeud]._listeDesPassagersEnAttente.length; lpass++) {
                                gares[iterNoeud].listeDesPassagers.push(gares[iterNoeud]._listeDesPassagersEnAttente[lpass]);
                                //console.log(gares[iterNoeud].listeDesPassagers);
                            }

                            gares[iterNoeud]._listeDesPassagersEnAttente.length = 0;
                            affichage[iterNoeud, _temps] = rech.passagersEnStation(gares[iterNoeud].listeDesPassagers).length;
                            //console.log(affichage)
                        }
                        //ligne3429
                        //ça  marche
                        //injection des trains dans le système
                        for (var iter = 0; iter < directions.length; iter++) {
                            //console.log("iterInjT: " + iter)
                            //on y entre si il n'y a pas encore de train dans le système sinon c'est dans le if plus bas
                            if (directions[iter]._timer <= 0 && directions[iter].trains.length <= 0) {
                                var train = new tr.Train();
                                train.dateEntree = _temps;
                                train.id = compteurTrain;
                                compteurTrain++;
                                train.ligne = directions[iter].ligne;
                                //console.log(train);

                                if (directions[iter].complexe) {
                                    if (directions[iter].choix == 1) {
                                        train.parcours = directions[iter].parcours;
                                        directions[iter].choix = 2;
                                    }
                                    else {
                                        train.parcours = directions[iter].parcours2;
                                        directions[iter].choix = 1;
                                    }
                                }
                                else {
                                    train.parcours = directions[iter].parcours;
                                    //console.log(train)
                                }
                                train.nombreStationsVisitees = 1;
                                train.capacite = directions[iter].capaciteTrains[temps];

                                train._timer = 0;
                                train.nombreMinutesDeMarche = -1;
                                train.dateDernierDepart = temps;

                                directions[iter].trains.push(train);
                                if ((directions[iter].ligne == "ligneA") || (directions[iter].ligne == "ligneB")) {
                                    //console.log(heureDePointe(temps));
                                    if (heureDePointe(temps, pasDeTemps)) {
                                        directions[iter]._timer = intervalleDepartTrainsPointe;
                                    }
                                    else {
                                        directions[iter]._timer = intervalleDepartTrainsCreuse;
                                    }
                                }
                                else {
                                    if (heureDePointe(temps, pasDeTemps)) {
                                        directions[iter]._timer = intervalleDepartMetrosPointe;
                                    }
                                    else {
                                        directions[iter]._timer = intervalleDepartMetrosCreuse;
                                    }
                                }
                                if (directions[iter].complexe) {
                                    directions[iter]._timer -= parseInt(directions[iter]._timer / 2);
                                    //console.log(directions[iter]._timer);

                                }
                                //AFFICHAGE
                                //console.log(temps);
                                //console.log(train);
                                //console.log(directions[iter]);
                            }
                            //ligne 3472
                            //partie SP sur la ligne A Nation chatelet
                            /*if (_temps > 430 && _temps <540 && directions[iter].ligne == "ligneA")
                            {
                                for (int kpIt = 0; kpIt < directions[iter].trains.Count; kpIt++)
                                {
                                    if (directions[iter].trains[kpIt].parcours.Count > 20) directions[iter].trains[kpIt].stop = false;
                                    if (directions[iter].trains[kpIt].parcours.Count > 20 && directions[iter].trains[kpIt]._timer <= 0)
                                    {
                                        directions[iter].trains.RemoveAt(kpIt);
                                        kpIt--;
                                    }
                                }
        
                                if (directions[iter]._timer <= 0 && directions[iter].trains.Count > 0 )
                                {
                                    if (directions[iter].trains[directions[iter].trains.Count - 1].nombreMinutesDeMarche > 0)
                                    {
                                        if (directions[iter].nomDirection == "SAINT-GERMAIN-EN-LAYE-MARNE-LA-VALLEE-CHESSY")
                                        {
                                            Train train = new Train();
                                            Train train2 = new Train();
                                            train._timer = 0;
                                            train2._timer = 0;
                                            train.dateEntree = _temps;
                                            train2.dateEntree = _temps;
                                            train.id = compteurTrain;
                                            train2.id = compteurTrain + 1;
                                            train.lienPCC = new LienPccTrain();
                                            train2.lienPCC = new LienPccTrain();
                                            compteurTrain++; compteurTrain++;
                                            train.ligne = directions[iter].ligne;
                                            train2.ligne = directions[iter].ligne;
                                            if (directions[iter].complexe)
                                            {
                                                if (directions[iter].choix == 1)
                                                {
                                                    train.parcours = directions[iter].parcours.GetRange(0, 12);
                                                    train2.parcours = directions[iter].parcours.GetRange(13, 13);
                                                    directions[iter].choix = 2;
                                                }
                                                else
                                                {
                                                    train.parcours = directions[iter].parcours2.GetRange(0, 12);
                                                    train2.parcours = directions[iter].parcours2.GetRange(13, 11);
                                                    directions[iter].choix = 1;
                                                }
                                            }
                                            //else train.parcours = directions[iter].parcours;
        
                                            train.nombreStationsVisitees = 1;
                                            train2.nombreStationsVisitees = 1;
                                            train.capacite = directions[iter].capaciteTrains[temps];
                                            train2.capacite = directions[iter].capaciteTrains[temps];
                                            train.nombreMinutesDeMarche = -1;
                                            train2.nombreMinutesDeMarche = -1;
                                            directions[iter].trains.Add(train);
                                            directions[iter].trains.Add(train2);
                                        }
                                        else 
                                        {
                                            Train train = new Train();
                                            Train train2 = new Train();
                                            train._timer = 0;
                                            train2._timer = 0;
                                            train.dateEntree = _temps;
                                            train2.dateEntree = _temps;
                                            train.id = compteurTrain;
                                            train2.id = compteurTrain + 1;
                                            train.lienPCC = new LienPccTrain();
                                            train2.lienPCC = new LienPccTrain();
                                            compteurTrain++; compteurTrain++;
                                            train.ligne = directions[iter].ligne;
                                            train2.ligne = directions[iter].ligne;
                                            if (directions[iter].complexe)
                                            {
                                                if (directions[iter].choix == 1)
                                                {
                                                    train.parcours = directions[iter].parcours.GetRange(0, 13);
                                                    train2.parcours = directions[iter].parcours.GetRange(14, 12);
                                                    directions[iter].choix = 2;
                                                }
                                                else
                                                {
                                                    train.parcours = directions[iter].parcours2.GetRange(0, 11);
                                                    train2.parcours = directions[iter].parcours2.GetRange(12, 12);
                                                    directions[iter].choix = 1;
                                                }
                                            }
                                            //else train.parcours = directions[iter].parcours;
        
                                            train.nombreStationsVisitees = 1;
                                            train2.nombreStationsVisitees = 1;
                                            train.capacite = directions[iter].capaciteTrains[temps];
                                            train2.capacite = directions[iter].capaciteTrains[temps];
                                            train.nombreMinutesDeMarche = -1;
                                            train2.nombreMinutesDeMarche = -1;
                                            directions[iter].trains.Add(train);
                                            directions[iter].trains.Add(train2);
                                        }
                                    }
                                }
        
        
                            }
                            //suppression des trains en cas de perturbation sur la ligne A
                            if (_temps > 420 && _temps < 450 && directions[iter].ligne == "ligneA")//550
                            {
                                for (int kpIt = 0; kpIt < directions[iter].trains.Count; kpIt++)
                                {
                                    if (directions[iter].trains[kpIt].dateEntree< 450 && directions[iter].trains[kpIt]._timer <= 0)//540
                                    {
                                        directions[iter].trains.RemoveAt(kpIt);
                                        kpIt--;
                                    }
                                }
                            }
                            else
                            {*/
                            ////////DECALER D UN RANK jusqu'A LA FIN DE CE IF
                            //TEST CONDITION
                            //console.log("look")
                            //console.log('timer direct: ' + directions[iter]._timer);
                            //console.log('nb train: ' + directions[iter].trains.length);

                            //on y entre quand il y a déjà un train et que le nombre de minutes de marhe est plus grand que 0
                            if (directions[iter]._timer <= 0 && directions[iter].trains.length > 0 /*&& directions[iter].trains.length < 31*/) { //SAME
                                //console.log(directions[iter].trains[/*directions[iter].trains.length - 1*/0].nombreMinutesDeMarche)
                                if (directions[iter].trains[directions[iter].trains.length - 1].nombreMinutesDeMarche > 0) {
                                    train = new tr.Train();
                                    train._timer = 0;
                                    train.dateEntree = _temps;
                                    train.id = compteurTrain;
                                    train.lienPCC = new lpt.LienPccTrain();
                                    compteurTrain++;
                                    train.ligne = directions[iter].ligne;
                                    //console.log(train);

                                    //TEST CONDITION
                                    //directions[iter].complexe = true;
                                    //directions[iter].choix = 2
                                    //console.log(directions);

                                    if (directions[iter].complexe) {
                                        if (directions[iter].choix == 1) {
                                            train.parcours = directions[iter].parcours;
                                            directions[iter].choix = 2;
                                            //console.log(directions);
                                            //console.log(train);
                                        }
                                        else {
                                            train.parcours = directions[iter].parcours2;
                                            directions[iter].choix = 1;
                                            //console.log(directions);
                                            //console.log(train);
                                        }
                                    }
                                    else {
                                        train.parcours = directions[iter].parcours;
                                        //console.log(train);
                                    }

                                    train.nombreStationsVisitees = 1;
                                    train.capacite = directions[iter].capaciteTrains[temps];
                                    train.nombreMinutesDeMarche = -1;
                                    train.dateDernierDepart = temps;
                                    directions[iter].trains.push(train);

                                    //console.log(directions[iter]);
                                }
                            }
                            //} ligne 3626
                            //TEST CONDITION 
                            //directions[iter].complexe = true;
                            //console.log(directions[iter]);
                            //var lol = true;

                            //decide tous les combien de temps les trains partent
                            if (directions[iter]._timer <= 0) {
                                if ((directions[iter].ligne == "ligneA") || (directions[iter].ligne == "ligneB")) {
                                    if (heureDePointe(temps, pasDeTemps)) {
                                        directions[iter]._timer = intervalleDepartTrainsPointe;
                                        //console.log(directions);
                                    }
                                    else {
                                        directions[iter]._timer = intervalleDepartTrainsCreuse;
                                        //console.log(directions);
                                    }

                                    //fréquence des trains sur la ligne A
                                    ///if (directions[iter].ligne == "ligneA")
                                    ///{
                                    ///    if (heureDePointe(temps)) directions[iter]._timer += 6;
                                    ///    else directions[iter]._timer += 30;
                                    ///}
                                }
                                else {
                                    if (heureDePointe(temps, pasDeTemps)) {
                                        directions[iter]._timer = intervalleDepartMetrosPointe;
                                        //console.log(directions);
                                    }
                                    else {
                                        directions[iter]._timer = intervalleDepartMetrosCreuse;
                                        //console.log(directions);
                                    }
                                }
                                if (directions[iter].complexe) {
                                    directions[iter]._timer -= parseInt(directions[iter]._timer / 2);
                                    //console.log(directions);
                                }
                            }
                            //console.log(directions[iter].trains); //utiliser ce console pour voir les trains créés
                        }

                        //ligne 3649
                        //met à jour les minutes de marche
                        for (var iter = 0; iter < directions.length; iter++) {
                            directions[iter]._timer--;

                            //AFFICHAGE
                            //console.log(directions);
                            //console.log(directions[iter].trains.length)

                            //gestion de l'avancement des trains
                            for (var it = 0; it < directions[iter].trains.length; it++) {
                                directions[iter].trains[it].stop = false;
                                //console.log(directions[iter].trains[it]);
                                if (!directions[iter].trains[it].stop) {
                                    if (it == 0) {
                                        //console.log(directions[iter]);
                                        directions[iter].trains[it]._timer--;
                                        directions[iter].trains[it].nombreMinutesDeMarche++;
                                        //console.log(directions[iter]);
                                    }
                                    else {
                                        if (!(directions[iter].trains[it].nombreMinutesDeMarche + 1 >= directions[iter].trains[it - 1].nombreMinutesDeMarche)) {
                                            directions[iter].trains[it]._timer--;
                                            directions[iter].trains[it].nombreMinutesDeMarche++;
                                        }
                                    }
                                }
                                else {
                                    directions[iter].trains[it].stop = false;
                                }
                                //console.log('itTrain: ' + it);
                                //console.log('nb minutes marche: ' + directions[iter].trains[it].nombreMinutesDeMarche);
                            }
                        }

                        /////////AAAAAA REGARDERRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR
                        /*if (chkComportement.Checked) {
                            comportementDesPassagers();
                        }
                        if (temps == (debutScenario + 5) && (chkGestion.Checked)) {
                            planDeGestion2(temps, 1);//////////
                        }*/

                        //console.log(affichageParLigne);
                        for (var iterLigne = 0; iterLigne < /*18*/18; iterLigne++) { //A ENLEVER
                            affichageParLigne[iterLigne][temps] = 0;
                            //console.log(affichageParLigne[iterLigne][temps]);
                            for (var iterGares = 0; iterGares < nbGares; iterGares++) {
                                var stockPassager = rech.passagersSurLigne(gares[iterGares].listeDesPassagers, tabLignes[iterLigne].NomLigne);
                                affichageParLigne[iterLigne][temps] += stockPassager.length;

                                //AFFICHAGE
                                //console.log(gares[iterGares].listeDesPassagers);
                                //console.log(tabLignes);
                                //console.log(iterLigne)
                                //console.log(stockPassager);
                                //console.log(affichageParLigne);
                                //console.log(affichageParLigne[iterLigne, temps]);
                            }
                        }
                        //console.log(gares[1].listeDesPassagers)
                        //console.log(affichageParLigne);

                        if (_temps ==  /*(heureDebut * pasDeTemps + dureeTotale * pasDeTemps)-1*/19) {
                            resolve(affichageParLigne);
                        }
                    }

                    //ligne 3691
                    //partie dynamique
                    //à ignorer pour le moment d'après le doctorant
                    for (var myIt1 = 0; myIt1 < /*nbGares*/0; myIt1++) //A ENLEVER
                    {
                        //console.log(gares[myIt1].voisins.length);
                        for (var myIt2 = 0; myIt2 < gares[myIt1].voisins.length; myIt2++) {
                            //console.log(gares[myIt1].voisins[myIt2].tempsParcoursLienDynamique.length + 1);
                            //console.log(Number.MAX_SAFE_INTEGER);
                            for (var myIt3 = /*gares[myIt1].voisins[myIt2].tempsParcoursLienDynamique.length + 1*/ 0; myIt3 <= /*1440*/0; myIt3++) { //A ENLEVER
                                gares[myIt1].voisins[myIt2].tempsParcoursLienDynamique.push(Number.MAX_SAFE_INTEGER);
                                //console.log(gares[myIt1].voisins[myIt2])
                            }
                        }
                    }
                    var timeStep = 3;
                    var heureDebut_ = 100;
                    for (var betTemps = /*heureDebut_*/0; betTemps/* * timeStep < 1440*/ < 1; betTemps++) // A ENLEVER
                    {
                        var tabBetAux = [[[]]]; //int
                        var tabPCCAux = [[]]; //float
                        for (var betNoeudDepart = 0; betNoeudDepart </* nbGares*/1; betNoeudDepart++) //A ENLEVER
                        {
                            var myListPCC = []; //float
                            //tabBetAux.push(trouverCheminDynamique(gares[betNoeudDepart], betTemps * timeStep));/////////   
                            //tabPCCAux.push(myListPCC);////////
                        }
                        tabBetweeness.push(tabBetAux); //on push à la base d'un tab 4 dimensions un tab 3 dimensions
                        tabAverageShortestPath.push(tabPCCAux); //on push à la base d'un tab 3 dimensions un tab 2 dimensions

                        //AFFICHAGE
                        //console.log(tabBetweeness);
                        //console.log(tabAverageShortestPath)
                    }
                    var betweenessCent = []; //float
                    var ASP = 0.0;
                    var eviterInfini = 0;
                    for (var betNoeud = 0; betNoeud < /*nbGares*/1; betNoeud++) { 
                        betweenessCent.push(0.0);
                        var myVar2 = 0.0;
                        eviterInfini = 0;

                        //AFFICHAGE
                        //console.log(heureDebut_);
                        for (var betTemps = /*heureDebut_*/0; betTemps/* * timeStep < 1440*/ < 1; betTemps++) // A ENLEVER
                        {
                            var myVar1 = 0.0;
                            for (var betNoeudDepart = 0; betNoeudDepart < /*nbGares*/1; betNoeudDepart++) //A ENLEVER
                            {
                                for (var betNoeudArrive = 0; betNoeudArrive < /*nbGares*/1; betNoeudArrive++) //A ENLEVER
                                {
                                    //if (tabBetweeness[betTemps - heureDebut_][betNoeudDepart][betNoeudArrive].Contains(betNoeud))////////
                                    //    betweenessCent[betNoeud]++;////////
                                    //////////
                                    /*
                                    if ((tabAverageShortestPath[betTemps - heureDebut_][betNoeudDepart][betNoeudArrive] - betTemps * timeStep == 0) && (betNoeudDepart != betNoeudArrive))
                                   { 
                                        eviterInfini++; 
                                    }
                                   else
                                   {
                                       if (betNoeudDepart != betNoeudArrive) myVar1 += 1 / (tabAverageShortestPath[betTemps - heureDebut_][betNoeudDepart][betNoeudArrive] - betTemps * timeStep);
                                   }*/
                                }
                            }
                            myVar1 = myVar1 / (nbGares * (nbGares - 1));
                            myVar2 = myVar2 + myVar1;
                        }
                        betweenessCent[betNoeud] = betweenessCent[betNoeud] / (((1440 - heureDebut_ * timeStep) / timeStep) * nbGares * (nbGares - 1));
                        ASP = myVar2 / (((1440 - heureDebut_ * timeStep) / timeStep) - eviterInfini);

                        //AFFICHAGE
                        //console.log((((1440 - heureDebut_ * timeStep) / timeStep) * nbGares * (nbGares - 1)));
                        //console.log((1440 - heureDebut_ * timeStep) / timeStep);
                        //console.log(eviterInfini);
                        //console.log(betweenessCent);
                        //console.log(myVar2);
                    }

                    //affichage

                })
                .catch(function (error) {
                    console.log(error.message);
                })
        })

}

function conversionHeure(heure) {  //return int, heure est un string
    var _heure = 0;
    var _minute = 0;
    //char[] tabChar = new char[] { 'h', 'H' };
    //string[] tabString = ((string)heure).Split(tabChar);

    _heure = int.Parse(tabString[0]);
    _minute = int.Parse(tabString[1]);
    return _heure * pasDeTemps + (_minute / (60 / pasDeTemps));
}


//fonction qui lance l'initialisation et qui envoie au serveur le résultat.
module.exports.test = function (myDB) {
    return new Promise(
        function (resolve, reject) {
            var Vini = new VaIni.VarIni();
            var reseau = new res.Reseau();
            initialisation(Vini, reseau, myDB).then(function (affichageParLigne) {
                //console.log(affichageParLigne);
                resolve(affichageParLigne);
            });
            //resolve(Vini); // à enlever
        })
}

//test();

//CORRIGER
// ligne 2293 illegal break (done), 
//soh dans scenario, ne pas oublier d'enlever dans toutes les bouclees les fausses conditions pour y entrer
//ligne 2897 problème avec index = -1?
//ligne 2945 faut régler le problème d'asynchro parce que je reçois pas toujours les trucs dans l'ordre (fait normalement)
//regler l'odre des opérations donc dans le dernier while que j'ai fait (done)
//comprendre chkgestion et chkcomportement 3394 2972 (s'ils sont cochés ça fait des opérations en plus, à voir)
// certains éléments dans lientrecomporsante sont nuls, est ce normal? on a par exemple le tempsparcours et distances. (normal je crois?)


//FAIRE AFFICHAGE
//regarde 6138 pour voir où est le graphe
//var importante: resultatsref, affichageparligne, tout ce qui ca avec reference
//classe graph à regarder