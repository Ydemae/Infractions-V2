<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/infractionDAO.class.php";
require_once "../modele/conducteurDAO.class.php";

$affi = "";
$InfDAO = new InfractionDAO();
$ConductDAO = new ConducteurDAO();
$allInfs = $InfDAO->getAll();


for($i = 0; $i < count($allInfs); $i ++){
    $ExplodedDate = explode( '-', $allInfs[$i]->getDateInf());
    $newDate = $ExplodedDate[2] . '/' . $ExplodedDate[1] . '/' . $ExplodedDate[0];
    $affi .= '<tr><td><a href=""><img src="../../vue/css/visu.png" alt=""></a></td><td>' . $allInfs[$i]->getNumInf() . "</td><td>" . $newDate . "</td><td>" . $allInfs[$i]->getImmat() . "</td><td>";
    if ($allInfs[$i]->getNumPermis() != ''){
        $Cond = $ConductDAO->getByNum($allInfs[$i]->getNumPermis());
        $affi .= $allInfs[$i]->getNumPermis() . ' ' . $Cond->getNom() . ' ' . $Cond->getPrenom() . '</td>';
    }
    else{
        $affi .= '</td>';
    }
    $affi .= '<td>' . $InfDAO->getTotal($allInfs[$i]->getNumInf()) . ' €</td><td></td><td></td></tr>';
}


require_once "../../vue/inf_liste.view.php";
?>