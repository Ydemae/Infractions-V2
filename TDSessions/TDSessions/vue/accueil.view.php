<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../vue/style/style.css">
        <title>Login Page</title>
    </head>
    <body>
        <section>
            <header>Session</header>
            <a href="accueil.php?deco=true" >Déconnexion</a>
        </section>
        <div>
            <h1><?php echo "Bienvenue " . $login . " !" ?></h1>
            <br>
            <p>Voici vos informations :</p>
            <table>
                <?php echo $tab ?>
            </table>
        </div>
    </body>
</html>