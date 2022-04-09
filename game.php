<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- <link rel="stylesheet" href="style/game.css"> -->
    <title>HYSTORIC</title>
</head>
<body>
    <?php
        echo "<p>deck ".$_POST['Deck']."</p>";

        $servername = "drimtim.wstr.fr";
        $username   = "drim";
        $password   = "!drimtim6969#";
        $test       = "oui";

        // CONNECT TO DB
        $con = new mysqli($servername, $username, $password);
        if ($con->connect_error) {
            die("Erreur lors de la connexion à la base de données: " . $con->connect_error);
        }
    ?>

    <p name="print"></p>

    <!-- fait la passerelle entre le jeu en js et la db en php -->
    <script type="text/javascript"> 
        let deck = <?php echo json_encode();?>;
    </script>



    <script src="scripts/game.js"></script>
</body>
</html>