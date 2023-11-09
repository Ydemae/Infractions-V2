<!DOCTYPE html>
<html lang ="fr">

<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link rel="stylesheet" href="../../vue/css/main.css">
    <link rel="stylesheet" href="../../vue/css/login.css">
</head>
<body>
    <header>
        <section>
            <span></span>
            <h1>Authentification</h1>
        </section>
    </header>
    <div class="center">
        <div>
            <span>
                <h1>Bonjour, veuillez vous authentifier</h1>
                <br>
            </span>

            <form action="login.php" method="POST">
                <div class="flexbox">
                    <span>
                        <label>Identifiant :</label>
                        <input type="text" name="login" Autocomplete="Off" />
                        <br>
                        <label class="error"><?php echo $error["login"]; ?></label>
                    </span>
                    <span>
                        <label>Mot de passe :</label>
                        <input type="password" name="password" Autocomplete="Off" />
                        <br>
                        <label class="error"> <?php echo $error["password"]; ?></label>
                    </span>
                    <span>
                        <label class="error"><?php echo $error['connect']; ?></label>
                    </span>
                    <span>
                        <input type="submit" name="Connexion" value="Connexion"/>
                    </span>
                </div>
            </form>
        </div>
    </div>
</body>

</html>