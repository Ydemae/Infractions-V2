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

        function insert (Utilisateur $util) : void {
            $this->bd->execSQL("INSERT INTO UTILISATEURS (idpers, nom, prenom, loginn, mdp)
                                        VALUES (:id, :nom, :prenom, :loginn, :mdp)"
								,[':id'=>$util->getIdpers(), ':nom'=>$util->getNom()
									,':prenom'=>$util->getPrenom() , ':loginn' =>$util->getLog(), ':mdp' => $util->getMdp() ] );
		}

		function delete (string $id) : void	{
            $this->bd->execSQL("DELETE FROM UTILISATEURS WHERE idpers = :id"
								,[':id'=>$id ] );
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

		function getAll () : array	{
			return	($this->loadQuery($this->bd->execSQL($this->select)));	
		}

		function getByNum (string $id) : Utilisateur	{
			$unUtil = new Utilisateur();
			$lesUtils = $this->loadQuery($this->bd->execSQL($this->select ." WHERE idpers=:id", [':id'=>$id]) );
			if (count($lesUtils)>0) { $unUtil = $lesUtils[0]; }
			return $unUtil;
		}

		function getByLogin (string $id) : Utilisateur	{
			$unUtil = new Utilisateur();
			$lesUtils = $this->loadQuery($this->bd->execSQL($this->select ." WHERE loginn=:id", [':id'=>$id]) );
			if (count($lesUtils)>0) { $unUtil = $lesUtils[0]; }
			return $unUtil;
		}
		
		function existe (string $idpers) : bool {
			$req 	= "SELECT *  FROM  UTILISATEURS
					  WHERE idpers = :id";
			$res 	= ($this->loadQuery($this->bd->execSQL($req,[':id'=>$idpers])));
			return ($res != []);
		}
    }
?>
