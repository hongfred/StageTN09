'use strict';
var tr = require('./Train.js');
var direction = require('./Direction.js');
var struct = require('./Structure.js')

//serializabe
module.exports.Direction = function () {
    this.ligne = "";
    this.complexe = false;
    this._timer = -1;
    this.choix = 1;
    //public int directionConflit = -1;
    this.nomDirection = "";
    this.parcours = []; //type int
    this.parcours2 = []; //type int
    this.horairesDepart = []; //type int
    this.capaciteTrains = []; //tupe int
    this.trains = []; //type train
};

// <summary>
// Mise en place des directions
// </summary>
//ligne 696
module.exports.MajDirections = function (Vini, reseau) { //ça  marche 
    //initialisation var ini
    var nbGares = Vini.nbGares;
    //console.log("hey maj dir: " + nbGares);
    var pasDeTemps = Vini.pasDeTemps;
    var heureDebut = Vini.heureDebut;
    var capaciteTrainsPointe = Vini.capaciteTrainsPointe;
    var capaciteTrainsCreuse = Vini.capaciteTrainsCreuse;
    var capaciteMetrosPointe = Vini.capaciteMetrosPointe;
    var capaciteMetrosCreuse = Vini.capaciteMetrosPointe;

    //initialisation reseau
    var directions = reseau.directions;
    var gares = reseau.gares;

    var depart = 0;
    var arrive = 0;
    var depart2 = 0;//Pour les lignes avec bifurcations
    var arrive2 = 0;

    for (var iter = 0; iter < 36/*par ligne et par sens*/; iter++) { //ça marche
        console.log("iniMaj " + iter)
        var dir = new direction.Direction();
        //ligne1 sens1
        dir._timer = 5 * pasDeTemps - heureDebut * pasDeTemps - 60;//La circulation des tranis commence à 5h

        if (iter == 0) {
            dir.ligne = "ligne1";
            dir.nomDirection = "CHATEAU DE VINCENNES-LA DEFENSE";
            depart = 63;
            arrive = 148;
        }
        //ligne1 sens2
        if (iter == 1) {
            dir.ligne = "ligne1";
            dir.nomDirection = "LA DEFENSE-CHATEAU DE VINCENNES";
            depart = 148;
            arrive = 63;
        }
        //ligne2 sens1
        if (iter == 2) {
            dir.ligne = "ligne2";
            dir.nomDirection = "NATION-PORTE DAUPHINE";
            depart = 213;
            arrive = 259;
        }
        //ligne2 sens2
        if (iter == 3) {
            dir.ligne = "ligne2";
            dir.nomDirection = "PORTE DAUPHINE-NATION";
            depart = 259;
            arrive = 213;
        }
        //ligne3 sens1
        if (iter == 4) {
            dir.ligne = "ligne3";
            dir.nomDirection = "GALLIENI-PONT DE LEVALLOIS";
            depart = 117;
            arrive = 249;
        }
        //ligne3 sens2
        if (iter == 5) {
            dir.ligne = "ligne3";
            dir.nomDirection = "PONT DE LEVALLOIS-GALLIENI";
            depart = 249;
            arrive = 117;
        }
        //ligne3 bis sens1
        if (iter == 6) {
            dir.ligne = "ligne3 bis";
            dir.nomDirection = "PORTE DES LILAS-GAMBETTA";
            depart = 275;
            arrive = 118;
        }
        //ligne3 bis sens2
        if (iter == 7) {
            dir.ligne = "ligne3 bis";
            dir.nomDirection = "GAMBETTA-PORTE DES LILAS";
            depart = 118;
            arrive = 275;
        }
        //ligne4 sens1
        if (iter == 8) {
            dir.ligne = "ligne4";
            dir.nomDirection = "PORTE DE CLIGNANCOURT-PORTE D'ORLEANS";
            depart = 265;
            arrive = 258;
        }
        //ligne4 sens2
        if (iter == 9) {
            dir.ligne = "ligne4";
            dir.nomDirection = "PORTE D'ORLEANS-PORTE DE CLIGNANCOURT";
            depart = 258;
            arrive = 265;
        }
        //ligne5 sens1
        if (iter == 10) {
            dir.ligne = "ligne5";
            dir.nomDirection = "BOBIGNY-P. PICASSO-PLACE D'ITALIE";
            depart = 30;
            arrive = 243;
        }
        //ligne5 sens2
        if (iter == 11) {
            dir.ligne = "ligne5";
            dir.nomDirection = "PLACE D'ITALIE-BOBIGNY-P. PICASSO";
            depart = 243;
            arrive = 30;
        }
        //ligne6 sens1
        if (iter == 12) {
            dir.ligne = "ligne6";
            dir.nomDirection = "NATION-CH DE GAULLE-ETOILE";
            depart = 213;
            arrive = 59;
        }
        //ligne6 sens2
        if (iter == 13) {
            dir.ligne = "ligne6";
            dir.nomDirection = "CH DE GAULLE-ETOILE-NATION";
            depart = 59;
            arrive = 213;
        }
        //ligne7 sens1
        if (iter == 14) {
            dir.ligne = "ligne7";
            dir.nomDirection = "LA COURNEUVE-8 MAI 1945-MAIRIE D'IVRY";
            dir.complexe = true;
            depart = 146;
            arrive = 181;

            depart2 = 146;
            arrive2 = 350;
        }
        //ligne7 sens2
        if (iter == 15) {
            dir.ligne = "ligne7";
            dir.nomDirection = "MAIRIE D'IVRY-LA COURNEUVE-8 MAI 1945";
            dir.complexe = true;
            depart = 181;
            arrive = 146;

            depart2 = 350;
            arrive2 = 146;
        }
        //ligne7 bis sens1
        if (iter == 16) {
            dir.ligne = "ligne7 bis";
            dir.nomDirection = "LOUIS BLANC-PRE SAINT GERVAIS";
            depart = 172;
            arrive = 278;
        }
        //ligne7 bis sens2
        if (iter == 17) {
            dir.ligne = "ligne7 bis";
            dir.nomDirection = "PRE SAINT GERVAIS-LOUIS BLANC";
            depart = 278;
            arrive = 172;
        }
        //ligne8 sens1
        if (iter == 18) {
            dir.ligne = "ligne8";
            dir.nomDirection = "BALARD-CRETEIL-PREFECTURE";
            depart = 18;
            arrive = 87;
        }
        //ligne8 sens2
        if (iter == 19) {
            dir.ligne = "ligne8";
            dir.nomDirection = "CRETEIL-PREFECTURE-BALARD";
            depart = 87;
            arrive = 18;
        }
        //ligne9 sens1
        if (iter == 20) {
            dir.ligne = "ligne9";
            dir.nomDirection = "PONT DE SEVRES-MAIRIE DE MONTREUIL";
            depart = 251;
            arrive = 183;
        }
        //ligne9 sens2
        if (iter == 21) {
            dir.ligne = "ligne9";
            dir.nomDirection = "MAIRIE DE MONTREUIL-PONT DE SEVRES";
            depart = 183;
            arrive = 251;
        }
        //ligne10 sens1
        if (iter == 22) {
            dir.ligne = "ligne10";
            dir.nomDirection = "GARE D'AUSTERLITZ-BOULOGNE-PONT DE ST-CLOUD";
            depart = 119;
            arrive = 39;
        }
        //ligne10 sens2
        if (iter == 23) {
            dir.ligne = "ligne10";
            dir.nomDirection = "BOULOGNE-PONT DE ST-CLOUD-GARE D'AUSTERLITZ";
            depart = 39;
            arrive = 119;
        }
        //ligne11 sens1
        if (iter == 24) {
            dir.ligne = "ligne11";
            dir.nomDirection = "MAIRIE DES LILAS-CHATELET";
            depart = 185;
            arrive = 66;
        }
        //ligne11 sens2
        if (iter == 25) {
            dir.ligne = "ligne11";
            dir.nomDirection = "CHATELET-MAIRIE DES LILAS";
            depart = 66;
            arrive = 185;
        }
        //ligne12 sens1
        if (iter == 26) {
            dir.ligne = "ligne12";
            dir.nomDirection = "MAIRIE D'ISSY-PORTE DE LA CHAPELLE";
            depart = 180;
            arrive = 266;
        }
        //ligne12 sens2
        if (iter == 27) {
            dir.ligne = "ligne12";
            dir.nomDirection = "PORTE DE LA CHAPELLE-MAIRIE D'ISSY";
            depart = 266;
            arrive = 180;
        }
        //ligne13 sens1
        if (iter == 28) {
            dir.ligne = "ligne13";
            dir.nomDirection = "CHATILLON-MONTROUGE-SAINT DENIS-UNIVERSITE";
            dir.complexe = true;
            //dir.directionConflit = 32;
            depart = 67;
            arrive = 304;

            depart2 = 67;
            arrive2 = 11;
        }
        //ligne13 sens2
        if (iter == 29) {
            dir.ligne = "ligne13";
            dir.nomDirection = "SAINT DENIS-UNIVERSITE-CHATILLON-MONTROUGE";
            dir.complexe = true;
            //dir.directionConflit = 33;
            depart = 304;
            arrive = 67;

            depart2 = 11;
            arrive2 = 67;
        }
        //ligne14 sens1
        if (iter == 30) {
            dir.ligne = "ligne14";
            dir.nomDirection = "OLYMPIADES-SAINT-LAZARE";
            depart = 224;
            arrive = 317;
        }
        //ligne14 sens2
        if (iter == 31) {
            dir.ligne = "ligne14";
            dir.nomDirection = "SAINT-LAZARE-OLYMPIADES";
            depart = 317;
            arrive = 224;
        }
        //ligneA sens1
        if (iter == 32) {
            dir.ligne = "ligneA";
            dir.nomDirection = "SAINT-GERMAIN-EN-LAYE-MARNE-LA-VALLEE-CHESSY";
            dir.complexe = true;
            //dir.directionConflit = 38;
            depart = 316;
            arrive = 195;

            depart2 = 316;
            arrive2 = 33;
        }
        //ligneA sens2
        if (iter == 33) {
            dir.ligne = "ligneA";
            dir.nomDirection = "MARNE-LA-VALLEE-CHESSY-SAINT-GERMAIN-EN-LAYE";
            dir.complexe = true;
            //dir.directionConflit = 39;
            depart = 195;
            arrive = 316;

            depart2 = 33;
            arrive2 = 316;
        }
        //ligneB sens1
        if (iter == 34) {
            dir.ligne = "ligneB";
            dir.nomDirection = "GARE DU NORD-SAINT-REMY-LES-CHEVREUSE";
            dir.complexe = true;
            //dir.directionConflit = 42;
            depart = 122;
            arrive = 321;

            depart2 = 122;
            arrive2 = 295;
        }
        //ligneB sens2
        if (iter == 35) {
            dir.ligne = "ligneB";
            dir.nomDirection = "SAINT-REMY-LES-CHEVREUSE-GARE DU NORD";
            dir.complexe = true;
            //dir.directionConflit = 43;
            depart = 321;
            arrive = 122;

            depart2 = 295;
            arrive2 = 122;
        }
        for (var i = 0; i < /*nbGares*/357; i++) { //ça marche
            //console.log('voisin length: ' + gares[i].voisins.length);
            for (var j = 0; j < gares[i].voisins.length; j++) {

                if (gares[i].voisins[j].ligne == dir.ligne) {
                    gares[i].voisins[j].myWeight = 1;
                    //console.log(gares[i].voisins[j])
                }
                else {
                    gares[i].voisins[j].myWeight = 10000;
                    //console.log(gares[i].voisins[j])
                }
            }
        }
        //AFFICHAGE
        //console.log(gares[depart].nom)
        //console.log(gares[arrive].nom)
        //console.log(dir.ligne)
        dir.parcours = direction.trouverChemin(gares, gares[depart], gares[arrive], dir.ligne, 2);

        //console.log(dir.complexe)
        if (dir.complexe) {
            dir.parcours2 = direction.trouverChemin(gares, gares[depart2], gares[arrive2], dir.ligne, 2);
        }
        for (var heure = 0; heure <= /*23*/23; heure++) { //ça marche
            for (var temps = heure * pasDeTemps + 1; temps <= (heure + 1) * pasDeTemps; temps++) {
                //console.log((heure + 1) * pasDeTemps)
                if ((dir.ligne == "ligneA") || (dir.ligne == "ligneB")) {
                    if (direction.heureDePointe(temps, pasDeTemps)) {
                        dir.capaciteTrains.push(capaciteTrainsPointe);
                    }
                    else {
                        dir.capaciteTrains.push(capaciteTrainsCreuse);
                    }
                }
                else {
                    if (direction.heureDePointe(temps, pasDeTemps)) {
                        dir.capaciteTrains.push(capaciteMetrosPointe);
                    }
                    else {
                        dir.capaciteTrains.push(capaciteMetrosCreuse);
                    }
                }
            }
        }
        //console.log(dir.capaciteTrains)
        //dir1.horairesDepart
        //dir1.trains
        directions.push(dir);
        //console.log(directions[iter].parcours)        
    }
}

