'use strict';


module.exports.Passager = function () {
        this.nom = "";
        this.idStationEntree; //int
        this.idStationSortie; //int
        this.dateEntree; //int
        this.dateSortie; //int
        /// <summary>
        /// 1:vient d'entrer ds le transport 2:est sur une ligne 3: en correspondance
        /// </summary>
        this.etat = -1; //int
        /// <summary>
        /// liste des stations de son parcours sur la base du plus court chemin
        /// </summary>
        this.parcoursNormal = []; //liste de int
        /// <summary>
        /// liste du temps de parcours entre 2 stations de son parcours
        /// </summary>
        this.tempsParcoursNormal = 0; //int
        /// <summary>
        /// liste des stations de son parcours sur la base du plus court chemin
        /// </summary>
        this.parcoursEffectif = []; //liste de int  
        this.tempsParcoursEffectif = 0; //int
        this.nombreStationsVisitees = 1; //int
        this.arriveDestination = false; //bool
        this.passagerTraite = false; //bool
        this.premierPasSurLien = false; //bool
        this.correspondanceAEffectuer = false; //bool
        this.ligne = ""; //string
        this.ligneOld = ""; //string
        this._timer = 0; //int
        this.direction = -1;
        this.idTrain = -1;

        this.NbKmSurLigne = []; //liste de float

        for (var i = 0; i < 18; i++) {
            this.NbKmSurLigne.push(0.0);
        }
};
