<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/infractionDAO.class.php";
require_once "../modele/conducteurDAO.class.php";

session_start();

if (!isset($_SESSION['open'])){
    session_unset();
    session_destroy();
    header('location: login.php');
}

$affi = "";
$InfDAO = new InfractionDAO();
$ConductDAO = new ConducteurDAO();
$allInfs = [];

if ($_SESSION['isAdmin']){
    $allInfs = $InfDAO->getAll();
}
else{
    $allInfs = $InfDAO->getByNumPermis($_SESSION['numPermis']);
}



for($i = 0; $i < count($allInfs); $i ++){
    $ExplodedDate = explode( '-', $allInfs[$i]->getDateInf());
    $newDate = $ExplodedDate[2] . '/' . $ExplodedDate[1] . '/' . $ExplodedDate[0];
    $affi .= '<tr><td><a href=""><img src="../../vue/css/visu.png" alt=""></a></td><td>' . $allInfs[$i]->getNumInf() . "</td><td>" . $newDate . "</td><td>" . $allInfs[$i]->getImmat() . "</td><td>";
    if ($allInfs[$i]->getNumPermis() != ''){
        $Cond = $ConductDAO->getById($allInfs[$i]->getNumPermis());
        $affi .= $allInfs[$i]->getNumPermis() . ' ' . $Cond->getNom() . ' ' . $Cond->getPrenom() . '</td>';
    }
    else{
        $affi .= '</td>';
    }
    $affi .= '<td>' . $InfDAO->getTotal($allInfs[$i]->getNumInf()) . ' €</td><td></td><td></td></tr>';
}
session_unset();
session_destroy();

require_once "../../vue/inf_liste.view.php";
?>