//ligne 4023
module.exports.trouverChemin = function (gares, depart, destination, ligne, opt)  //para sortie : chemin qui est une liste de int //ça marche
{
    var chemin = []; //type int
    var garesAOuvrir = [];//type gare
    var noeudOuvert = new struct.Structure();
    noeudOuvert.Gare();

    //on initialise les couts à l'infini pour tous les Sommets 
    gares.forEach(function (elmgares) {
        //console.log(elmgares)
        elmgares.ppcCout = Number.MAX_VALUE;
        //console.log(elmgares.ppcCout);
        elmgares.ppcPredecesseur = null;
        garesAOuvrir.push(elmgares);
    });

    depart.ppcCout = 0;
    //console.log(garesAOuvrir)
    noeudOuvert = direction.ouvreMin(garesAOuvrir);  //ça marche

    //console.log(noeudOuvert)
    //console.log(destination)
    //on verifie qu'il existe au moins un arc liant le Sommet ouvert aux Sommets restants et que l'on n'est pas à l'arrivee

    while (noeudOuvert != destination) {
        for (var n = 0; n < garesAOuvrir.length; n++) {
            var val = noeudOuvert.ppcCout;
            //console.log(val)
            //console.log(n)
            if (opt == 2) {
                //console.log(ligne,opt,noeudOuvert.voisins)
                val += noeudOuvert.ppcCoutArc2(noeudOuvert.voisins, garesAOuvrir[n].indice, ligne, opt);//attention aux arcs multiples entre 2 gares  
                //console.log(val)
            }
            if (opt == 1) {
                val += noeudOuvert.ppcCoutArc(noeudOuvert.voisins, garesAOuvrir[n].indice, opt);
            }
            if (opt == 3) {
                val += noeudOuvert.ppcCoutArc(noeudOuvert.voisins, garesAOuvrir[n].indice, 2);
            }
            if (garesAOuvrir[n].ppcCout > val) {
                //console.log(garesAOuvrir[n].nom)
                garesAOuvrir[n].ppcCout = val;
                garesAOuvrir[n].ppcPredecesseur = noeudOuvert;
            }
        }
        //console.log(garesAOuvrir);
        noeudOuvert = direction.ouvreMin(garesAOuvrir);
        //console.log(garesAOuvrir.length)
        //console.log(noeudOuvert)
    }
    //garesAOuvrir.clear();
    //garesAOuvrir.length = 0;
    //console.log(garesAOuvrir)
    if (destination.ppcCout == Number.MAX_VALUE) {
        //le graphe est pas connexe il nya pas de chemin possible
        //MessageBox.Show("Il n y a pas de chemin possible entre " + depart.nom + "  et " + destination.nom);
        //console.log("Il n y a pas de chemin possible entre " + depart.nom + "  et " + destination.nom);
    }
    else {//construction du chemin
        while (noeudOuvert != depart) {
            chemin.push(noeudOuvert.indice);
            noeudOuvert = noeudOuvert.ppcPredecesseur;
        }
    }
    chemin.push(depart.indice);
    chemin.reverse();
    for (var i = 0; i < /*nbGares*/357; i++) { //ça marche
        gares[i].ppcCout = 0;
    }
    //console.log(chemin)
    return chemin;
}


