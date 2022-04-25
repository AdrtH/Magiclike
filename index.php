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
    <script>
        for (let index = 0; index < 27; index++) {
            document.getElementById("Form").innerHTML += ("<input type='radio' value='"+index+"'name='Deck'>Deck "+(1+index)+"</input><br>");
        }
        document.getElementById("Form").innerHTML += ("<input type='submit' value='JOUER !!'>");
    </script>
    <br>
    <a href="phpinsert.php">
      <button>Debug</button>
    </a>
</body>
</html>