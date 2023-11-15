<?php
require_once("connexion.php");
require_once("infraction.class.php");
class InfractionDAO
{
    private $bd;
    private $select;

    function __construct()
    {
        $this->bd = new Connexion();
        $this->select = 'SELECT id_inf, date_inf, num_immat, num_permis FROM infraction ';
    }

    function insert(Infraction $inf): void
    {
        $this->bd->execSQL("INSERT INTO infraction (date_inf, num_immat, num_permis)
                                        VALUES (:date_inf, :immat, :num_permis)"
            ,
            [
                ':date_inf' => $inf->getDateInf(),
                ':immat' => $inf->getImmat(),
                ':num_permis' => $inf->getNumPermis()
            ]
        );
    }

    function delete(string $num): void
    {
        $this->bd->execSQL(
            "DELETE FROM infraction WHERE id_inf = :inf"
            ,
            [':inf' => $num]
        );
    }

    function GetAutoIncrement(): int
    {
        $temp = $this->bd->execSQL("SELECT `AUTO_INCREMENT`
        FROM  INFORMATION_SCHEMA.TABLES
        Where   TABLE_NAME   = 'infraction';");
        if (isset($temp[1])){
            $temp = $temp[1];
        }
        else{
            $temp = $temp[0];
        }
        $temp = json_decode(json_encode($temp), TRUE);
        return (int) $temp["AUTO_INCREMENT"];
    }

    private function loadQuery(array $result): array
    {
        $Infs = [];
        foreach ($result as $row) {
            $row = json_decode(json_encode($row), TRUE);
            $inf = new Infraction();
            $inf->setNumInf($row['id_inf']);
            $inf->setDateInf($row['date_inf']);
            $inf->setImmat($row['num_immat']);
            $inf->setNumPermis($row['num_permis']);
            $Infs[] = $inf;
        }
        return $Infs;
    }

    function getAll(): array
    {
        return ($this->loadQuery($this->bd->execSQL($this->select)));
    }

    function getTotal(string $num): float
    {
        require_once "../modele/comprendDAO.class.php";
        require_once "../modele/delitDAO.class.php";
        $comprendDAO = new ComprendDAO();
        $delitDAO = new DelitDAO();
        $dels = $comprendDAO->getByNumInf($num);
        $somme = 0;
        foreach ($dels as $del) {
            $num_del = $del->getNumDelit();
            $somme += floatval($delitDAO->getbyId($num_del)->getTarif());
        }
        return $somme;
    }

    function getByNumInf(string $num_inf): Infraction
    {
        $uneInf = new Infraction();
        $lesInfractions = $this->loadQuery($this->bd->execSQL($this->select . " WHERE id_inf=:num_inf", [':num_inf' => $num_inf]));
        if (count($lesInfractions) > 0) {
            $uneInf = $lesInfractions[0];
        }
        return $uneInf;
    }
    function getByNumPermis(string $num_permis): array
    {
        $lesInfractions = $this->loadQuery($this->bd->execSQL($this->select . " WHERE num_permis=:num_permis", [':num_permis' => $num_permis]));
        return $lesInfractions;
    }

    function existe(string $num_inf): bool
    {
        $req = "SELECT *  FROM  infraction
					  WHERE id_inf = :num_inf";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':num_inf' => $num_inf])));
        return ($res != []);
    }
}
?>