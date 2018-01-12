
//ligne 2723
module.exports.passagersSurLigne = function(passager, ligne) //retourne tous les voisins qui correspondent à l'indice
{
    var stock = [];
    for (var i = 0; i < passager.length; i++) {
        //console.log(passager);
        //console.log(ligne);
        if (passager[i].ligne == ligne) {
            stock.push(passager[i]);
            //return true;
        }
        /*else{
            return false;
        }*/
    }
    //console.log(stock);
    return stock;
}

//ligne 2740
module.exports.passagersEnStation = function(listeDesPassagers) //retourne tous les passagers qui ont le timer <=0
{
    var stock = [];
    for (var i = 0; i < listeDesPassagers.length; i++) {
        //console.log(listeDesPassagers[i]);

        if (listeDesPassagers[i]._timer <= 0) {
            //console.log(listeDesPassagers[i]._timer);
            stock.push(listeDesPassagers[i]);
        }
    }
    //console.log(stock);
    return stock;
}


//ligne 2768
 module.exports.arcDIndice = function(voisins, indiceVoisin) //retourne tous les voisins qui correspondent à l'indice
{
    var stock = [];
    for (var i = 0; i < voisins.length; i++) {
        //console.log(voisins);
        //console.log(indiceVoisin)
        if (voisins[i].indiceVoisin == indiceVoisin) {
            stock.push(voisins[i]);
        }
    }
    //console.log(stock);
    return stock;
}


module.exports.arcDIndiceBis = function(voisins, indiceVoisin) //retourne le premier voisin qui correspondent à l'indice
{
    for (var i = 0; i < voisins.length; i++) {
        //console.log(voisins);
        //console.log(indiceVoisin)
        if (voisins[i].indiceVoisin == indiceVoisin) {
            return voisins[i];
            break;
        }
    }
}


//ligne 2784
module.exports.arcDIndiceEtDeLigne = function(voisins, indiceVoisin, ligne) { //retourne le premier voisin qui correspond à la recherche
    //console.log(voisins);
    //console.log(voisins.length);
    //console.log(indiceVoisin);
    //console.log(ligne);
    for (var i = 0; i < voisins.length; i++) {
        if ((voisins[i].indiceVoisin == indiceVoisin) && (voisins[i].ligne == ligne)) {
            return voisins[i];
            break;
        }
    }
}


module.exports.arcDIndiceEtDeLigneBis = function(voisins, indiceVoisin, ligne) { //retourne le premier indice du voisin qui correspond à la recherche
    //console.log(voisins);
    //console.log(voisins.length);
    //console.log(indiceVoisin);
    //console.log(ligne);
    for (var i = 0; i < voisins.length; i++) {
        if ((voisins[i].indiceVoisin == indiceVoisin) && (voisins[i].ligne == ligne)) {
            return i;
            break;
        }
    }
}


//ligne 2823
module.exports.arcDeLigne = function(voisins, ligne) //retourne tous les voisins qui correspondent à l'indice
{
    var stock = [];
    for (var i = 0; i < voisins.length; i++) {
        if (voisins[i].ligne == ligne) {
            stock.push(voisins[i]);
        }
    }
    //console.log(stock);
    return stock;
}


module.exports.indexOf = function(tabLignes, ligne) { //trouve l'index de la ligne dans tabLignes
    for (var i = 0; i < tabLignes.length; i++) {
        if (tabLignes[i].NomLigne == ligne) {
            return i;
            break;
        }
    }
}


module.exports.trainDId = function(trains, id) { //trouve l'index du train correspondant à l'id
    for (var i = 0; i < trains.length; i++) {
        if (trains[i].id == id) {
            return i;
            break;
        }
    }
}