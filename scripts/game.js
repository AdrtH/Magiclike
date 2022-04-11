
// initialiser la partie
const DEFAULT_TURN  = 40;
const DEPUTIES      = 0;
const DOCTRINE      = 1;
const BUILDING_PROD = -1;
const DEPUTIES_FOOD = -2;
const BUILDING_DIP  = -3;
let currentTurnAvailable = DEFAULT_TURN;
let buildingFree;
let playerBuildings      = [];
let playerBuildingsProd  = [];
let playerBuildingsDip   = [];
let playerBuildingsFood  = [];
let playerDeputies       = [];
let playerHand = [];


class Card {
    constructor(name, type, cost, description, onPlay, eachTurn, onTap, onDie) {
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.description = description;
        this.onPlay = eval(onPlay);
        this.eachTurn = eval(eachTurn);
        this.onTap = eval(onTap);
        this.onDie = eval(onDie);
        this.tapped = false;
    }

    tap() {
        this.tapped = true;
    }
    untap() {
        this.tapped = false;
    }
}

function refreshRemainingTurn() {
    $("#remainingTurn").text("il vous reste "+currentTurnAvailable+" tours");
    if (currentTurnAvailable <= 5) {
        $("#remainingTurn").css("color", "red");
    }
}

function refreshRemainingDeck() {
    $("#remainingDeck").text("il vous reste "+shuffleDeck.length+" cartes dans votre deck");
}

// la fonction payCost permet de payer le coût d'une carte, elle renvoie true si possible, false sinon
function payCost(card) {
    if (card.type < DEPUTIES) {
        if (buildingFree) {
            card.cost --;
        }
        if (floor(playerBuildingsProd.length/3) < card.cost) {
            return false;
        }
        else {
            let index = 0;
            while (card.cost > 0) {
                if (playerBuildingsProd[index].tapped === false) {
                    playerBuildingsProd[index].tap();
                    card.cost --;
                    index ++;
                }
                else {
                    index ++;
                }
            }
            return true;
        }
    } if (card.type == DEPUTIES) {
        if (playerBuildingsFood.length < card.cost) {
            return false;
        }
        else {
            let index = 0;
            while (card.cost > 0) {
                if (playerBuildingsFood[index].tapped === false) {
                    playerBuildingsFood[index].tap();
                    card.cost --;
                    index ++;
                }
                else {
                    index ++;
                }
            }
            return true;
        }
    } if (card.type == DOCTRINE) {
        if (playerBuildingsDip.length < card.cost) {
            return false;
        }
        else {
            let index = 0;
            while (card.cost > 0) {
                if (playerBuildingsDip[index].tapped === false) {
                    playerBuildingsDip[index].tap();
                    card.cost --;
                    index ++;
                }
                else {
                    index ++;
                }
            }
            return true;
        }
    }
}

//TODO: fonction qui rafraichit le plateau (je laisse ca à Voctri)

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

let shuffleDeck = shuffle(deck);

function pickCard() {
    // si le deck est vide, on retourne false
    if (shuffleDeck.length === 0) {
        return false;
    }
    let card = shuffleDeck.pop();
    // ajoute la carte au joueur
    playerHand.push(card);
}

function refreshPlayerHand() {
    // on vide la div
    $('#player-hand').empty();
    // on parcours la main du joueur
    for (let i = 0; i < playerHand.length; i++) {
        // on crée une div pour chaque carte
        let card = $('<div>');
        // on ajoute la classe card
        card.addClass('card');
        // on ajoute le onClick pour la carte avec son index en paramètre
        card.click(playCard(i));
        // on affiche le nom de le cout de la carte et son nom
        card.html(playerHand[i]['name'] + ' (' + playerHand[i]['cost'] + ')');
        // on affiche la descrpition de la carte au survol
        card.attr('title', playerHand[i]['desc']);
        // on ajoute la carte à la div
        $('#player-hand').append(card);
    }
}

