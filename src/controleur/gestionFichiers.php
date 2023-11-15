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
    foreach ($infractionsDel as $i) {
        if (!isset($i['date_inf']) || !isset($i['num_immat']) || !isset($i['num_permis']) || !isset($i['délits'])) {
            return 1;
        }
        $inf = new Infraction();
        $date = explode("/", $i['date_inf']);
        $ReformatDate = $date[2] . '-' . $date[1] . '-' . $date[0]; //Reformatage de la date en format sql
        $inf->setDateInf($ReformatDate);
        $inf->setImmat($i['num_immat']);
        $inf->setNumPermis($i['num_permis']);
        $delits = $i['délits'];
        $infDAO->insert($inf);
        foreach ($delits as $d) {
            if (!$delitDAO->existe($d)){
                return 2;
            }
            $comprendDAO->insert(new Comprend("$id_inf", "$d"));
        }
        $id_inf++;
    }
    return 0;
}


?>