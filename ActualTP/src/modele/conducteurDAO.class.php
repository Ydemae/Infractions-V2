<?php
require_once("connexion.php");
require_once("conducteur.class.php");
class UitlisateurDAO
{
    private $bd;
    private $select;

    function __construct()
    {
        $this->bd = new Connexion();
        $this->select = 'SELECT num_permis, date_permis, nom, prenom, mdp FROM CONDUCTEUR ';
    }

    function insert(Conducteur $conduct): void
    {
        $this->bd->execSQL("INSERT INTO CONDUCTEUR (num_permis,date_permis, nom, prenom, mdp)
                                        VALUES (:num_permis, :date_permis, :nom, :prenom, :mdp)"
            ,
            [
                ':num_permis' => $conduct->getNum(),
                ':date_permis' => $conduct->getDatePermis(),
                ':nom' => $conduct->getNom(),
                ':prenom' => $conduct->getPrenom(),
                ':mdp' => $conduct->getMdp()
            ]
        );
    }

    function delete(string $num_permis): void
    {
        $this->bd->execSQL(
            "DELETE FROM CONDUCTEUR WHERE num_permis = :num"
            ,
            [':num' => $num_permis]
        );
    }

    private function loadQuery(array $result): array
    {
        $conducts = [];
        foreach ($result as $row) {
            $conduct = new Conducteur();
            $conduct->setNum($row['num_permis']);
            $conduct->setDatePermis(new date($row['date_permis']));
            $conduct->setNom($row['nom']);
            $conduct->setPrenom($row['prenom']);
            $conduct->setMdp($row['mot_de_passe']);
            $conducts[] = $conduct;
        }
        return $conducts;
    }

    function getAll(): array
    {
        return ($this->loadQuery($this->bd->execSQL($this->select)));
    }

    function getByNum(string $num): Conducteur
    {
        $unConduct = new Conducteur();
        $lesConducts = $this->loadQuery($this->bd->execSQL($this->select . " WHERE num_permis=:num", [':num' => $num]));
        if (count($lesConducts) > 0) {
            $unConduct = $lesConducts[0];
        }
        return $unConduct;
    }

    function existe(string $num_permis): bool
    {
        $req = "SELECT *  FROM  CONDUCTEUR
					  WHERE num_permis = :num";
        $res = ($this->loadQuery($this->bd->execSQL($req, [':num' => $num_permis])));
        return ($res != []);
    }
}
?>