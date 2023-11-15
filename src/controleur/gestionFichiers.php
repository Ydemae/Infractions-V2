<?php
require_once "../modele/infractionDAO.class.php";
require_once "../modele/comprendDAO.class.php";
require_once "../modele/delitDAO.class.php";

function InsertInfExt(string $infractionsDel): int //attend un format JSON
{
    $infractionsDel = json_decode($infractionsDel, true);
    $infDAO = new InfractionDAO();
    $comprendDAO = new ComprendDAO();
    $delitDAO = new DelitDAO();
    $id_inf = $infDAO->GetAutoIncrement();
    foreach ($infractionsDel as $i){ //boucle de vérification
        if (!isset($i['date_inf']) || !isset($i['num_immat']) || !isset($i['num_permis']) || !isset($i['delits'])) {
            return 1;
        }
        $delits = $i['delits'];
        foreach ($delits as $d) {
            if (!$delitDAO->existe($d)){
                return 2;
            }
        }
        $id_inf++;
    }
    $id_inf = $infDAO->GetAutoIncrement();
    foreach ($infractionsDel as $i) {
        $inf = new Infraction();
        $date = explode("/", $i['date_inf']);
        $ReformatDate = $date[2] . '-' . $date[1] . '-' . $date[0]; //Reformatage de la date en format sql
        $inf->setDateInf($ReformatDate);
        $inf->setImmat($i['num_immat']);
        $inf->setNumPermis($i['num_permis']);
        $infDAO->insert($inf);
        $delits = $i['delits'];
        foreach ($delits as $d) {
            $comprendDAO->insert(new Comprend("$id_inf", "$d"));
        }
        $id_inf++;
    }
    return 0;
}


?>