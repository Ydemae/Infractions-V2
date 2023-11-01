<?php
require_once("connexion.php");
require_once("comprend.class.php");
class ComprendDAO
{
    private $bd;
    private $select;

    function __construct()
    {
        $this->bd = new Connexion();
        $this->select = 'SELECT num_inf, num_delit FROM COMPREND ';
    }

    function insert(Comprend $comp): void
    {
        $this->bd->execSQL("INSERT INTO COMPREND (num_inf, num_delit)
                                        VALUES (:numI, :numD)"
            ,
            [
                ':numI' => $comp->getNumInf(),
                ':numD' => $comp->getNumDelit()
            ]
        );
    }

    function delete(string $num_inf, string $num_delit): void
    {
        $this->bd->execSQL(
            "DELETE FROM DELIT WHERE num_delit = :numD AND num_inf = :numI"
            ,
            [':numD' => $num_delit, ':numI' => $num_inf]
        );
    }

    private function loadQuery(array $result): array
    {
        $Comps = [];
        foreach ($result as $row) {
            $row = json_decode(json_encode($row), TRUE);
            $Comp = new Comprend();
            $Comp->setNumInf($row['num_inf']);
            $Comp->setNumDelit($row['num_delit']);
            $Comps[] = $Comp;
        }
        return $Comps;
    }

    function getAll(): array
    {
        return ($this->loadQuery($this->bd->execSQL($this->select)));
    }

    function getByNumInf(string $num): array
    {
        $lesComps = $this->loadQuery($this->bd->execSQL($this->select . " WHERE num_inf=:num", [':num' => $num]));
        return $lesComps;
    }

    function nbDelsByInf(string $num_inf): int
    {
        return count($this->getByNumInf($num_inf));
    }

    function existe(string $numD, string $numI): bool
    {
        $req = "SELECT *  FROM  COMPREND
					  WHERE num_delit = :numD AND num_inf = :numI";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':numD' => $numD, 'numI' => $numI])));
        return ($res != []);
    }
}
?>