<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

session_start();

require_once "../controleur/gestionFichiers.php";

if (!isset($_SESSION['open'])) {
    header('location: login.php');
}
if (!$_SESSION['isAdmin']) {
    header('location: inf_liste.php');
}

$fichier = "";
$fileError = "";
$content = "";
$successCode = "";

if (!file_exists("../../fichiers/infractions_ext.json")) {
    $fileError = "Le fichier d'extension des infractions n'a pas été trouvé.<br>Veuillez vérifier que votre fichier se nomme bien infractions_ext.json et se trouve dans le dossier fichiers";
} else {
    $content = file_get_contents("../../fichiers/infractions_ext.json");
    $contentExploded = explode('}', $content);

    foreach ($contentExploded as $c) {
        $fichier .= $c . '}<br>';
    }

    if (isset($_POST['Inserer'])) {
        $errorCode = InsertInfExt($content);
        if ($errorCode == 1) {
            $fileError = "L'insertion n'a pas pu être effectuée, veuillez vérifier le format du fichier json.<br>Exemple de ligne correcte :" . '{"date_inf":"05/10/2023","num_immat":"AA643BB","num_permis": "AZ71","délits" :[1]}';
        }
        else if($errorCode == 2){
            $fileError = "Certaines infractions n'ont pas pu être insérées car un id_delit présent dans le json n'existe pas dans la base";
        } else {
            $successCode = "L'insetion a bien été effectuée, vous pouvez retourner à la liste des infractions";
        }
    }
}


require_once "../../vue/inf_insert.view.php"
    ?>