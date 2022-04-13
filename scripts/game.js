
// initialiser la partie
const DEFAULT_TURN  = 40;
const DEPUTIES      = 0;
const DOCTRINE      = 1;
const BUILDING_PROD = -1;
const DEPUTIES_FOOD = -2;
const BUILDING_DIP  = -3;
// il n'y a pas de de let pour que les variables soient globales
var currentTurnAvailable = DEFAULT_TURN;
var buildingFree;
var playerBuildings      = [];
var playerBuildingsProd  = [];
var playerBuildingsDip   = [];
var playerBuildingsFood  = [];
var playerDeputies       = [];
var playerHand = [];


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
    // acceder à currentTurnAvailable globalement
    document.getElementById("remainingTurn").innerHTML = "Il vous reste "+window.currentTurnAvailable+" tours";
    if (window.currentTurnAvailable <= 5) {
        document.getElementById("remainingTurn").css("color", "red");
    }
}

function refreshRemainingDeck() {
    document.getElementById("remainingDeck").text("il vous reste "+window.shuffleDeck.length+" cartes dans votre deck");
}

// la fonction payCost permet de payer le coût d'une carte, elle renvoie true si possible, false sinon
function payCost(card) {
    if (card.type < DEPUTIES) {
        if (window.buildingFree) {
            card.cost --;
        }
        if (floor(window.playerBuildingsProd.length/3) < card.cost) {
            return false;
        }
        else {
            let index = 0;
            while (card.cost > 0) {
                if (window.playerBuildingsProd[index].tapped === false) {
                    window.playerBuildingsProd[index].tap();
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
        if (window.playerBuildingsFood.length < card.cost) {
            return false;
        }
        else {
            let index = 0;
            while (card.cost > 0) {
                if (window.playerBuildingsFood[index].tapped === false) {
                    window.playerBuildingsFood[index].tap();
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
        if (window.playerBuildingsDip.length < card.cost) {
            return false;
        }
        else {
            let index = 0;
            while (card.cost > 0) {
                if (window.playerBuildingsDip[index].tapped === false) {
                    window.playerBuildingsDip[index].tap();
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
    if (window.shuffleDeck.length === 0) {
        return false;
    }
    let card = shuffleDeck.pop();
    // ajoute la carte au joueur
    window.playerHand.push(card);
}

function refreshPlayerHand() {
    // on vide la div
    document.getElementById('player-hand').empty();
    // on parcours la main du joueur
    for (let i = 0; i < window.playerHand.length; i++) {
        // on crée une div pour chaque carte
        let card = $('<div>');
        // on ajoute la classe card
        card.addClass('card');
        // on ajoute le onClick pour la carte avec son index en paramètre
        card.click(playCard(i));
        // on affiche le nom de le cout de la carte et son nom
        card.html(window.playerHand[i]['name'] + ' (' + window.playerHand[i]['cost'] + ')');
        // on affiche la descrpition de la carte au survol
        card.attr('title', window.playerHand[i]['desc']);
        // on ajoute la carte à la div
        document.getElementById('player-hand').append(card);
    }
}

function playCard(index) {
    // TODO: verifier que le joueur peut bien jouer la carte en fonction de son coût (créer fonction payCost)
    // on récupère la carte à jouer et on l'instancie avec la classe Card
    let card = Card(window.playerHand[index]['name'], window.playerHand[index]['type'], window.playerHand[index]['cost'], window.playerHand[index]['desc'], window.playerHand[index]['onPlay'], window.playerHand[index]['eachTurn'], window.playerHand[index]['onTap'], window.playerHand[index]['onDie']);
    // si c'est un batiment
    if (card.type === BUILDING_PROD) {
        // on ajoute la carte au tableau des batiments du joueur
        if (window.buildingFree) {
            window.buildingFree = false;
            window.playerBuildingsProd.push(card);
        } else {
            if (payCost(card.cost)) {
                window.playerBuildingsProd.push(card);
            }
        }
    }
    if (card.type === BUILDING_DIP) {
        // on ajoute la carte au tableau des batiments du joueur
        if (window.buildingFree) {
            window.buildingFree = false;
            window.playerBuildingsDip.push(card);
        } else {
            if (payCost(card.cost)) {
                window.playerBuildingsDip.push(card);
            }
        }
    }
    if (card.type === BUILDING_FOOD) {
        // on ajoute la carte au tableau des batiments du joueur
        if (window.buildingFree) {
            window.buildingFree = false;
            window.playerBuildingsFood.push(card);
        } else {
            if (payCost(card.cost)) {
                window.playerBuildingsFood.push(card);
            }
        }
    }
    if (card.type === DEPUTIES) {
        // on ajoute le deputés à la liste des députés du joueur
        window.playerDeputies.push(card);
    }
    if (card.type === DOCTRINE) {
        // on ajoute la doctrine à la liste des doctrines du joueur
        card.onPlay();
    }
    // on enlève la carte de la main du joueur
    window.playerHand.splice(index, 1);
    // on rafraichit la main du joueur
    refreshPlayerHand(playerHand);
}

function untapCards() {
    // on parcours les cartes de batiments du joueur
    for (let i = 0; i < window.playerBuildings.length; i++) {
        window.playerBuildings[i].untap();
    }
    // on parcours les cartes de députés du joueur
    for (let i = 0; i < window.playerDeputies.length; i++) {
        window.playerDeputies[i].untap();
    }
}

function doDeputiesEffect() {
    // on parcours les députés du joueur
    for (let i = 0; i < window.playerDeputies.length; i++) {
        // on fait l'effet du députés
        window.playerDeputies[i].eachTurn();
    }
}

function initialiseHand() {
    // initialiser la main du joueur avec 7 cartes
    for (let i = 0; i < 7; i++) {
        pickCard(window.playerHand, window.shuffleDeck);
    }
}

let playerHand = initialiseHand();

function discard(index) {
    // on enlève la carte du joueur
    window.playerHand.splice(index, 1);
    // on rafraichit la main du joueur
    refreshPlayerHand(window.playerHand);
}

// change le onClick des cartes pour "Discard"
function discardCard() {
    document.getElementById('player-hand').empty();
    for (let i = 0; i < window.playerHand.length; i++) {
        let card = $('<div>');
        card.addClass('card');
        card.click(discard(i));
        card.html(window.playerHand[i]['name'] + ' (' + window.playerHand[i]['cost'] + ')');
        card.attr('title', window.playerHand[i]['desc']);
        document.getElementById('player-hand').append(card);
    }
}

function turn() {
    if (window.playerHand.length > 7) {
        // on empeche le joueur de passer au prochain tour
        document.getElementById("next-turn").prop('disabled', true);
        // afficher un message dans le div #print
        document.getElementById('print').html("Vous avez trop de cartes en main, vous devez en retirer jusqu'à en avoir 7");
        while (window.playerHand.length > 7) {
            discardCard(window.playerHand, window.shuffleDeck);
        }
        // on repermet le joueur de passer au prochain tour
        document.getElementById("next-turn").prop('disabled', false);
    }
    refreshRemainingTurn();
    // playersBuildings est un tableau qui contient tout les types de batiments du joueur
    window.playerBuildings = window.playerBuildingsProd.concat(window.playerBuildingsDip, window.playerBuildingsFood);
    
    // boucle de jeu
    if (window.currentTurnAvailable > 0 && (window.shuffleDeck.length > 0 && window.playerHand.length > 0)) {
        // on initialise le batiment posables ce tour
        window.buildingFree = true;
        refreshPlayerHand(window.playerHand);
        pickCard(window.playerHand, window.shuffleDeck);
        doDeputiesEffect();
        window.currentTurnAvailable --;
    } else if (window.currentTurnAvailable <= 0) {
        // on affiche une partie perdue
        document.getElementById('print').html('<h1>Vous avez perdu, ayant manqué de temps pour tenir vos promesse, le peuple vous exila</h1>');
        exit();
    } else if (window.shuffleDeck.length <= 0 && window.playerHand.length <= 0){
        // on affiche une partie gagnée
        document.getElementById('print').html('<h1>Bravo vous avez gagné, il est rare de trouver un homme politique tenant ses promesses, le peuple vous adore, vous resterez gravé dans les mémoires à jamais</h1>');
        exit();
    }
}

// document.getElementById("print").innerHTML = '<h1>Hello World</h1>';