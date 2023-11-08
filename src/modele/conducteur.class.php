<?php
class Conducteur
{
	private $num_permis;
	private $date_permis;
	private $nom;
	private $prenom;
	private $mdp;
	private $is_admin;

	function __construct(string $num_permis = '', string $date_permis = '', string $nom = '', string $prenom = '', string $mdp = '', bool $is_admin = false)
	{
		$this->num_permis = $num_permis;
		$this->date_permis = $date_permis;
		$this->prenom = $prenom;
		$this->nom = $nom;
		$this->mdp = $mdp;
		$this->is_admin = $is_admin;
	}

	function getNum()
	{
		return $this->num_permis;
	}
	function setNum(string $num)
	{
		$this->num_permis = $num;
	}
	function getDatePermis()
	{
		return $this->date_permis;
	}
	function setDatePermis(string $date_permis)
	{
		$this->date_permis = $date_permis;
	}
	function getNom()
	{
		return $this->nom;
	}
	function setNom(string $nom)
	{
		$this->nom = $nom;
	}
	function getPrenom()
	{
		return $this->prenom;
	}
	function setPrenom(string $prenom)
	{
		$this->prenom = $prenom;
	}
	function getMdp()
	{
		return $this->mdp;
	}
	function setMdp(string $mdp)
	{
		$this->mdp = $mdp;
	}
	function getAdmin()
	{
		return $this->is_admin;
	}
	function setAdmin(bool $adm)
	{
		$this->is_admin = $adm;
	}
}
?>