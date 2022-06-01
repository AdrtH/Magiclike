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
        //echo "<p>deck ".$_POST['Deck']."</p>";

        $servername = "localhost";
        $username   = "root";
        $password   = "";
        $dbname     = "hystoric";
        $test       = "oui";

        // CONNECT TO DB
        $con = new mysqli($servername, $username, $password, $dbname);
        if ($con->connect_error) {
            die("Erreur lors de la connexion à la base de données: " . $con->connect_error);
        }

        //crée une fonction qui permet d'executer une requête
        function sql_query($con,$sql) {
            $result = $con->query($sql);
            if (!$result) {
                die("Erreur lors de l'exécution de la requête: " . $con->error);
            }
            return $result;
        }

        // crée une requete sql pour connaitre le nombre de decks dans la base de données
        $query = "SELECT COUNT(*) as c FROM `deck`";

        // execute la requete avec la fonction sql_query
        $result  = sql_query($con,$query);
        $nbDecks = $result->fetch_assoc()['c'];

        if (!($_POST['Deck'] >= 0 && $_POST['Deck'] < $nbDecks)) {
            // echo $nbDecks;
            die("Erreur lors du choix du deck, celui ci n'existe pas: Deck ".$_POST['Deck']);
        }

        // crée une boucle qui va parcourir toutes les appartencances de carte dans le deck choisi, 
        $query = "SELECT carte.card_id as id, carte.name as name, carte.cost as cost, carte.description as descr, carte.type as type, carte.onPlay as onPlay, carte.eachTurn as eachTurn, carte.onTap as onTap, carte.onDeath as onDie
                  FROM carte
                  INNER JOIN app_carte as app 
                  ON carte.card_id = app.card_id
                  WHERE app.deck_id = {$_POST['Deck']};";

        // execute la requete avec la fonction sql_query
        $result = sql_query($con,$query);
        //fetch all the rows in the result set
        $tab = $result->fetch_all(MYSQLI_ASSOC);

    ?>

    <p id="print"></p>
    <div id="Board">
        <p>Vos Députés :</p>
        <div id="Deputies"></div>
        <p>Vos Batiments :</p>
        <div id="Buildings"></div>
    </div>
    <p>Votre main :</p>
    <div id="player-hand"></div>
    <br>
    <div id='remainingDeck'></div>
    <div id="remainingTurn">Il vous reste 40 tours</div>
    <button id="nextTurn" onclick="turn()">Tour Suivant</button>

    <!--- fait la passerelle entre le jeu en js et la db en php -->
    <script type="text/javascript"> 
        let deck = <?php echo json_encode($tab);?>;
    </script>
    <script src="scripts/game.js"></script>
</body>
</html>