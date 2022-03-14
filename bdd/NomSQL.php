<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of EspeceSQL
 *
 * @author pierre.perdigues
 */
class NomSQL {

    private $_laConnexion;

    function __construct() {
        $this->_laConnexion = new Connexion();
    }

    //Requette SQL qui permet de recuperer les nom des epsece present dans l'adresse selectionner
    function readEspeceAddr($nom) {
        $stmt = $this->_laConnexion->dbh()->prepare("SELECT DISTINCT nom.id, nom.libelle FROM nom INNER JOIN arbre ON nom.id = arbre.idNom WHERE arbre.idAdresse=:adr");
        $stmt->bindValue(':adr', $nom);
        $valid = $stmt->execute();
        
        if (!$valid) {
            $this->_laConnexion->afficherErreurSQL("Erreur recherche espece");
        }
        //Renvoie un tableau avec les données
        $tabEspece = array("lesNoms" => $stmt->fetchAll(PDO::FETCH_ASSOC));
        return $tabEspece;
    }

}
