<?php
class Delit
{
    private $num_delit;
    private $nature;
    private $tarif;

    function __construct(string $num_delit = '', string $nature = '', string $tarif = '')
    {
        $this->num_delit = $num_delit;
        $this->nature = $nature;
        $this->tarif = $tarif;
    }

    function getNumDelit()
    {
        return $this->num_delit;
    }
    function setNumDelit(int $num)
    {
        $this->num_delit = $num;
    }
    function getNature()
    {
        return $this->nature;
    }
    function setNature(string $nature)
    {
        $this->nature = $nature;
    }
    function getTarif()
    {
        return $this->tarif;
    }
    function setTarif(string $tarif)
    {
        $this->tarif = $tarif;
    }
}
?>