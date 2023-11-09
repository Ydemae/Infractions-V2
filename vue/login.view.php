<!DOCTYPE html>
<html lang ="fr">

<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link rel="stylesheet" href="../../vue/css/login.css">
</head>
<body>
    <header>
        <section>
            <span></span>
            <h1>Authentification</h1>
        </section>
    </header>

    <h1>Bonjour, veuillez vous authentifier</h1>
    <br>

    <form action="login.php" method="POST">
        <label>Identifiant :</label>
        <input type="text" name="login" Autocomplete="Off" />
        <label><?php echo $error["login"]; ?></label>
        <br><br>
        <label>Mot de passe :</label>
        <input type="password" name="password" Autocomplete="Off" />
        <label> <?php echo $error["password"]; ?></label>
        <br><br>
        <label><?php echo $error['connect']; ?></label>
        <input type="submit" name="Connexion" value="Connexion" />
    </form>
</body>

</html>