<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HYSTORIC</title>
</head>
<body>
    <h1>Hystoric</h1>
    
    
    <form id="Form" action="game.php" method="post">
    </form>
    <?php 
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

        // crée une requete sql pour connaitre le nom des decks dans la base de données
        $query = "SELECT deck.deck_id as id, deck.name as name
                  FROM deck";
        // execute la requete avec la fonction sql_query
        $result  = sql_query($con,$query);
        //fetch all the rows in the result set
        $tab = $result->fetch_all(MYSQLI_ASSOC);
    ?>
    <script>
        let decks = <?php echo json_encode($tab); ?>;
        for (let i = 0; i < decks.length; i++) {
            document.getElementById("Form").innerHTML += ("<input type='radio' value='"+i+"'name='Deck'>"+decks[i]["name"]+"</input><br>")
        }
        document.getElementById("Form").innerHTML += ("<input type='submit' value='JOUER !!'>");
    </script>
    <br>
    <a href="phpinsert.php">
      <button>Debug</button>
    </a>
</body>
</html>