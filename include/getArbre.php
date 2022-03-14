<?php
//Renvoie la liste des arbres en fonction de la date, l'adresse et l'espece selectionner

//header("Content-type:application/json");
include_once 'chargementClasses.php';

if (isset($_REQUEST['selectEspece'])) {
    getIdNom();
} else {
    echo 'rien préciser';
}

function getIdNom() {
    //Recupértion des valeurs passer en parametre
    $idNomRecu = $_REQUEST['selectEspece'];
    $idAddr = $_REQUEST['selectSecteur'];
    $dateSelect = $_REQUEST['dateSelect'];
    $arbreSQL = new ArbreSQL();    
    //Liste des arbres par l'id et l'adresse choisi
    $listeArbres = $arbreSQL->readArbreByNom($idNomRecu, $idAddr);
    //Liste des arbres par l'id et l'adresse choisi plus la date
    $listeArbresInterv = $arbreSQL->readSelArbreInterv($idNomRecu, $idAddr, $dateSelect);
    //Verrifie si dans la liste de base il n'y pas des pottentiels arbres qui sont déjà en intervention a travers les différents parametre
    //Si c'est le cas, l'enleve de la liste qui sera passer en parametre
    $tab = $listeArbresInterv["lesArbresEnInterv"];
    $pos = array_search($listeArbres["lesArbres"][0], $tab);
    for ($i = 0; $i<count($listeArbres["lesArbres"]); $i++) {
        $pos = array_search($listeArbres["lesArbres"][$i], $tab);
        if($pos!==false){
            $pos2 = array_search($tab[$pos], $listeArbres["lesArbres"]);
            unset($listeArbres["lesArbres"][$pos2]);
        }
    }
    //Envoie de la liste rectifier
    $tableau = $listeArbres["lesArbres"];
    echo(json_encode(array("lesArbres" => array_values($tableau))));
}
