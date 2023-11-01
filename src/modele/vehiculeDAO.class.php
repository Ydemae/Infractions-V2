<?php
require_once("connexion.php");
require_once("vehicule.class.php");
class VehiculeDAO
{
    private $bd;
    private $select;

    function __construct()
    {
        $this->bd = new Connexion();
        $this->select = 'SELECT immat, date_immat, modele, marque, proprietaire FROM VEHICULE ';
    }

    function insert(Vehicule $vehic): void
    {
        $this->bd->execSQL("INSERT INTO VEHICULE (immat, date_immat, modele, marque, proprietaire)
                                        VALUES (:immat, :date_immat, :modele, :marque, :proprio)"
            ,
            [
                ':immat' => $vehic->getImmat(),
                ':date_immat' => $vehic->getDateImmat(),
                ':modele' => $vehic->getModele(),
                ':marque' => $vehic->getMarque(),
                ':proprio' => $vehic->getProprio()
            ]
        );
    }

    function delete(string $immat): void
    {
        $this->bd->execSQL(
            "DELETE FROM VEHICULE WHERE immat = :immat"
            ,
            [':immat' => $immat]
        );
    }

    private function loadQuery(array $result): array
    {
        $Vehics = [];
        foreach ($result as $row) {
            $row = json_decode(json_encode($row), TRUE);
            $vehic = new vehicule();
            $vehic->setImmat($row['immat']);
            $vehic->setDateImmat($row['date_immat']);
            $vehic->setModele($row['modele']);
            $vehic->setMarque($row['marque']);
            $vehic->setProprio($row['proprietaire']);
            $Vehics[] = $vehic;
        }
        return $Vehics;
    }

    function getAll(): array
    {
        return ($this->loadQuery($this->bd->execSQL($this->select)));
    }

    function getByImmat(string $immat): vehicule
    {
        $unVehic = new Vehicule();
        $lesVehicules = $this->loadQuery($this->bd->execSQL($this->select . " WHERE immat=:immat", [':immat' => $immat]));
        if (count($lesVehicules) > 0) {
            $unVehic = $lesVehicules[0];
        }
        return $unVehic;
    }

    function existe(string $immat): bool
    {
        $req = "SELECT *  FROM  VEHICULE
					  WHERE immat = :immat";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':immat' => $immat])));
        return ($res != []);
    }
}
?>