function playCard(index) {
    // TODO: verifier que le joueur peut bien jouer la carte en fonction de son coût (créer fonction payCost)
    // on récupère la carte à jouer et on l'instancie avec la classe Card
    let card = Card(playerHand[index]['name'], playerHand[index]['type'], playerHand[index]['cost'], playerHand[index]['desc'], playerHand[index]['onPlay'], playerHand[index]['eachTurn'], playerHand[index]['onTap'], playerHand[index]['onDie']);
    // si c'est un batiment
    if (card.type === BUILDING_PROD) {
        // on ajoute la carte au tableau des batiments du joueur
        if (buildingFree) {
            buildingFree = false;
            playerBuildingsProd.push(card);
        } else {
            if (payCost(card.cost)) {
                playerBuildingsProd.push(card);
            }
        }
    }
    if (card.type === BUILDING_DIP) {
        // on ajoute la carte au tableau des batiments du joueur
        if (buildingFree) {
            buildingFree = false;
            playerBuildingsDip.push(card);
        } else {
            if (payCost(card.cost)) {
                playerBuildingsProd.push(card);
            }
        }
    }
    if (card.type === BUILDING_FOOD) {
        // on ajoute la carte au tableau des batiments du joueur
        if (buildingFree) {
            buildingFree = false;
            playerBuildingsFood.push(card);
        } else {
            if (payCost(card.cost)) {
                playerBuildingsProd.push(card);
            }
        }
    }
    if (card.type === DEPUTIES) {
        // on ajoute le deputés à la liste des députés du joueur
        playerDeputies.push(card);
    }
    if (card.type === DOCTRINE) {
        // on ajoute la doctrine à la liste des doctrines du joueur
        card.onPlay();
    }
    // on enlève la carte de la main du joueur
    playerHand.splice(index, 1);
    // on rafraichit la main du joueur
    refreshPlayerHand(playerHand);
}

function untapCards() {
    // on parcours les cartes de batiments du joueur
    for (let i = 0; i < playerBuildings.length; i++) {
        playerBuildings[i].untap();
    }
    // on parcours les cartes de députés du joueur
    for (let i = 0; i < playerDeputies.length; i++) {
        playerDeputies[i].untap();
    }
}

function doDeputiesEffect() {
    // on parcours les députés du joueur
    for (let i = 0; i < playerDeputies.length; i++) {
        // on fait l'effet du députés
        playerDeputies[i].eachTurn();
    }
}

function initialiseHand() {
    // initialiser la main du joueur avec 7 cartes
    for (let i = 0; i < 7; i++) {
        pickCard(playerHand, shuffleDeck);
    }
}

function discard(index) {
    // on enlève la carte du joueur
    playerHand.splice(index, 1);
    // on rafraichit la main du joueur
    refreshPlayerHand(playerHand);
}

// change le onClick des cartes pour "Discard"
function discardCard() {
    $('#player-hand').empty();
    for (let i = 0; i < playerHand.length; i++) {
        let card = $('<div>');
        card.addClass('card');
        card.click(discard(i));
        card.html(playerHand[i]['name'] + ' (' + playerHand[i]['cost'] + ')');
        card.attr('title', playerHand[i]['desc']);
        $('#player-hand').append(card);
    }
}

function turn() {
    if (playerHand.length > 7) {
        // on empeche le joueur de passer au prochain tour
        $("#next-turn").prop('disabled', true);
        // afficher un message dans le div #print
        $('#print').html("Vous avez trop de cartes en main, vous devez en retirer jusqu'à en avoir 7");
        while (playerHand.length > 7) {
            discardCard(playerHand, shuffleDeck);
        }
        // on repermet le joueur de passer au prochain tour
        $("#next-turn").prop('disabled', false);
    }
    refreshRemainingTurn();
    // playersBuildings est un tableau qui contient tout les types de batiments du joueur
    playerBuildings = playerBuildingsProd.concat(playerBuildingsDip, playerBuildingsFood);
    
    // boucle de jeu
    if (currentTurnAvailable > 0 && (shuffleDeck.length > 0 && playerHand.length > 0)) {
        // on initialise le batiment posables ce tour
        buildingFree = true;
        refreshPlayerHand(playerHand);
        pickCard(playerHand, shuffleDeck);
        doDeputiesEffect();
        currentTurnAvailable --;
    } else if (currentTurnAvailable <= 0) {
        // on affiche une partie perdue
        $('#print').html('<h1>Vous avez perdu, ayant manquer de temps pour tenir vos promesse, le peuple vous exilia</h1>');
        exit();
    } else if (shuffleDeck.length <= 0 && playerHand.length <= 0){
        // on affiche une partie gagnée
        $('#print').html('<h1>Bravo vous avez gagné, il est rare de trouver un homme politique tenant ses promesses, le peuple vous adore, vous resterez gravé dans les mémoires à jamais</h1>');
        exit();
    }
}

// document.getElementById("print").innerHTML = '<h1>Hello World</h1>';