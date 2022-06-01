# Magiclike
magiclike, un jeu comme magic, mais en un joueur













# Principe :

Ce jeu serait un jeu de cartes à la TCG en plus modeste bien sûr, la particularité de celui-ci serait que, comparé à beaucoup d’autres où plusieurs joueurs sont requis, ici le jeu est conçu pour un seul joueur.

Ce jeu ressemblerait à ce qu’on pourrait trouver dans Magic The Gathering, des cartes de terrains, des cartes de sorts, de créatures. A l’exception que contrairement à Magic qui s’inspire beaucoup de mythes et légendes dans différentes cultures (On peut y retrouver des références à la culture Nippon, la mythologie nordique, ou encore des comptes occidentaux comme Robin des Bois), ici le Lore du jeu se basera sur des évènements Historique (d’où le nom).

Le joueur incarne un dirigeant à terme il est prévu que chacun d’entre eux aient des particularités (semblables aux héros dans Hearthstone), Les cartes de terrains de Magic (qui permettent de générer du mana d’une couleur spécifique) serait remplacés par des cartes de Bâtiments, qui génère des “ressources”, équivalent du mana dans différents TCG. Toujours contrairement à Magic où les decks ne sont rarement à + de 2 couleurs là les bâtiments devraient être plus variés. Effectivement imaginons une ressource “eau”, une “diplomatie”, une “nourriture”, on voit mal un gouvernement ne pas apporter de nourriture ou d’eau à son peuple, cependant un deck est totalement libre de comporter autant de chacune des ressources, même s’il est déconseillé d’avoir trop de déséquilibre.

L'équivalent des sorts sont appelés doctrines, elles ont un effet immédiat, ces cartes ne restent pas sur le plateau, elles n'ont donc pas d'emplacement prévu pour ça.

Les créatures sont appelés “Députés”, ils peuvent avoir des effets statiques comme “x2 de production”, un cout de nourritures par tour, s'il n’a pas assez il disparait, et quand ils arrivent sur le champs de bataille, ils donnent un certains nombre de tours en plus

Venons-en au plus important, le jeu est un TCG 1 joueurs, mais comment est-ce possible ?

Le joueur incarne un dirigeant d’un pays, celui-ci a donc des projets, son “programme” qui est représenté par son Deck, s’il arrive à appliquer toutes ses mesures (c'est à dire jouer toutes ses cartes) le dirigeant a donc fini son programme et a gagné, Le but du joueur est donc de vider son deck contrairement aux autres TCG ou vider son deck est souvent synonyme de partie perdu.

Quels sont alors les obstacles rencontrés par le joueur ?

Premièrement, il est limité en temps, il n’a qu’un nombre limité de tours pour accomplir son programme, il peut bien sur soit choisir de rusher et vider son deck le plus vite, ou alors utiliser des cartes qui lui allonge son nombre de tours.

En tant qu’obstacle il y peut y avoir aussi des événements aléatoires pour éviter des parties trop redondantes et permettre des rebondissements, on peut imaginer une manifestation, qui désactive certains terrains pendant quelques tours, des révoltes qui baissent le nombre de tours disponible etc, mais cela n'est pas encore implémenter, nous avons préféré nous concentrer sur l'essentiel du jeu.


# Comment le lancer :

Il faut importer la base de données compris dans le fichier BDD sur un serveur mysql, sous le nom de "hystoric", ensuite lancer Apache sur le directory du jeu, choisir le deck, et commencer à jouer















# Gameplay :

Le joueur a un deck composé de cartes, environ 20 sont des bâtiments, le reste dépendra du type de decks.

Il y a 3 Types de Bâtiments et donc de ressources :

Les Fermes, représentant l’accès à l’eau potable et la nourriture, celle-ci serait plutôt utilisé pour les cartes de Députés.

Les Usines, représentant la productivité du pays, l’accès à l’emploi, permettant plutôt la possibilité de poser + de bâtiments par tour.

Les Mairies, représentant la diplomatie, plutôt utilisé pour lancer des doctrines, et réduisant les événements aléatoires.

Si vous avez trop de cartes dans votre main ( < 7) en fin de tour vous allez devoir enlever des cartes de votre main et vous perderez autant de tour que de cartes.



Détail technique :

JS ou Python -> **JS**

Interface graphique -> **CSS, HTML, etc**

Git ou OneDrive -> **Git**

À répartir :

- Code (Adrien)

- Interface Graphique (Victor)

- BDD (Lony)

GitMaster = Adrien

**Le jeu sera donc codé pour WEB**
