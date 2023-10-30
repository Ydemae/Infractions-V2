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
				$util = new Utilisateur();
				$util->setIdpers($row['idpers']);
				$util->setNom($row['nom']);
				$util->setPrenom($row['prenom']);
				$util->setLog($row['loginn']);
				$util->setMdp($row['mdp']);
				$utils[] = $util; 
			}
			return $utils;
		}
		function listeUtilisateurs() : stdClass{
			while ($this->bd->execSQL($this->select)){
				
			}
		}
    }
?>
