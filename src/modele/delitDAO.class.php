<?php
require_once("connexion.php");
require_once("delit.class.php");
class DelitDAO
{
    private $bd;
    private $select;

    function __construct()
    {
        $this->bd = new Connexion();
        $this->select = 'SELECT num_delit, nature, tarif FROM DELIT ';
    }

    function insert(Delit $del): void
    {
        $this->bd->execSQL("INSERT INTO DELIT (num_delit, nature, tarif)
                                        VALUES (:num, :nat, :tarif)"
            ,
            [
                ':num' => $del->getNumDelit(),
                ':nat' => $del->getNature(),
                ':tarif' => $del->getTarif()
            ]
        );
    }

    function delete(string $num_delit): void
    {
        $this->bd->execSQL(
            "DELETE FROM DELIT WHERE num_delit = :num"
            ,
            [':num' => $num_delit]
        );
    }

    private function loadQuery(array $result): array
    {
        $Dels = [];
        foreach ($result as $row) {
            $row = json_decode(json_encode($row), TRUE);
            $Del = new Delit();
            $Del->setNumDelit($row['num_delit']);
            $Del->setNature($row['nature']);
            $Del->setTarif($row['tarif']);
            $Dels[] = $Del;
        }
        return $Dels;
    }

    function getAll(): array
    {
        return ($this->loadQuery($this->bd->execSQL($this->select)));
    }

    function getByImmat(string $num): Delit
    {
        $unDel = new Delit();
        $lesDelits = $this->loadQuery($this->bd->execSQL($this->select . " WHERE num_delit=:num", [':num' => $num]));
        if (count($lesDelits) > 0) {
            $unDel = $lesDelits[0];
        }
        return $unDel;
    }

    function existe(string $num): bool
    {
        $req = "SELECT *  FROM  DELIT
					  WHERE num_delit = :num";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':num' => $num])));
        return ($res != []);
    }
}
?>