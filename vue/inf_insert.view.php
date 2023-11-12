<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Edition d'une infraction</title>
    <link type="text/css" rel="stylesheet" href="../../vue/css/inf_liste.css">
    <link type="text/css" rel="stylesheet" href="../../vue/css/login.css">
    <link type="text/css" rel="stylesheet" href="../../vue/css/inf_edit.css">
</head>

<body>
    <div id="div_inf_titre" class="divtitre">Insertion des nouvelles infractions <a href="inf_liste.php"
            class="link_right">retour à la liste des infractions</a> <a href="logout.php" class="link_right">se
            déconnecter</a></div>

    <form action="inf_insert.php" method="POST">
        <div class="center">
            <div class="flexbox">
                <span>
                    <?php echo $fichier; ?>
                </span>
                <span>
                    <label class="labelerreur">
                        <?php echo $fileError; ?>
                    </label>
                </span>
                <span>
                    <label class="labelsuccess">
                        <?php echo $successCode; ?>
                    </label>
                </span>
                <span>
                    <input type="submit" name="Insérer" id="btn_delit_ajouter" value="Insérer les infractions" />
                </span>
            </div>
        </div>
    </form>
</body>

</html>