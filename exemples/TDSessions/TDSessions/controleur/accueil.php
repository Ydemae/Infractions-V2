<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);
require_once "../modele/utilisateurDAO.class.php";

session_start();

$utilisateurDAO = new UitlisateurDAO();
$login = $_SESSION['login'];
$utilisateur = $utilisateurDAO->getByLogin($login);
$nom = $utilisateur->getNom();
$prenom = $utilisateur->getPrenom();

$tab = "<tr><td>Nom :</td><td>" . $nom . "</td></tr><tr><td>Prénom : </td><td>". $prenom . "</td></tr><tr><td>login : </td><td>". $login . "</td></tr>"; 

if (isset($_GET['deco'])){
    if($_GET['deco'] == true){
        fermerSession();
    }
}

function fermerSession(){
    session_unset();
    session_destroy();
    header("location: login.php");
}

require_once "../vue/accueil.view.php"
?>