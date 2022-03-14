<?php

class InsertSQL {

    private $_laConnexion;

    function __construct() {
        $this->_laConnexion = new Connexion();
    }

    //Requette SQL qui insert les valeurs dans la base de données
    function insertData($values) {
        $stmt = $this->_laConnexion->dbh()->prepare("INSERT INTO intervention (idBucheron, idArbre, idNom, hauteurArbreM, circonferenceArbreCm, adresseArbre, stadeArbre, latitudeInterv, longitudeInterv, descriptionInterv, dateInterv, dateUnixInterv) VALUES (:bucheron, :arbre, :espece, :hauteur, :circonference, :adresse, :stade, :latitude, :longitude, :detail, :dateInterv, :dateUnixInterv)");
        $stmt->bindValue(':bucheron', $values->idBucheron);
        $stmt->bindValue(':arbre', $values->idArbre);
        $stmt->bindValue(':espece', $values->espece);
        $stmt->bindValue(':hauteur', $values->hauteurArbre);
        $stmt->bindValue(':circonference', $values->circonference);
        $stmt->bindValue(':adresse', $values->secteur);
        $stmt->bindValue(':stade', $values->stade);
        $stmt->bindValue(':latitude', $values->latitude);
        $stmt->bindValue(':longitude', $values->longitude);
        $stmt->bindValue(':detail', $values->tache);
        $stmt->bindValue(':dateInterv', $values->date);
        $stmt->bindValue(':dateUnixInterv', $values->dateUnix);
        $stmt->execute();
    }
}