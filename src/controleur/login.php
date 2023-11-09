<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/conducteurDAO.class.php";

$id = [];
$error = [];
$error['password'] = '';
$error['login'] = '';
$error['connect'] = '';

$id['login'] = isset($_POST['login']) ? $_POST['login'] : null;
$id['password'] = isset($_POST['password']) ? $_POST['password'] : null;

$ConductDAO = new ConducteurDAO();

if (isset($_POST["Connexion"])){
    $anError = false;
    if (trim($id['login']) == null){
        $anError = true;
        $error['login'] = "Le numéro de permis doit être référencé";
    }
    if (trim($id['password']) == null){
        $anError = true;
        $error['password'] = 'Le mot de passe est obligatoire';
    }
    if ($anError == false){
        if ($ConductDAO->existe($id['login'])){
            $user = $ConductDAO->getById($id['login']);
            $mdp = $user->getMdp();
            if(trim($id['password']) == $mdp){
                session_start();
                $_SESSION['open'] = true;
                $_SESSION['isAdmin'] = $user->getAdmin();
                $_SESSION['numPermis'] = $user->getNum();
                $_SESSION['identité'] = $user->getNom() . ' ' . $user->getPrenom();
                header('location: inf_liste.php');
            }
        }
        $error['connect'] = 'Le numéro de permis ou le mot de passe est incorrect';
    }
}


require_once "../../vue/login.view.php";
?>