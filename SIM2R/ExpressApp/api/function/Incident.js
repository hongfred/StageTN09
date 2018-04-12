'use strict';

module.exports.Incident = function () {
    this.Incident = function () {
        this.nomIncident = '';
        this.heureDebut = -1;

        this.ToString = function(){
            return nomIncident;
        }

        this.CompareTo = function(b){//b est un incident
            return 1;//this.heureDebut < b.heureDebut;
        }
    }

    this.Scenario = function () {
        this.type = 'Scenario';
        this.Incident.apply(this, Array.prototype.slice.call(arguments));
        //this.nomScenario = "";
        //this.temps = -1;
        this.duree = -1; //int
        this.nomComposanteAReduire = ""; 
        //this.capaciteComposante = -1;
        this.nomComposanteDepart = "";
        this.nomComposanteArrive = "";
        this.ligne = "";
        this.taux = -1;
        this.choix = -1;
        this.numScenario = -1;      
    }

    this.Procedure = function() {
        this.nomComposanteDefaillante = "";
        this.typeComposanteDefaillante = "";
        this.idComposanteDefaillante = -1;
        this.autresInterventionsEnCours = 0;
        this.ligne = "";
        this.actions = []; //liste d'action
        this.dureeReparation = []; //liste de réparation
        this.cause = "";
        this.autonomieChecked = true;
    }
};


