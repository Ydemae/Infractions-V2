<?php
class Comprend
{
    private $num_inf;
    private $num_delit;

    function __construct(string $num_inf = '', string $num_delit = '')
    {
        $this->num_inf = $num_inf;
        $this->num_delit = $num_delit;
    }

    function getNumInf()
    {
        return $this->num_inf;
    }
    function setNumInf(string $num)
    {
        $this->num_inf = $num;
    }

    function getNumDelit()
    {
        return $this->num_delit;
    }
    function setNumDelit(string $num)
    {
        $this->num_delit = $num;
    }
}
?>