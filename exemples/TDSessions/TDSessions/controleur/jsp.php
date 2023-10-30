<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/utilisateurDAO2.class.php";

$utilDAO = new UitlisateurDAO();

$content = json_encode($utilDAO->listeUtilisateurs());

var_dump($content);

file_put_contents("../fichiers/utilisateurs.json", $content);


require_once "../vue/JSP.view.php";
?>