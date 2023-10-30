<html>
    <head>
        <meta charset="UTF-8">
        <link rel="stylesheet" href="../vue/style/style.css">
        <title>File page</title>
    </head>
    <body>
        <section>
            <header>Page</header>
        </section>
        <div>
            <h1>Lecture du fichier <?php echo $nomFile ?></h1>
            <br>
            <p><?php 

            foreach($content as $ligne){
                echo $ligne . "<br>";
            }
            
            ?></p>
        </div>
    </body>
</html>