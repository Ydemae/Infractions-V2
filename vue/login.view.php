<!DOCTYPE html>
<html lang ="fr">

<head>
    <meta charset="UTF-8">
    <title>Connexion</title>
    <link rel="stylesheet" href="../vue/css/login.css">
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

    <form action="../login.php" method="POST">
    <label for="libelle">Identifiant :</label>
    <input type="text" name="login" Autocomplete="Off" />

    <br><br>
    <label for="libelle">Mot de passe :</label>
    <input type="password" name="password" Autocomplete="Off" />

    <br><br>
    <input type="submit" name="Connexion" value="Connexion" />
</body>

</html>