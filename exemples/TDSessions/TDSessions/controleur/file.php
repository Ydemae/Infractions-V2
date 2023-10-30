<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

$nomFile = "fables.txt";

$fileContent = file_get_contents("../fichiers/".$nomFile);
file_put_contents("../fichiers/fables2.txt", "fables2.txt : \n" . $fileContent);
$content = explode("\n",$fileContent);
file_put_contents("../fichiers/fables2.txt", "\nNombre de lignes : " . count($content), FILE_APPEND);

$fileContent = file_get_contents("../fichiers/fables2.txt");
$content = explode("\n",$fileContent);

file_put_contents("../fichiers/fables3.txt", "Le corbeau et le Renard - Jean de La Fontaine\nMaître Corbeau, sur un arbre perché,\nTenait en son bec un fromage.\n\nLa Cigale et la Fourmi - Jean de La Fontaine\nLa Cigale, ayant chanté\nTout l'Été,\nSe trouva fort dépourvue\nQuand la bise fut venue.");


require_once "../vue/file.view.php";
?>