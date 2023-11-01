<?php
error_reporting(E_ALL);
ini_set("display_errors", 1);

require_once "../modele/utilisateurDAO2.class.php";

function afficheUtilisateurs(array $Utilisateurs) : void{
    if (count($Utilisateurs) == 0) return;
    echo "<table><tr><th>id_pers</th><th>nom</th><th>prénom</th><th>login</th><th>mot de passe</th></tr>";
    foreach($Utilisateurs as $util){
        echo "<tr><td>" . $util->getIdpers() . "</td><td>" . $util->getNom(). "</td><td>" . $util->getPrenom() . "</td><td>" . $util->getLog(). "</td><td>" . $util->getMdp() . "</td></tr>";
    }
    echo "</table>";
}

function versJsonUtilisateur(array $Utilisateurs) : array{
    for($i = 0; $i < count($Utilisateurs); $i++){
        $Utilisateurs[$i] = $Utilisateurs[$i]->json_serialize(); //transformation des classes en quelque chose de codable en json
    }
    return $Utilisateurs;
}
function versUtilisateurJson(string $Utilisateurs) : array{
    $Utilisateurs = json_decode($Utilisateurs, true);
    $utils = [];
    foreach($Utilisateurs as $u){
        $util = new Utilisateur();
        $util->setIdpers($u['idpers']);
        $util->setNom($u['nom']);
        $util->setPrenom($u['prenom']);
        $util->setLog($u['login']);
        $util->setMdp($u['mdp']);
        $utils[] = $util;
    }
    return $utils;
}

function insereUtilisateurs(array $Utilisateurs) : void{
    $utilDAO = new UitlisateurDAO();
    foreach($Utilisateurs as $u){
        $utilDAO->insert($u);
    }
}


$utilDAO = new UitlisateurDAO();

$content = $utilDAO->listeUtilisateurs();

$fileContent = [];

//$c = file_get_contents("../fichiers/utilisateurs2.json");
//insereUtilisateurs(versUtilisateurJson($c));

echo "<br>";

$fileContent = versJsonUtilisateur($content);
file_put_contents("../fichiers/utilisateurs.json", json_encode($fileContent)); //remplissage du fichier json


require_once "../vue/JSP.view.php";
?>