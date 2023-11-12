<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);


require_once "../modele/infractionDAO.class.php";
require_once "../modele/conducteurDAO.class.php";
require_once "../modele/comprendDAO.class.php";

session_start();

//Vérifications
if (!isset($_SESSION['open'])) {
    session_unset();
    session_destroy();
    header('location: login.php');
}

if (isset($_POST['infVisu'])) {
    $_SESSION['numInf'] = $_POST['infVisu'][0];
    $_SESSION['op'] = 'v';
    header('location: inf_edit.php');
}

if (isset($_POST['infEdit'])) {
    if ($_SESSION['isAdmin']) { //On vérifie que l'utilisateur est bien admin pour éviter les injections de code (comme modifier le name d'un submit)
        $_SESSION['numInf'] = $_POST['infEdit'][0];
        $_SESSION['op'] = 'e';
        header('location: inf_edit.php');
    } else {
        echo '<script>alert("' . "Vous n'avez pas les permissions pour editer une infraction" . '")</script>';
    }
}

//Création des DAO
$InfDAO = new InfractionDAO();
$comprendDAO = new ComprendDAO();
$ConductDAO = new ConducteurDAO();

if (isset($_POST['infSuppr'])) {
    if ($_SESSION['isAdmin']) {
        $InfDAO->delete($_POST['infSuppr'][0]);
        $comprendDAO->deleteByNumInf($_POST['infSuppr'][0]);
    } else {
        echo '<script>alert("' . "Vous n'avez pas les permissions pour supprimer une infraction" . '")</script>';
    }
}

if (isset($_POST['a'])) {
    if ($_SESSION['isAdmin']) {
        $_SESSION['op'] = 'a';
        $_SESSION['numInf'] = $InfDAO->GetAutoIncrement();
        header('location: inf_edit.php');
    } else {
        echo '<script>alert("' . "Vous n'avez pas les permissions pour ajouter une infraction" . '")</script>';
    }
}

//Initialisation de l'affichage
$affi = "";
$allInfs = [];

$btn_edit_inf = '';
$btn_insert_file = "";
$btn_inf_ajouter = "";


//Gestion de l'affichage des boutons et de la liste des infractions en fonction du is_admin du conducteur
if ($_SESSION['isAdmin']) {
    $allInfs = $InfDAO->getAll();
    $btn_inf_ajouter = '<form action="inf_liste.php" method="POST"><input type="submit" id="btn_inf_ajouter" name="a" value="Ajouter"></form>';
    $btn_insert_file = '<a href="inf_insert.php" class="link_right">Insérer les nouvelles infractions</a>';
} else {
    $allInfs = $InfDAO->getByNumPermis($_SESSION['numPermis']);
}

//Important ! Demander au prof si c'est mieux de mettre le if en dehors du for comme ça ou si c'est mieux de le mettre dedans

//Gestion de l'affichage des infractions
if ($_SESSION['isAdmin']) {
    for ($i = 0; $i < count($allInfs); $i++) {
        $ExplodedDate = explode('-', $allInfs[$i]->getDateInf());
        $newDate = $ExplodedDate[2] . '/' . $ExplodedDate[1] . '/' . $ExplodedDate[0];
        $affi .= '<tr><td><form action="inf_liste.php" method="POST"><input type="submit" name="infVisu[]" id="btn_visu" value="' . $allInfs[$i]->getNumInf() . '"></form></td><td>' . $allInfs[$i]->getNumInf() . "</td><td>" . $newDate . "</td><td>" . $allInfs[$i]->getImmat() . "</td><td>";
        if ($allInfs[$i]->getNumPermis() != '') {
            $Cond = $ConductDAO->getById($allInfs[$i]->getNumPermis());
            $affi .= $allInfs[$i]->getNumPermis() . ' ' . $Cond->getNom() . ' ' . $Cond->getPrenom() . '</td>';
        } else {
            $affi .= '</td>';
        }
        $affi .= '<td>' . $InfDAO->getTotal($allInfs[$i]->getNumInf()) . ' €</td><td><form action="inf_liste.php" method="POST"><input type="submit" id="btn_edit" name="infEdit[]" id="btn_visu" value="' . $allInfs[$i]->getNumInf() . '"></form></td><td><form action="inf_liste.php" method="POST"><input type="submit" id="btn_suppr" name="infSuppr[]" id="btn_visu" value="' . $allInfs[$i]->getNumInf() . '"></form></td></tr>';
    }
} else {
    for ($i = 0; $i < count($allInfs); $i++) {
        $ExplodedDate = explode('-', $allInfs[$i]->getDateInf());
        $newDate = $ExplodedDate[2] . '/' . $ExplodedDate[1] . '/' . $ExplodedDate[0];
        $affi .= '<tr><td><form action="inf_liste.php" method="POST"><input type="submit" name="infVisu[]" id="btn_visu" value="' . $allInfs[$i]->getNumInf() . '"></form></td><td>' . $allInfs[$i]->getNumInf() . "</td><td>" . $newDate . "</td><td>" . $allInfs[$i]->getImmat() . "</td><td>";
        if ($allInfs[$i]->getNumPermis() != '') {
            $Cond = $ConductDAO->getById($allInfs[$i]->getNumPermis());
            $affi .= $allInfs[$i]->getNumPermis() . ' ' . $Cond->getNom() . ' ' . $Cond->getPrenom() . '</td>';
        } else {
            $affi .= '</td>';
        }
        $affi .= '<td>' . $InfDAO->getTotal($allInfs[$i]->getNumInf()) . ' €</td><td></td><td></td></tr>';
    }
}


require_once "../../vue/inf_liste.view.php";
?>