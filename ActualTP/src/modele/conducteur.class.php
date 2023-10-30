<?php
    class Conducteur
	{
		private $num_permis;
		private $date_permis;
		private $nom;
		private $prenom;
		private $mdp;

		function __construct(string $num_permis='', date $date_permis= new date(), string $prenom='', string $login = '', string $mdp = '') {
			$this->idpers		= $idpers;
			$this->nom	= $nom;
			$this->prenom	= $prenom;
			$this->login	= $login;
			$this->mdp	= $mdp;
		}

		function getIdpers		() : string			{ return $this->idpers; 		}
		function setIdpers		(string $id)		{ $this->idpers = $id; 			}
		function getNom	() : string			{ return $this->nom; 	} 
		function setNom	(string $libelle)	{ $this->nom=$libelle; 	}		
		function getPrenom	() : string			{ return $this->prenom; 		}
		function setPrenom	(string $prenom)		{ $this->prenom=$prenom; 		}
		function getLog		() : string			{ return $this->login; 		}
		function setLog		(string $login)		{ $this->login = $login; 			}
		function getMdp		() : string			{ return $this->mdp; 		}
		function setMdp		(string $mdp)		{ $this->mdp = $mdp; 			}
	}
?>
