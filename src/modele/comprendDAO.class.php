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
        $this->select = 'SELECT id_inf, id_delit FROM comprend ';
    }

    function insert(Comprend $comp): void
    {
        $this->bd->execSQL("INSERT INTO comprend (id_inf, id_delit)
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
            "DELETE FROM DELIT WHERE id_delit = :numD AND id_inf = :numI"
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
            $Comp->setNumInf($row['id_inf']);
            $Comp->setNumDelit($row['id_delit']);
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
        $lesComps = $this->loadQuery($this->bd->execSQL($this->select . " WHERE id_inf=:num", [':num' => $num]));
        return $lesComps;
    }

    function nbDelsByInf(string $num_inf): int
    {
        return count($this->getByNumInf($num_inf));
    }

    function existe(string $numD, string $numI): bool
    {
        $req = "SELECT *  FROM  comprend
					  WHERE id_delit = :numD AND id_inf = :numI";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':numD' => $numD, 'numI' => $numI])));
        return ($res != []);
    }
}
?>