<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/comprendDAO.class.php";
require_once "../modele/delitDAO.class.php";
require_once "../modele/infractionDAO.class.php";

session_start();

if (!isset($_SESSION['open'])) {
    header('location: login.php');
} else if (!isset($_SESSION['numInf'])) {
    unset($_SESSION['op']);
    header('location: inf_liste.php');
}

if (isset($_POST['retour']) || isset($_POST['Annuler'])) {
    unset($_SESSION['op']);
    unset($_SESSION['numInf']);
    header('location: inf_liste.php');
}
if (isset($_POST['Valider'])) {

}





//Initialisation des messages d'erreurs
$error = [];
$error['numInf'] = '';
$error['date'] = '';
$error['immat'] = '';
$error['conducteur'] = '';
$error['delit'] = '';
$error['selectDelit'] = '';


//Création des DAO
$comprendDAO = new ComprendDAO();
$delitDAO = new DelitDAO();
$infractionDAO = new InfractionDAO();
$num_inf = $_SESSION['numInf'];
$inf = $infractionDAO->getByNumInf($num_inf);


//Affichage des boutons de retour, d'annulation et de validation + gestion des champs disabled
$buttons = "";
$InputDateInfDisabled = '';
$dateInf = "";
$numImmat = "";
$numPermis = "";
if ($_SESSION['op'] == "v") {
    $buttons = '<input id="btn_inf_retour" class="btnretour" name="retour" value="Retour" type="submit">';
    $InputDateInfDisabled = "disabled";
    $dateInf = $inf->getDateInf();
    $numImmat = $inf->getImmat();
    $numPermis = $inf->getNumPermis();
} else if ($_SESSION['op'] == "a") {
    $buttons = '<input id="btn_inf_valider" value="Valider" name="Valider" type="submit"><input id="btn_inf_annuler" class="btnannuler" value="Annuler" name="Annuler" type="submit">';
} else {
    $InputDateInfDisabled = "disabled";
    $dateInf = $inf->getDateInf();
    $numImmat = $inf->getImmat();
    $numPermis = $inf->getNumPermis();
    $buttons = '<input id="btn_inf_valider" value="Valider" name="Valider" type="submit"><input id="btn_inf_annuler" class="btnannuler" value="Annuler" name="Annuler" type="submit">';
}


$totalAmende = $infractionDAO->getTotal($num_inf) . " €"; // variable qu'on va echo en tant que total à payer

//Gestion de la liste des délits
$listComprend = $comprendDAO->getByNumInf($num_inf);

if (isset($_POST['DelSuppr'])) {
    if (count($listComprend) > 1) {
        $comprendDAO->delete($num_inf, $_POST['DelSuppr'][0]);
        $listComprend = $comprendDAO->getByNumInf($num_inf);
    } else {
        echo "<script>alert('Il est impossible de supprimer tous les délits d'une infraction')</script>";
    }
}

$listDels = [];
foreach ($listComprend as $comp) {
    $num_del = $comp->getNumDelit();
    $listDels[] = $delitDAO->getById($num_del);
}
$listeDelits = ""; //liste des délits dans un format affichable
if ($_SESSION['op'] == 'v') {
    foreach ($listDels as $del) {
        $listeDelits .= "<tr><td>" . $del->getNature() . "</td><td>" . $del->getTarif() . "</td></tr>"; //On remplit le tableau avec les délits
    }
} else {
    foreach ($listDels as $del) {
        $listeDelits .= "<tr><td>" . $del->getNature() . "</td><td>" . $del->getTarif() . "</td><td><form action='inf_edit.php' method='POST'><input type='submit' id='btn_suppr' name='DelSuppr[]' value='" . $del->getNumDelit() . "' ></form></td></tr>";
    }
}

require_once "../../vue/inf_edit.view.php"
    ?>