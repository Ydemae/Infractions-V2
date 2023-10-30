<?php
class Conducteur
{
	private $num_permis;
	private $date_permis;
	private $nom;
	private $prenom;
	private $mdp;

	function __construct(string $num_permis = '', $date_permis = new date(), string $nom = '', string $prenom = '', string $mdp = '')
	{
		$this->num_permis = $num_permis;
		$this->date_permis = $date_permis;
		$this->prenom = $prenom;
		$this->nom = $nom;
		$this->mdp = $mdp;
	}

	function getNum()
	{
		return $this->num_permis;
	}
	function setNum(int $num)
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
}
?>