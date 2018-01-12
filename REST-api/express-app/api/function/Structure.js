'use strict';
var rail = require('./Rail.js');

module.exports.Structure = function () {
    this.Noeud = function () {
        this.nom = '';
        this.type;
    }

    this.Gare = function () {
        this.Noeud.apply(this, Array.prototype.slice.call(arguments));
        //[XmlAttribute]
        this.indice = -1;
        //[XmlAttribute]
        this.capaciteAccueilPassagers = []; //type int
        //[XmlArray("nbVenantDeEnv")]
        //[XmlArrayItem("venantDeEnv")]
        this.nombreDePassagersVenantDeEnv = []; //type int
        this.destinationPassagers = []; //type int

        this.voisins = []; //type rail

        //[XmlArray("listeParcoursTemps")]
        //[XmlArrayItem("parcoursTemps")]
        this.parcoursTEMPS = []; //type string
        this.tempsParcoursTEMPS = []; //type int

        this.listeDesPassagers = []; //type passager
        this.listeDesPassagersEnAttente = []; //type passager
        this._listeDesPassagersEnAttente = []; //type passager

        this.tempsCorrespondance = []; //type int
        //public List<int> tempsMoyenAvantPriseEnCharge;

        //pour le calcul du plus court chemin (ppc)
        this.ppcCout;
        this.ppcCoutDynamique;
        this.ppcPredecesseur;
        this.ppcPredecesseurLigne = "";

        this.ppcCoutArc = function (voisins, indiceDestination, opt) {
            voisins.forEach(function (rail) {
                //console.log("fonction une");
                //console.log(element);
                if (rail.indiceVoisin == indiceDestination) {
                    //console.log("je suis dans l'indice");
                    if (opt == 1) {
                        //console.log("je suis dans l'option 1");
                        return rail.tempsParcoursLien[0];
                    }
                    if (opt == 2) {
                        //console.log("je suis dans l'option 2");
                        return rail.myWeight;
                    }
                }
            });
            return Number.MAX_VALUE;
        }

        this.ppcCoutArc2 = function (voisins, indiceDestination, ligne, opt) {
            //console.log(voisins[0].indiceVoisin);

            for (var vois = 0; vois < voisins.length; vois++) {
                //console.log("fonction deux");
                //console.log(rail);
                if ((voisins[vois].indiceVoisin == indiceDestination) && (voisins[vois].ligne == ligne)) {
                    //console.log("je suis dans l'indice");
                    if (opt == 1) {
                        //console.log("je suis dans l'option 1");
                        return (voisins[vois].tempsParcoursLien[0]);
                    }
                    if (opt == 2) {
                        //console.log("je suis dans l'option 2");
                        //console.log('ind dest ' + indiceDestination);
                        //console.log(voisins);
                        return (voisins[vois].myWeight);
                    }
                }
            }
            return (Number.MAX_VALUE);
        }

        this.ppcCoutArcDynamique = function (voisins, indiceDestination, temps) {
            voisins.forEach(function (rail) {
                //console.log("fonction trois");
                //console.log(rail);
                if ((rail.indiceVoisin == indiceDestination) && (temps < 1440) && (temps >= 0)) {
                    console.log("je suis dans l'indice");
                    return rail.tempsParcoursLienDynamique[temps];
                }
            });
            return Number.MAX_VALUE;
        }

    }

};


