<?php

class BucheronSQL {

    private $_laConnexion;

    function __construct() {
        $this->_laConnexion = new Connexion();
    }

    //Requette SQL qui recupere tous les bucherons
    function readAllBucheron() {
        $stmt = $this->_laConnexion->dbh()->prepare("SELECT id, nom, prenom FROM bucheron");
        $valid = $stmt->execute();
        if (!$valid) {
            $this->_laConnexion->afficherErreurSQL("Erreur recherche bucherons");
        }

        //Renvoie un tableau avec les données
        $tabBuchron = array("lesBucherons" => $stmt->fetchAll(PDO::FETCH_ASSOC));
        return $tabBuchron;
    }

    //Requette SQL qui recupere tous les bucherons qui ont une intervention a la date passer en parametre
    function readBucheronDate($dInterv) {
        $stmt = $this->_laConnexion->dbh()->prepare("SELECT id, nom, prenom FROM bucheron INNER JOIN intervention ON bucheron.id = intervention.idBucheron 
        WHERE intervention.dateInterv=:dInterv");
        $stmt->bindValue(':dInterv', $dInterv);
        $valid = $stmt->execute();
        if (!$valid) {
            $this->_laConnexion->afficherErreurSQL("Erreur recherche bucherons en Intervention");
        }
        $tabBuchronInterv = array("lesBucheronsND" => $stmt->fetchAll(PDO::FETCH_ASSOC));
        //Renvoie un tableau avec les données
        return $tabBuchronInterv;
    }

}