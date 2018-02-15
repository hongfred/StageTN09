'use strict';

module.exports.VarIni = function () {
    //utilisée dans ini et plan de gestion
    this.pUID = 'root';
    this.pPASS = '020295';
    this.pasDeTemps = 4;//Le pas de temps de la simulation. cette valeur est mis à jour via l'interface graphique
    this.dureeTotale = 24;//durée totale de la simulation
    this.heureDebut = 4;
    this.nbGares;

    this.tempsAvantPriseEnChargeRER = 0; //Cela modélise le temps de parcours depuis l'entrée de la station jusqu'au quai
    this.tempsAvantPriseEnChargeMetro = 0;

    this.tempsCorrespondanceRER = 5;
    this.tempsCorrespondanceMetro = 5;
    this.tempsDeParcoursLienRER = 3;
    this.tempsDeParcoursLienMetro = 2;

    //ces variable ne sont utilisées que dans la fonction "initialisation". Donc pas utilisées dans le modèle. A supprimer???
    //utilisées dans ini
    this.tempsMoyenAvantPriseEnChargeRERPointe = 0;//5
    this.tempsMoyenAvantPriseEnChargeRERCreuse = 0;//10
    this.tempsMoyenAvantPriseEnChargeMetroPointe = 0;//2
    this.tempsMoyenAvantPriseEnChargeMetroCreuse = 0;//4

    //utilisées dans direction
    this.capaciteTrainsPointe = 4750;//50000
    this.capaciteTrainsCreuse = 4750;//50000
    this.capaciteMetrosPointe = 4750;//50000
    this.capaciteMetrosCreuse = 4750;//50000

    //intervalle de temps séparant chaque départ de train dans les terminus des lignes 
    //utilisées plan de gestion
    this.intervalleDepartTrainsPointe = 2;
    this.intervalleDepartTrainsCreuse = 10;
    this.intervalleDepartMetrosPointe = 2;
    this.intervalleDepartMetrosCreuse = 5;

    //utilisées dans plan de gestion et pour debut dans scenario aussi
    this.compteurTrain = 0;//sert à donner un identifiant aux trains
    this.tempsAttenteMax = -30;//En présence d'une perturbation, la durée de temps après laquelle le passager décide de changer d'itinéraire 
    this.debutScenario = -1;//heure du début du scénario, calculée en foncion du pas de temps
};


