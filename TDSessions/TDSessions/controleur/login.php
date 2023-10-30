<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/utilisateurDAO.class.php";

$msg = "";
$identifiants = [];

$identifiants['login'] = isset($_POST['login'])?$_POST['login']:null;
$identifiants['password'] = isset($_POST['password'])?$_POST['password']:null;

function existeUtilisateur(array $identifiants) : bool{
    $utilDAO = new UitlisateurDAO();
    if ($identifiants['login'] == null) return false;
    $util = $utilDAO->getByLogin($identifiants['login']);
    echo $util->getIdpers() . " " . $util->getMdp() . " " . $identifiants['login'] . " " . $identifiants['password'];
    if ($util->getLog() == $identifiants['login'] && $util->getMdp() == $identifiants['password']){
        return true;
    }
    else return false;
}

if (existeUtilisateur($identifiants)){
    session_start();
    $_SESSION['login'] = $identifiants['login'];
    header("location: accueil.php?");
}
else $msg = "identification incorrecte. Essayez de nouveau";

require_once "../vue/login.view.php";
?>