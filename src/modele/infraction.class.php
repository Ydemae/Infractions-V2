<?php
class Infraction
{
    private $num_inf;
    private $date_inf;
    private $immat;
    private $num_permis;

    function __construct(string $num_inf = '', string $date_inf = '', string $immat = '', string $num_permis = '')
    {
        $this->num_inf = $num_inf;
        $this->date_inf = $date_inf;
        $this->num_permis = $num_permis;
        $this->immat = $immat;
    }

    function getNumInf()
    {
        return $this->num_inf;
    }
    function setNumInf(int $num)
    {
        $this->num_inf = $num;
    }
    function getDateInf()
    {
        return $this->date_inf;
    }
    function setDateInf(string $date_inf)
    {
        $this->date_inf = $date_inf;
    }
    function getImmat()
    {
        return $this->immat;
    }
    function setImmat(string $immat)
    {
        $this->immat = $immat;
    }
    function getNumPermis()
    {
        return $this->num_permis;
    }
    function setNumPermis(string $num_permis)
    {
        $this->num_permis = $num_permis;
    }

    function json_serialize()
    {
        return get_object_vars($this);
    }
}
?>