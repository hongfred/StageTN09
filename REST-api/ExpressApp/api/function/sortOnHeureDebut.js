'use strict';

module.exports.sortOnHeureDebut = function () {
    this.Compare = function(a, b){   //return int, a et b sont des incidents
        if (a.heureDebut > b.heureDebut) {
            return -1;
        }
        else if (a.heureDebut < b.heureDebut) {
            return 1;
        }
        else {
            return 0;
        }
    }
};

