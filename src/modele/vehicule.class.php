<?php
class Vehicule
{
    private $immat;
    private $date_immat;
    private $modele;
    private $marque;
    private $proprio;

    function __construct(string $immat = '', string $date_immat = '', string $modele = '', string $marque = '', string $proprio = '')
    {
        $this->immat = $immat;
        $this->date_immat = $date_immat;
        $this->marque = $marque;
        $this->modele = $modele;
        $this->proprio = $proprio;
    }

    function getImmat()
    {
        return $this->immat;
    }
    function setImmat(string $num)
    {
        $this->immat = $num;
    }
    function getDateImmat()
    {
        return $this->date_immat;
    }
    function setDateImmat(string $date_immat)
    {
        $this->date_immat = $date_immat;
    }
    function getModele()
    {
        return $this->modele;
    }
    function setModele(string $modele)
    {
        $this->modele = $modele;
    }
    function getMarque()
    {
        return $this->marque;
    }
    function setMarque(string $marque)
    {
        $this->marque = $marque;
    }
    function getProprio()
    {
        return $this->proprio;
    }
    function setProprio(string $proprio)
    {
        $this->proprio = $proprio;
    }
}
?>