<?php
	require_once("connexion.php");
    require_once("utilisateur.class.php");
    class UitlisateurDAO
	{
        private $bd;
        private $select; 

		function __construct()
		{
		    $this->bd=new Connexion();
            $this->select = 'SELECT idpers, nom, prenom, loginn, mdp FROM UTILISATEURS ';
		}

		private function loadQuery (array $result) : array	{
			$utils = [];
			foreach($result as $row)
			{
				$arr = json_decode(json_encode($row), TRUE);
				$util = new Utilisateur();
				$util->setIdpers($arr['idpers']);
				$util->setNom($arr['nom']);
				$util->setPrenom($arr['prenom']);
				$util->setLog($arr['loginn']);
				$util->setMdp($arr['mdp']);
				$utils[] = $util;
			}
			return $utils;
		}
		function listeUtilisateurs() : array{
			return $this->loadQuery($this->bd->execSQL($this->select));
		}

		function insert (Utilisateur $util) : void {
            $this->bd->execSQL("INSERT INTO UTILISATEURS (idpers, nom, prenom, loginn, mdp)
                                        VALUES (:id, :nom, :prenom, :loginn, :mdp)"
								,[':id'=>$util->getIdpers(), ':nom'=>$util->getNom()
									,':prenom'=>$util->getPrenom() , ':loginn' =>$util->getLog(), ':mdp' => $util->getMdp() ] );
		}
    }
?>
