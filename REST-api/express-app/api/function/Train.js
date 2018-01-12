'use strict';


//serializabe
module.exports.Train = function () {
    this.id; //int
    this._timer = 0;
    this.nombreMinutesDeMarche = 0;
    this.nbCorrespondance = 0;
    this.ligne = "";
    this.parcours = []; //type int
    this.dateEntree; //int
    this.dateSortie; //int
    this.nombreStationsVisitees = 1;
    this.capacite = 0;
    this.nbPassagersTransportes = 0;
    this.trainTraite = false;
    //public bool vientDeTrouver = false;
    this.stop = false;
    this.lienPCC = [];   //type LienPccTrain
    this.dateDernierDepart; //int


    function Train(ligne, sens, temps)
    {
        nombreStationsVisitees = 1;
        var parcours = []; //type int
        trainTraite = false;
        _timer = 0;
        capacite = 0;

        //Remplir les attributs selon les parametres d'entrés
    }
};