// <summary>
// ouverture du Sommet de cout minimum parmis les Sommets non visites
// </summary>
// <param name="liste"></param>
// <returns></returns>
//ligne 4224
module.exports.ouvreMin = function (liste)//para entrée: gare  para sortie: gare   ça marche
{
    //console.log(liste);
    var res = new struct.Structure();
    res.Gare();
    res.ppcCout = Number.MAX_VALUE;

    liste.forEach(function (n) {
        //console.log(n.ppcCout);
        //console.log(res.ppcCout)
        if (n.ppcCout <= res.ppcCout) {
            res = n;
            //console.log(res)
        }
    });
    //console.log(res);
    //console.log('indice' + res.indice)
    //console.log("liste length: " + liste.length)
    var iSplice = direction.indiceSplice(liste, res.indice); //permet de trouver le bon indice à couper
    //console.log('iSplice: ' + iSplice);
    liste.splice(iSplice, 1);
    //console.log(res);
    return res;
}

//pour slice au bon indice
module.exports.indiceSplice = function (liste, indice) //retourne le premier voisin qui correspondent à l'indice
{
    for (var i = 0; i < liste.length; i++) {
        //console.log(liste);
        //console.log(indice)
        if (liste[i].indice == indice) {
            return i;
            break;
        }
    }
}

//ligne 542
module.exports.heureDePointe = function (temps, pasDeTemps) { //ça marche
    return ((temps >= pasDeTemps * 7.5 && temps <= pasDeTemps * 9.5) || (temps >= pasDeTemps * 16.5 && temps <= pasDeTemps * 19.5));
}