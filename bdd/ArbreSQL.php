<?php

class ArbreSQL {

    private $_laConnexion;

    function __construct() {
        $this->_laConnexion = new Connexion();
    }

    //Requette SQL pour recupere les arbres de l'espece choici dans l'adresse choisi
    function readArbreByNom($idName, $idAddr) {
        $stmt = $this->_laConnexion->dbh()->prepare("SELECT id, circonferenceEnCm, hauteurEnM, latitude, longitude, stadeDeveloppement FROM arbre WHERE idNom=:nameA AND idAdresse=:idAddr ORDER BY hauteurEnM, circonferenceEnCm");
        $stmt->bindValue(':nameA', $idName);
        $stmt->bindValue(':idAddr', $idAddr);
        $valid = $stmt->execute();
        if (!$valid) {
            $this->_laConnexion->afficherErreurSQL("Erreur requette arbre");
        }
        $tabArbre = array("lesArbres" => $stmt->fetchAll(PDO::FETCH_ASSOC));
        //Renvoie un tableau avec les données
        return $tabArbre;
    }

    //Requette SQL pour recupere les arbres qui ont une intervention en cours en fonction id du nom de l'epspce, de l'adresse et la date choisi
    function readSelArbreInterv($idName, $idAddr, $dateSelect) {
        $stmt = $this->_laConnexion->dbh()->prepare("SELECT id, circonferenceEnCm, hauteurEnM, latitude, longitude, stadeDeveloppement FROM arbre INNER JOIN arbreinterv ON arbre.id = arbreinterv.idAbreAI WHERE idNom=:nom AND idAdresse=:adresse AND arbreinterv.dateArbreInterv BETWEEN :dateSelect AND :dateSelect;");
        $stmt->bindValue(':nom', $idName);
        $stmt->bindValue(':adresse', $idAddr);
        $stmt->bindValue(':dateSelect', $dateSelect);
        $valid = $stmt->execute();
        if (!$valid) {
            $this->_laConnexion->afficherErreurSQL("Erreur requette arbre");
        }
        $tabArbre = array("lesArbresEnInterv" => $stmt->fetchAll(PDO::FETCH_ASSOC));
        //Renvoie un tableau avec les données
        return $tabArbre;
    }
}
