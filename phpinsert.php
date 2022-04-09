
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Debugging Hystoric</title>
</head>
<body>
	<!-- Formulaire pour insert une carte -->
	<form action="" method="POST">
	<label>Insert Card : </label>
	<input type="text"name="cardname" required placeholder="Nom de la carte"/>
	<input type="text"name="cardtype" required placeholder="Type de la carte"/>
	<input type="text"name="cardcost" required placeholder="Coût"/>
	<input type="text"name="carddesc" placeholder="Description (facultatif)"/>
	<input type="submit" name="submitbtcard" value="PUSH !!!!"/>
	</form>
	<br><br><br>
	<!-- Formulaire pour insert un dirigeant -->
	<form action="" method="POST">
	<label>Insert Dirigeant : </label>
	<input type="text"name="dirigname" required placeholder="Nom du dirigeant"/>
	<input type="text"name="dirigdesc" placeholder="Description (facultatif)"/>
	<input type="submit" name="submitbtdirig" value="PUSH !!!!"/>
	</form>
	<br><br><br>
	<!-- Formulaire pour mettre une carte dans un deck -->
	<form action="" method="POST">
	<label>Insert Card in Deck : </label>
	<input type="text"name="deckcard" required placeholder="ID Carte"/>
	<input type="text"name="deckdeck" required placeholder="ID Deck"/>
	<input type="submit" name="submitbtdeck" value="PUSH !!!!"/>
	</form>
	<?php
	    // variables recup du form pour les inserer dans la database
		$card_name = $_POST['cardname'];
		$card_type = $_POST['cardtype'];
		$card_cost = $_POST['cardcost'];
		$card_desc = $_POST['carddesc'];
		//------------------------
		$dirig_name = $_POST['dirigname'];
		$dirig_desc = $_POST['dirigdesc'];
		//------------------------
		$deck_cardid = $_POST['deckcard'];
		$deck_deckid = $_POST['deckdeck'];

		// pour communiquer avec la database en question
		$servername = "localhost";
		$username = "drimtim";
		$password = "!drimtim6969#";
		$dbname = "hystoric";

		$conn = new mysqli($servername, $username, $password, $dbname);

		if ($conn->connect_error) {
		die("bug pdt connexion : " . $conn->connect_error);

		}
		// insert la carte apres submit
		if (isset($_POST['submitbtcard'])) {
			$sql = "INSERT INTO carte (card_id,name,type,cost,description)
			SELECT id,'$card_name','$card_type','$card_cost','$card_desc' FROM (SELECT COUNT('card_id') AS id FROM carte) as dt;";
			$conn->query($sql);
			$conn->close();
			header('Location: '.$_SERVER["PHP_SELF"], true, 303); // empeche une recursion en "refreshant" la page
			
		}
		// insert le dirigeant apres submit
		if (isset($_POST['submitbtdirig'])) {
			$sql = "INSERT INTO dirigeant (dirig_id,name,description)
			SELECT id,'$dirig_name','$dirig_desc' FROM (SELECT COUNT('dirig_id') AS id FROM dirigeant) as dt;";
			$conn->query($sql);
			$conn->close();
			header('Location: '.$_SERVER["PHP_SELF"], true, 303);
		}
		// insert carte dans deck apres submit
		if (isset($_POST['submitbtdeck'])) {
			$sql = "INSERT INTO app_carte (rel_id,card_id,deck_id)
			SELECT id,'$deck_cardid','$deck_deckid' FROM (SELECT COUNT('rel_id') AS id FROM app_carte) as dt;";
			$conn->query($sql);
			$conn->close();
			header('Location: '.$_SERVER["PHP_SELF"], true, 303);
		}
	?>
</body>
</html>