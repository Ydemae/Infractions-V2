<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/comprendDAO.class.php";
require_once "../modele/delitDAO.class.php";
require_once "../modele/infractionDAO.class.php";

session_start();

if (!isset($_SESSION['open'])){
    header('location: login.php');
}

$comprendDAO = new ComprendDAO();
$delitDAO = new DelitDAO();
$infractionDAO = new InfractionDAO();


$listComprend = $comprendDAO->getByNumInf($_SESSION['numInf']); 
$listDels = [];
foreach($listComprend as $comp){
    $num_del = $comp->getNumDelit();
    $listDels[] = $delitDAO->getById($num_del);
}
$listeDelits = ""; //liste des délits dans un format affichable

foreach($listDels as $del){
    $listeDelits .= "<tr><td>". $del->getNature() ."</td><td>" . $del->getTarif() . "</td></tr>";
}

require_once "../../vue/inf_edit.view.php"
?>