<?php

//Recupere la liste des adresses sous le format JSON

header("Content-type:application/json");
include_once 'chargementClasses.php';
//Recupération des  prodtuis
$secteurSQL = new SecteurSQL();
$lesSecteurs = $secteurSQL->readAllSecteur();
//Mise en format JSON
echo(json_encode($lesSecteurs));
?>