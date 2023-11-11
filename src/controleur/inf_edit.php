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
    unset($_SESSION['delsAjouter']); //unset des variables de session de l'édition d'infraction
    unset($_SESSION['delsSupprimer']);
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



//Affichage des boutons selon l'opération effectuée (ajout, modification, visualisation) + initialisation des champs de saisie
$buttons = "";
$InputDateInfDisabled = '';
$dateInf = "";
$numImmat = "";
$numPermis = "";
$BtnAjouterDelit = '';
if ($_SESSION['op'] == "v") {
    $buttons = '<input id="btn_inf_retour" class="btnretour" name="retour" value="Retour" type="submit">';
    $InputDateInfDisabled = "disabled";
    $dateInf = $inf->getDateInf();
    $numImmat = $inf->getImmat();
    $numPermis = $inf->getNumPermis();
} else if ($_SESSION['op'] == "a") {
    $buttons = '<input id="btn_inf_valider" value="Valider" name="Valider" type="submit"><input id="btn_inf_annuler" class="btnannuler" value="Annuler" name="Annuler" type="submit">';
    $dateInf = date("Y-m-d");
    $BtnAjouterDelit = '<input id="btn_delit_ajouter" type="submit" name="AjouterDel" value="Ajouter">';
} else {
    $InputDateInfDisabled = "disabled";
    $dateInf = $inf->getDateInf();
    $numImmat = $inf->getImmat();
    $numPermis = $inf->getNumPermis();
    $buttons = '<input id="btn_inf_valider" value="Valider" name="Valider" type="submit"><input id="btn_inf_annuler" class="btnannuler" value="Annuler" name="Annuler" type="submit">';
    $BtnAjouterDelit = '<input id="btn_delit_ajouter" type="submit" name="AjouterDel" value="Ajouter">';
}

//Gestion de la liste des délits
$listComprend = $comprendDAO->getByNumInf($num_inf);


$listDels = [];
//On initialise la liste des délits à supprimer et à ajouter de l'infraction si ils n'existent pas
if (!isset($_SESSION['delsAjouter']) || !isset($_SESSION['delsSupprimer'])) {
    $_SESSION['delsAjouter'] = [];
    $_SESSION['delsSupprimer'] = [];
}

//On entre tous les délits de l'infraction dans listDels en prenant en compte les délits supprimés et ajoutés durant l'édition de l'infraction
foreach ($listComprend as $comp) {
    $num_del = $comp->getNumDelit();
    if (!in_array($num_del, $_SESSION['delsSupprimer'])) {
        $listDels[] = $delitDAO->getById($num_del);
    }
}
foreach ($_SESSION['delsAjouter'] as $numDelit) {
    $listDels[] = $numDelit;
}
//Gesion de la suppression des delits
if (isset($_POST['SupprimerDelit'])) {
    $numDelitSuppr = $_POST['SupprimerDelit'][0];
    if (count($listDels) > 1) {
        if (in_array($numDelitSuppr, $_SESSION['delsAjouter'])) {
            unset($_SESSION['delsAjouter'][array_search($numDelitSuppr, $_SESSION['delsAjouter'])]);
            unset($listDels[array_search($numDelitSuppr, $listDels)]);
        } else {
            $_SESSION['delsSupprimer'][] = $_POST['SupprimerDelit'][0];
            unset($listDels[array_search($numDelitSuppr, $listDels)]);
        }
    } else {
        echo '<script>alert("Il est impossible de supprimer tous les délits d une infraction")</script>';
    }
}

//Gestion de l'amende totale affichée
$totalAmende = $infractionDAO->getTotal($num_inf); // variable qu'on va echo en tant que total à payer
foreach ($_SESSION['delsAjouter'] as $numDel) {
    $totalAmende += $delitDAO->getById($numDel)->getTarif();
}
foreach ($_SESSION['delsSupprimer'] as $numDel) {
    $totalAmende -= $delitDAO->getById($numDel)->getTarif();
}
$totalAmende .= ' €';

$listeDelits = ""; //liste des délits dans un format affichable
if ($_SESSION['op'] == 'v') {
    foreach ($listDels as $del) {
        $listeDelits .= "<tr><td>" . $del->getNature() . "</td><td>" . $del->getTarif() . "</td></tr>"; //On remplit le tableau avec les délits
    }
} else {
    foreach ($listDels as $del) {
        $listeDelits .= "<tr><td>" . $del->getNature() . "</td><td>" . $del->getTarif() . "</td><td><form action='inf_edit.php' method='POST'><input type='submit' id='btn_suppr' name='SupprimerDelit[]' value='" . $del->getNumDelit() . "' ></form></td></tr>";
    }
}



//Affichage du select permettant de sélectionner un délit à ajouter si on a appuyé sur le bouton "ajouter"
$selectDelit = '';
if (isset($_POST['AjouterDel'])) {
    $selectDelit = '<div id="div_inf_delit_edit">
<div class="divtitre">Choisir un délit dans la liste</div>
<div class="delit_rubrique">
    <div>
        <select id="select_delit" name="Delit[]" size="6"></select>
        <div><label id="lbl_erreur_select_delit" class="labelerreur">
                <?php echo $error["selectDelit"]; ?>
            </label></div>
    </div>
    <div>
        <div>
            <input id="btn_delit_valider" type="submit" name="delitValider" value = "">
            <input id="btn_delit_annuler" type="submit" name="delitAnnuler" value = "">
        </div>
    </div>
</div>
</div>"';
}




require_once "../../vue/inf_edit.view.php"
    ?>