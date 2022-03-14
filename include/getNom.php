<?php

//Recupere la liste des nom d'espece sous le format JSON en fonction de l'adresse choisi

header("Content-type:application/json");
include_once 'chargementClasses.php';
// Verification existence d'un produit selectionne
if (isset($_REQUEST['selectSecteur'])) {
    recupEspece();
} else {
    echo 'rien préciser';
}

function recupEspece() {
    $idAddr = $_REQUEST['selectSecteur'];
    $nomSQL = new NomSQL();
    $lesNoms = $nomSQL->readEspeceAddr($idAddr);
    echo(json_encode($lesNoms));
}

?>