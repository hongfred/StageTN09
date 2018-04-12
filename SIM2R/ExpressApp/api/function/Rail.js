'use strict';

//serializabe
module.exports.Rail = function () {
    //[XmlAttribute]
    this.indiceVoisin;
    //[XmlAttribute]
    this.ligne;
    this.nbPasEnvoyes;
    this.myWeight;//pour calculer un chemin particulier
    this.sort= [];//sort du noeud considéré vers le voisin d'indice indiceVoisin par période de temps
    //[XmlArray("valeurCapaciteLien")]
    //[XmlArrayItem("capaciteLien")]
    this.capaciteDuLien = []; //type int
    this.passagersPasEnvoyes = []; //type int
    this.capaciteDuLienRestant = [];//mesure le nombre de passagers que l'on peut encore envoyer par ce lien  type int
    this.distance; //type int
    this.tempsMoyenAvantPriseEnCharge = []; //type int
    this.tempsParcoursLien = [];//temps de parcours du lien en minutes   type int
    this.tempsParcoursLienDynamique = []; //type int
    //this.tempsMoyenAvantPriseEnCharge = 0;//lorsque le passager rentre dans le transport à la station de départ de ce lien

    this.operabilite = []; //type bool
};


