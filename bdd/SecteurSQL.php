<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of SecteurSQL
 *
 * @author pierre.perdigues
 */
class SecteurSQL {

    private $_laConnexion;

    function __construct() {
        $this->_laConnexion = new Connexion();
    }

    //Requette SQL qui vas recuperer les adresses
    function readAllSecteur() {
        $stmt = $this->_laConnexion->dbh()->prepare("SELECT * FROM adresse");
        $valid = $stmt->execute();
        if (!$valid) {
            $this->_laConnexion->afficherErreurSQL("Erreur recherche bucherons");
        }
        //Renvoie un tableau avec les données
        $tabSecteur = array("lesSecteurs" => $stmt->fetchAll(PDO::FETCH_ASSOC));
        return $tabSecteur;
    }

}
