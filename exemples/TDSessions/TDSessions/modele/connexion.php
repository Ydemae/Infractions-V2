<?php

class Connexion{
    private $db;

    function __construct(){

        $db_config['SGBD'] = 'mysql';
        $db_config['HOST'] = 'devbdd.iutmetz.univ-lorraine.fr';
        $db_config['DB_NAME'] = 'maloron1u_bdsalle';
        $db_config['USER'] = 'maloron1u_appli';
        $db_config['PASSWORD'] = '32201222'; 

        try{
            $this->db = new PDO( $db_config['SGBD'].':host='.$db_config['HOST'].';dbname='.$db_config['DB_NAME'],
            $db_config['USER'], $db_config['PASSWORD'],
            array(PDO::MYSQL_ATTR_INIT_COMMAND => 'SET NAMES utf8'));
            // permet d’afficher les caractères utf8 si la BdD est définie en utf8 (accents...)
            unset($db_config);
            }
            catch( Exception $exception ) {
            die($exception->getMessage());
            }
    }

    function execSQL(string $req, array $valeurs = []) : stdClass | null{
        try{
            $sql = $this->db->prepare($req);
            $sql->execute($valeurs);
            $res = [];
            while($sql->fetch(PDO::FETCH_ASSOC)){
                $res[] = $sql->fetch(PDO::FETCH_ASSOC);
            }
            return $res;
        }
        catch(Exception $exception){
            die($exception->getMessage());
        }

    }
    
}


?>