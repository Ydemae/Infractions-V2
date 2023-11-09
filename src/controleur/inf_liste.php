<?php
//Important : Modifier $affi en un autre truc à un moment car c'est pas clair
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

if (isset($_POST['a'])){
    header('location: inf_edit.php');
}

if(isset($_POST['infVisu'])){
    $_SESSION['numInf'] = $_POST['infVisu'][0];
    header('location: inf_edit.php');
}

$affi = "";
$InfDAO = new InfractionDAO();
$ConductDAO = new ConducteurDAO();
$allInfs = [];

$btn_edit_inf = '';

if ($_SESSION['isAdmin']){
    $allInfs = $InfDAO->getAll();
    $btn_inf_ajouter = '<form action="inf_edit.php"><input id="btn_inf_ajouter" type="submit" name="a" value="Ajouter"></form>';
}
else{
    $allInfs = $InfDAO->getByNumPermis($_SESSION['numPermis']);
}

for($i = 0; $i < count($allInfs); $i ++){
    $ExplodedDate = explode( '-', $allInfs[$i]->getDateInf());
    $newDate = $ExplodedDate[2] . '/' . $ExplodedDate[1] . '/' . $ExplodedDate[0];
    $affi .= '<tr><td><form action="inf_liste.php" method="POST"><input type="submit" name="infVisu[]" id="btn_visu" value="'.  $allInfs[$i]->getNumInf() . '"></form></td><td>' . $allInfs[$i]->getNumInf() . "</td><td>" . $newDate . "</td><td>" . $allInfs[$i]->getImmat() . "</td><td>";
    if ($allInfs[$i]->getNumPermis() != ''){
        $Cond = $ConductDAO->getById($allInfs[$i]->getNumPermis());
        $affi .= $allInfs[$i]->getNumPermis() . ' ' . $Cond->getNom() . ' ' . $Cond->getPrenom() . '</td>';
    }
    else{
        $affi .= '</td>';
    }
    $affi .= '<td>' . $InfDAO->getTotal($allInfs[$i]->getNumInf()) . ' €</td><td></td><td></td></tr>';
}

require_once "../../vue/inf_liste.view.php";
?>