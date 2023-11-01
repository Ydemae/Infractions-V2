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
        $this->select = 'SELECT num_inf, date_inf, immat, num_permis FROM INFRACTION ';
    }

    function insert(Infraction $inf): void
    {
        $this->bd->execSQL("INSERT INTO INFRACTION (num_inf, date_inf, immat, num_permis)
                                        VALUES (:num_inf, :date_inf, :immat, :num_permis)"
            ,
            [
                ':num_inf' => $inf->getNumInf(),
                ':date_inf' => $inf->getDateInf(),
                ':immat' => $inf->getImmat(),
                ':num_permis' => $inf->getNumPermis()
            ]
        );
    }

    function delete(string $num): void
    {
        $this->bd->execSQL(
            "DELETE FROM INFRACTION WHERE num_inf = :inf"
            ,
            [':inf' => $num]
        );
    }

    private function loadQuery(array $result): array
    {
        $Infs = [];
        foreach ($result as $row) {
            $row = json_decode(json_encode($row), TRUE);
            $inf = new Infraction();
            $inf->setNumInf($row['num_inf']);
            $inf->setDateInf($row['date_inf']);
            $inf->setImmat($row['immat']);
            $inf->setNumPermis($row['num_permis']);
            $Infs[] = $inf;
        }
        return $Infs;
    }

    function getAll(): array
    {
        return ($this->loadQuery($this->bd->execSQL($this->select)));
    }

    function getByNumInf(string $num_inf): Infraction
    {
        $uneInf = new Infraction();
        $lesInfractions = $this->loadQuery($this->bd->execSQL($this->select . " WHERE num_inf=:num_inf", [':num_inf' => $num_inf]));
        if (count($lesInfractions) > 0) {
            $uneInf = $lesInfractions[0];
        }
        return $uneInf;
    }

    function existe(string $num_inf): bool
    {
        $req = "SELECT *  FROM  INFRACTION
					  WHERE num_inf = :num_inf";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':num_inf' => $num_inf])));
        return ($res != []);
    }
}
?>