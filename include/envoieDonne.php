<?php
include_once 'chargementClasses.php';

//transforme la variable en format JSON en format php pour l'envoyer vers la fonction qui vas inserrer dans la base de données
$insert = new InsertSQL();
$dataRecu = json_decode($_POST["data"]);     
for ($i = 0; $i < count($dataRecu); $i++) {
    $insert->insertData($dataRecu[$i]);
}