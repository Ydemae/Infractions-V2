<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "./gestionFichiers.php";
require_once "../modele/infractionDAO.class.php";
require_once "../modele/conducteurDAO.class.php";

$conductDAO = new ConducteurDAO();
$conducts = $conductDAO->getAll();
$testConduct = '';
$infractionDAO = new InfractionDAO();
$infs = $infractionDAO->getAll();

$fileContent = file_get_contents("../../fichiers/infractions_ext.json");
InsertInfExt($fileContent);

require_once "";
?>