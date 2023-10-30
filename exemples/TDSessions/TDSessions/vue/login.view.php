<!DOCTYPE html>
<html>
    <head>
        <title>Titre</title>
        <meta charset="utf-8" />
        <link rel="stylesheet" href="../vue/style/style.css">
    </head>
    <body>
        <header>
            <section>
                <span></span>
                <h1>Sessions et authentification</h1>
            </section>
        </header>
        <h1>Authentification</h1>
        <br>
        <form action="login.php" method="POST">
            <label for="libelle">Identifiant :</label>
            <input type="text" name="login" Autocomplete="Off" />
            
            <br><br>
            <label for="libelle">Mot de passe :</label>
            <input type="password" name="password" Autocomplete="Off" />

            <br><br>
            <input type="submit" name="Connexion" value="Connexion" />
        </form>

        <br><br>
        <a href = "../accueil.php" class = "ajout">Retour à la page d'accueil</a>

        <br><br>
        <?php echo "<p>$msg</p>" ?>
    </body>
</html>