<?php
class Connexion {
	private $db;

	function __construct() {
		$db_config['SGBD']		= 'mysql';
		$db_config['HOST']		= 'localhost';
		$db_config['DB_NAME']	= 'toto3u_bdinventaire';
		$db_config['USER']		= 'toto3u_appli';
		$db_config['PASSWORD']	= 'motdepasse';
		try
		{
			$this->db = new PDO($db_config['SGBD'] .':host='. $db_config['HOST'] .';dbname='. $db_config['DB_NAME'],
								$db_config['USER'],	$db_config['PASSWORD'],
								array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
								// permet d’afficher les caractères utf8 si la BdD est définie en utf8 (accents...)						
			unset($db_config);
		}
		catch( Exception $exception )
		{
			die($exception->getMessage()) ;
		}
	}

	function execSQL(string $req, array $valeurs=[]) : array | null {
		try
		{	
			$sql=$this->db->prepare($req); 
			$sql->execute($valeurs);
		}
		catch( Exception $exception )
		{
			die($exception->getMessage()) ;
		}
		return $sql->fetchAll(PDO::FETCH_ASSOC);// retourne uniquement chaque ligne sous forme d'un tableau associatif (clé) sinon retourne chaque ligne avec double colonne : indice et clé
	}

	function estAdmin($login, $mdp) : bool {
		return ( $login==$this->db_admin['login']  and  $mdp==$this->db_admin['mdp'] );
	}

}	


?>
