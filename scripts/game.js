
// initialiser la partie
const DEFAULT_TURN  = 40;
const DEPUTIES      = 0;
const DOCTRINE      = 1;
const BUILDING_PROD = -1;
const DEPUTIES_FOOD = -2;
const BUILDING_DIP  = -3;
let shuffleDeck          = shuffle(deck);
let currentTurnAvailable = DEFAULT_TURN;
let playerBuildings      = [];
let playerBuildingsProd  = [];
let playerBuildingsDip   = [];
let playerBuildingsFood  = [];
let playerDeputies       = [];
let playerDoctrine       = [];


// on crée une classe pour les cartes
class Card {
    constructor(name, type, cost, description) {
        this.name = name;
        this.type = type;
        this.cost = cost;
        this.description = description;
        this.tapped = false;
    }

    tap() {
        this.tapped = true;
    }
    untap() {
        this.tapped = false;
    }
}

// randomiser l'ordre des cartes dans le deck
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// créer une fonction qui permet de piocher une carte
function pickCard() {
    // si le deck est vide, on retourne false
    if (shuffleDeck.length === 0) {
        return false;
    }
    let card = shuffleDeck.pop();
    // ajoute la carte au joueur
    playerHand.push(card);
}

// créer une fonction qui permet de rafraichir la main du joueur
function refreshPlayerHand() {
    // on vide la div
    $('#player-hand').empty();
    // on parcours la main du joueur
    for (let i = 0; i < playerHand.length; i++) {
        // on crée une div pour chaque carte
        let card = $('<div>');
        // on ajoute la classe card
        card.addClass('card');
        // on affiche le nom de la carte et sa description
        card.html(`<p>${playerHand[i].name}</p><p>${playerHand[i].description}</p>`);
        // on ajoute la carte à la div
        $('#player-hand').append(card);
    }
}

// crée une fonction pour jouer une carte
function playCard(index, buildingsAvailable) {
    // TODO: verifier que le joueur peut bien jouer la carte en fonction de son coût (créer fonction payCost)
    // on récupère la carte à jouer et on l'instancie avec la classe Card
    let card = Card(playerHand[index]['name'], playerHand[index]['type'], playerHand[index]['cost'], playerHand[index]['desc']);
    // si c'est un batiment
    if (card.type === BUILDING_PROD) {
        // on ajoute la carte au tableau des batiments du joueur
        playerBuildingsProd.push(card);
        buildingsAvailable --;
    }
    if (card.type === BUILDING_DIP) {
        // on ajoute la carte au tableau des batiments du joueur
        playerBuildingsDip.push(card);
        buildingsAvailable --;
    }
    if (card.type === BUILDING_FOOD) {
        // on ajoute la carte au tableau des batiments du joueur
        playerBuildingsFood.push(card);
        buildingsAvailable --;
    }
    if (card.type === DEPUTIES) {
        // on ajoute le deputés à la liste des députés du joueur
        playerDeputies.push(card);
    }
    if (card.type === DOCTRINE) {
        // on ajoute la doctrine à la liste des doctrines du joueur
        playerDoctrine.push(card);
    }
    // on enlève la carte de la main du joueur
    playerHand.splice(index, 1);
    // on rafraichit la main du joueur
    refreshPlayerHand(playerHand);
}

function game() {
    // initialiser la main du joueur avec 7 cartes
    let playerHand = [];
    for (let i = 0; i < 7; i++) {
        pickCard(playerHand, shuffleDeck);
    }

    // boucle de jeu
    while (currentTurnAvailable > 0 && shuffleDeck.length > 0) {
        // on initialise le nombre de batiments posables ce tour
        let buildingsAvailable = floor(playerBuildingsProd/3) + 1;
        refreshPlayerHand(playerHand);
        pickCard(playerHand, shuffleDeck);
        // diminuer le nombre de tour
        currentTurnAvailable--;
    }
}