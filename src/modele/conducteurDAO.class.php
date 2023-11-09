<?php
require_once("connexion.php");
require_once("conducteur.class.php");
class ConducteurDAO
{
    private $bd;
    private $select;

    function __construct()
    {
        $this->bd = new Connexion();
        $this->select = 'SELECT num_permis, date_permis, nom, prenom, mot_de_passe, is_admin FROM conducteur ';
    }

    function insert(Conducteur $conduct): void
    {
        $this->bd->execSQL("INSERT INTO conducteur (num_permis,date_permis, nom, prenom, mot_de_passe, is_admin)
                                        VALUES (:num_permis, :date_permis, :nom, :prenom, :mdp, :admin)"
            ,
            [
                ':num_permis' => $conduct->getNum(),
                ':date_permis' => $conduct->getDatePermis(),
                ':nom' => $conduct->getNom(),
                ':prenom' => $conduct->getPrenom(),
                ':mdp' => $conduct->getMdp(),
                ':admin' => $conduct->getAdmin(),
            ]
        );
    }

    function delete(string $num_permis): void
    {
        $this->bd->execSQL(
            "DELETE FROM conducteur WHERE num_permis = :num"
            ,
            [':num' => $num_permis]
        );
    }

    private function loadQuery(array $result): array
    {
        $conducts = [];
        foreach ($result as $row) {
            $row = json_decode(json_encode($row), TRUE);
            $conduct = new Conducteur();
            $conduct->setNum($row['num_permis']);
            $conduct->setDatePermis($row['date_permis']);
            $conduct->setNom($row['nom']);
            $conduct->setPrenom($row['prenom']);
            $conduct->setMdp($row['mot_de_passe']);
            $conduct->setAdmin($row['is_admin']);
            $conducts[] = $conduct;
        }
        return $conducts;
    }

    function getAll(): array
    {
        return ($this->loadQuery($this->bd->execSQL($this->select)));
    }

    function getById(string $num): Conducteur
    {
        $unConduct = new Conducteur();
        $lesConducts = $this->loadQuery($this->bd->execSQL($this->select . " WHERE num_permis=:num", [':num' => $num]));
        if (count($lesConducts) > 0) {
            $unConduct = $lesConducts[0];
        }
        return $unConduct;
    }
    function isAdminID(string $num): bool
    {
        if (!$this->existe($num)) return false;
        $res = $this->getById($num);
        return $res->getAdmin();
    }

    function existe(string $num_permis): bool
    {
        $req = "SELECT *  FROM  conducteur
					  WHERE num_permis = :num";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':num' => $num_permis])));
        return ($res != []);
    }
}
?>