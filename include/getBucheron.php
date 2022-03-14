<?php
   //Recupere la liste des bucherons sous le format JSON en fonction de la date selectionner

    header("Content-type:application/json");
    include_once 'chargementClasses.php';
    $dateI = $_REQUEST['dateI'];
    //Recupération des  prodtuis
    $buchSQL = new BucheronSQL();
    $lesBucherons = $buchSQL->readAllBucheron();
    $lesBucheronsND = $buchSQL->readBucheronDate($dateI);
    //Boucle qui verrifie la presence des bucherons non disponible, si ils sont present dans la liste, les enleve de la liste
    for ($i = 0; $i<count($lesBucherons["lesBucherons"]); $i++) {
        $pos = array_search($lesBucherons["lesBucherons"][$i], $lesBucheronsND["lesBucheronsND"]);
        if($pos!==false){
            $pos2 = array_search($lesBucheronsND["lesBucheronsND"][$pos], $lesBucherons["lesBucherons"]);
            unset($lesBucherons["lesBucherons"][$pos2]);
        }
    }
    //Renvoie la liste des bucherons sans les potentiel bucherons indisponible
    $tableau = $lesBucherons["lesBucherons"];
    echo(json_encode(array("lesBucherons" => array_values($tableau))));
?>