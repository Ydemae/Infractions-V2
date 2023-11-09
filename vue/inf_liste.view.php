<!DOCTYPE html>
<html>

<head>
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <title>Liste des infractions</title>
    <link type="text/css" rel="stylesheet" href="../../vue/css/inf_liste.css">
</head>

<body>
    <div id="div_inf_liste_titre" class="divtitre"> Liste des infs </div>
    <table id="table_inf">
        <thead>
            <tr>
                <th></th>
                <th>Numéro</th>
                <th>Le</th>
                <th>Véhicule</th>
                <th>Conducteur</th>
                <th>Montant</th>
                <th></th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <?php echo $affi; ?>
        </tbody>
    </table>
    <div class="divaction">
    <?php echo $btn_inf_ajouter ?>
    </div>
</body>
<script type="module" src="../controleur/inf_liste.js"></script>

</html>