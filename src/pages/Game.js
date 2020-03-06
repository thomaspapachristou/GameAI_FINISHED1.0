import React, { Component } from 'react';
import '../game.css'
import BackToMenu from '../components/BackToMenu'
import DisplayScore from '../components/DisplayScore'
import Music from '../components/Music'


export default class Game extends Component {
    componentDidMount() {
        // console.log(this.props.location.state.nbB, this.props.location.state.nbP)
        // console.log(this.props.location.state.hands)
    }
    constructor(props) {
        super(props);

        this.state = {
            numberPlayers: this.props.location.state.nbP,
            numberBot: this.props.location.state.nbB,
            handDealer: [],
            dealerCard: [],
            player1: this.props.location.state.hands[0] || "",
            player2: this.props.location.state.hands[1] || "",
            player3: this.props.location.state.hands[2] || "",
            player4: this.props.location.state.hands[3] || "",
            handP1: [],
            handP2: [],
            handP3: [],
            handP4: [],
            p1Score: 0,
            p2Score: 0,
            p3Score: 0,
            p4Score: 0,
            pot: [],
            currentPlayer: 0,
            resultComparison: [],
            winner: [],
            finalWinner: [],
            count: 0,
            gameStarted: false
        };
    }

    startGame = () => {
        // Générer Main 1
        let _handP1 = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }]
        // Générer Main 2
        let _handP2 = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }]
        // Générer Main 3
        let _handP3 = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }]
        // Générer Main 4
        let _handP4 = [{ value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }, { value: 11 }, { value: 12 }, { value: 13 }, { value: 14 }, { value: 15 }]

        let _dealer = [{ value: -5 }, { value: -4 }, { value: -3 }, { value: -2 }, { value: -1 }, { value: 1 }, { value: 2 }, { value: 3 }, { value: 4 }, { value: 5 }, { value: 6 }, { value: 7 }, { value: 8 }, { value: 9 }, { value: 10 }]
        // attribution des mains, on initie le début du tour des joueurs, on lance la partie
        this.setState({
            handDealer: _dealer,
            handP1: _handP1,
            handP2: _handP2,
            handP3: _handP3,
            handP4: _handP4,
            currentPlayer: 1,
            p1Score: 0,
            p2Score: 0,
            p3Score: 0,
            p4Score: 0,
            pot: [],
            resultComparison: [],
            winner: [],
            finalWinner: [],
            count: 0,
            gameStarted: true
        }, () => {
            // Le croupier tire sa carte
            this.dealerDrawCard();
        })

    }

    // Parti concernant le choix des IAs*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_


    // L'ia va jouer son tour, en paramètre on lui donne sa main
    iaPlays = (handParam) => {
        // on récupère la carte du croupier pour déterminer ce que l'IA va choisir
        let value = parseInt(this.state.dealerCard[0].value);
        // si la valeur est infèrieure à 0, on ajoute +5 pour correspondre aux indices du tableau contenant la main de l'IA
        if (value < 0) {
            value = value + 5;
        } // si la valeur est de 1 ou plus, il en est de même, car le croupier ne peut pas tirer de zéro
        else {
            value = value + 4;
        }
        // On récupère la main à analyser puis on la passe sous forme de tableau pour la traiter
        const hand = handParam;
        let handArray = hand.map(function (obj) {
            return obj.value;
        });
        // La valeur de la carte que l'IA choisi sera attribué à la variable x
        let x = parseInt(this.checkValue(value, handArray, hand));
        this.arrayToState(handArray, x, hand);
        // Quand le dernier joueur à joué 
        let nextPlayer;

        // on récupère le tableau de comparaison, puis on y ajoute la valeur du bot
        const tab = this.state.resultComparison;
        tab.push(x);

        // Si tout les joueurs ont joué
        if (this.state.currentPlayer === (this.state.numberPlayers + this.state.numberBot)) {

            nextPlayer = 0;
            // On compare les scores
            this.compareHands()


            if (this.state.count === 14) {
                this.findFinalWinner();
            }
        } // On se prépare à passer au joueur suivant
        else {
            nextPlayer = this.state.currentPlayer + 1;
        }
        // On passe la main au joueur suivant
        this.setState({ currentPlayer: nextPlayer });
    }

    // attribution de la main modifiée (à laquelle une valeur choisie par l'IA a été retiré)
    arrayToState = (array, indexRemoved, hand) => {
        const arrayToChange = array;
        // storage sera la main du joueur modifiée
        let storage = [];
        // add contiendra la première valeur de la main, puis sera ajouté au storage
        let add = [];
        // la valeur choisi par l'IA correspondante dans la main sera remplacé par : ""
        arrayToChange[indexRemoved - 1] = '';
        while (arrayToChange.length > 0) {
            // on récupère la valeur du premier élément de la main
            add = { value: arrayToChange.shift() };
            // on ajoute la valeur de la main au tableau "storage"
            storage.push(add);
        }
        // on affecte storage (la nouvelle main) à la main du IA
        switch (hand) {
            case this.state.handP1:
                this.setState({ handP1: storage });
                break;
            case this.state.handP2:
                this.setState({ handP2: storage });
                break;
            case this.state.handP3:
                this.setState({ handP3: storage });
                break;
            case this.state.handP4:
                this.setState({ handP4: storage });
                break;
            default: console.log("Something is wrong")
        }
    }

    // détermine le choix de l'IA
    checkValue = (index, tab, hand) => {
        // On récupère l'indice correspondant à la valeur de la carte du croupier
        // on affecte cette valeur à "equal" pour quel l'ia  choisisse
        // on récupère également les deux valeurs entourant cet indice (i-1 et i+1)
        let equal = tab[index];
        let minus = tab[index - 1];
        let plus = tab[index + 1];
        // Vérification de la présence de i+i et i-1 dans le tableau pour déterminer les probabilités de l'IA
        // On regarde si les valeurs minus, equal et plus sont des nombres, et on donne au bot des paramètres
        // de selection en fonction de la présence ou non de ces nombres

        // vérification de la présence de i-1
        switch (typeof minus) {
            case ("number"):
                // vérification de i
                switch (typeof equal) {
                    case ("number"):
                        // vérification de i+1
                        switch (typeof plus) {
                            case ("number"):
                                // Les 3 valeurs sont présentes, le bot choisit minus avec une probabilité de 25% 
                                // equal avec une probabilité de 50% 
                                // plus avec une probabilité de 25% 
                                return this.pickChoice(equal, 25, 50, 25, minus, plus);
                            default:
                                // Les valeurs i-1 et i sont présente mais pas i+1
                                // la probabilité de choisir i-1 est de 35%, celle de choisir i est de 65%
                                console.log("+ + -");
                                return this.pickChoice(equal, 35, 65, 0, minus, plus);
                        }
                    default:
                        switch (typeof plus) {
                            case ("number"):
                                // i-1 et i+1 présents, i pas présent 
                                // 50% de choisir i-1, 50% de choisir i+1
                                console.log("+ - +")
                                return this.pickChoice(equal, 50, 0, 50, minus, plus);
                            default:
                                // seul i-1 présent : 100% de choisir i-1
                                console.log("+ - -")
                                return minus;
                        }
                }
            default:
                switch (typeof equal) {
                    case ("number"):
                        switch (typeof plus) {
                            case ("number"):
                                // Les valeurs i et i+1 sont présente mais pas i-1
                                // la probabilité de choisir i+1 est de 35%, celle de choisir i est de 65%
                                console.log("- + +")
                                return this.pickChoice(equal, 0, 65, 35, minus, plus);
                            default:
                                // seul i présent : 100% de choisir i
                                console.log("- + -")
                                return equal;
                        }
                    default:
                        switch (typeof plus) {
                            case ("number"):
                                // seul i+1 présent : 100% de choisir i+1
                                console.log("- - +")
                                return plus;
                            default:
                                // aucune des valeurs n'est présente : l'IA choisit une carte aléatoire dans sa main
                                console.log("- - -")
                                return this.randomPick(hand);
                        }
                }
        }
    }
    // number 50 0 50 undefined number
    // Déterminer quelle carte choisir
    pickChoice = (equal, a, b, c, minus, plus) => {
        // on choisit un nombre aléatoire entre 0+ et 100
        let x = Math.random() * 100;
        let param = equal;
        // Si equal et plus ne sont pas définies : minus devient le paramètre à choisir
        if (typeof equal !== "number" && typeof plus !== "number") {
            param = minus;
        } // si equal et minus ne sont pas définies : plus devient le paramètre à choisir 
        else if (typeof equal !== "number" && typeof minus !== "number") {
            param = plus;
        } else if (typeof equal !== 'number' && typeof minus === "number" && typeof plus === "number") {
            param = minus + 1;
        } // sinon, equal reste le paramètre de base à évaluer 
        else {
            param = equal
        };
        // si la valeur tirée aléatoirement est infèrieure à a : l'IA choisit cette valeur-1
        if (x < a) {
            return param - 1
        }   // si la valeur tirée aléatoirement est infèrieure à (a+b) : l'IA choisit cette valeur
        else if (x < (a + b)) {
            return param
        } // si la valeur tirée aléatoirement est supèrieure à a+b : l'IA choisit cette valeur+1
        else {
            return param + 1
        }
    }

    // choix d'une valeur aléatoire qui existe dans la main
    randomPick = (hand) => {
        // on créé une variable entre 1 et 16
        let rand = Math.floor(Math.random() * (16));
        // On vérifie que la valeur tirée aléatoirement est présente dans la main avec checkValue
        const checkValue = obj => obj.value === rand;
        // si la valeur générée aléatoirement n'existe pas (=== false ) => on recommence la manoeuvre
        if (hand.some(checkValue) === false) {
            rand = this.randomPick(hand);
        } // si la valeur générée aléatoirement existe, on la laisse tel quellle
        else { }
        return rand
    }

    // FIN DE LA PARTIE CONCERNANT LES IAS *_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_*_


    // Comparaison des valeurs des mains et déterminer qui est le vainqueur
    compareHands = () => {
        // on copie le tableau de comparaison des résultats qui contient les cartes des joueurs
        const tab = this.state.resultComparison;
        // on cherche la valeur maximum dans le tableau de comparaison
        const maximum = Math.max(...tab);
        // indice du vainqueur
        const maxIndicies = tab.reduce((result, value, index) => {
            // si il y a plusieurs vainqueurs, on prépare l'égalité
            if (value === maximum) {
                result.push(index);
            }
            // si il y a un vainqueur, on retourne son indice
            return result;
        }, []);
        // On vide le tableau de comparaison des résultats, on met à jour le vainqueur, puis on ajoute la valeur du croupier au score total du vainqueur
        this.setState({ resultComparison: [], winner: maxIndicies }, () => { this.addScore() });
        this.setState({ count: this.state.count + 1 }, () => console.log("count= " + this.state.count));

    }


    // Action effectué quand on clique sur une carte
    playCard = (cardNumber, player, isBot, hand) => {
        // si le joueur actif est une IA, on lance la fonction déterminant son choix
        if (isBot === true) {
            this.iaPlays(hand)
        } // si le joueur actif n'est pas une IA : 
        else {
            // Ajout de la valeur de la carte cliquée au tableau de comparaison
            const add = this.state.resultComparison;
            Array.prototype.push.apply(add, [cardNumber]);
            this.setState({ resultComparison: add });

            // err
            if (player !== this.state.currentPlayer) {
                return 'error';
            }

            let nextPlayer;
            // Quand le dernier joueur à joué on donne la main au premier joueur, on compare les scores 
            if (this.state.currentPlayer === (this.state.numberPlayers + this.state.numberBot)) {
                nextPlayer = 0;
                this.compareHands();

                // Quand le croupier a tiré toute ses cartes, cela veut dire que la partie se termine, il faut trouver le gagnant
                if (this.state.count === 14) {
                    this.findFinalWinner();
                }
            } else {
                nextPlayer = this.state.currentPlayer + 1;
            }
            // on met à jour le joueur actif, puis on supprime la carte
            this.setState({ currentPlayer: nextPlayer });
            this.deleteCard(player, cardNumber);
        }
    }

    // Compte les scores des joueurs.
    addScore = () => {
        // récupère les valeurs du pot à gain et de la carte à gagner
        const newPot = this.state.pot;
        const cardToPot = this.state.dealerCard;
        // si plusieurs gagnant => on ajoute la valeur de la carte au pot
        // puis le croupier tire une nouvelle carte
        if (this.state.winner.length !== 1) {
            Array.prototype.push.apply(newPot, cardToPot);
            this.setState({ pot: newPot }, () => { console.log(this.state.pot) });
        } // si un seul gagnant, il remporte la carte, dont la valeur vient s'ajouter à son score
        else {
            // récupérer indice du joueur gagnant 
            const winnerIndice = parseInt(this.state.winner, 10);
            // ajout de la carte à gagner au pot
            Array.prototype.push.apply(newPot, cardToPot);
            this.setState({ pot: newPot }, () => { console.log(this.state.pot) });
            // Somme des gains à gagner dans le pot
            var sumPot = newPot.reduce(function (prev, cur) {
                return prev + cur.value;
            }, 0);

            // Ajout des gains aux vainqueurs
            switch (winnerIndice) {
                case 0:
                    var newScoreP1 = this.state.p1Score;
                    newScoreP1 = newScoreP1 + sumPot;
                    this.setState({ p1Score: newScoreP1 }, () => { console.log("score p1 : " + this.state.p1Score) });
                    break
                case 1:
                    var newScoreP2 = this.state.p2Score;
                    newScoreP2 = newScoreP2 + sumPot;
                    this.setState({ p2Score: newScoreP2 }, () => { console.log("score p2 : " + this.state.p2Score) });
                    break
                case 2:
                    var newScoreP3 = this.state.p3Score;
                    newScoreP3 = newScoreP3 + sumPot;
                    this.setState({ p3Score: newScoreP3 }, () => { console.log("score p3 : " + this.state.p3Score) });
                    break
                case 3:
                    var newScoreP4 = this.state.p4Score;
                    newScoreP4 = newScoreP4 + sumPot;
                    this.setState({ p4Score: newScoreP4 }, () => { console.log("score p4 : " + this.state.p4Score) });
                    break
                default:
                    console.log("erreur")
            }
            // on vide le pot
            this.setState({ pot: [] });
        }
        // le croupier tire la prochaine carte
        this.dealerDrawCard();
    }

    // Déterminer le vainqueur de la partie
    findFinalWinner = () => {
        let _score1 = this.state.p1Score;
        let _score2 = this.state.p2Score;
        let _score3 = this.state.p3Score;
        let _score4 = this.state.p4Score;
        let tabCompare = [];
        tabCompare.push(_score1);
        tabCompare.push(_score2);
        tabCompare.push(_score3);
        tabCompare.push(_score4);
        // on cherche la valeur maximal du tableau
        const maximum = Math.max(...tabCompare);
        // on récupère l'indice du gagnant
        const maxIndicies = tabCompare.reduce((result, value, index) => {
            // si il y a plusieurs vainqueurs, on prépare l'égalité
            if (value === maximum) {
                result.push(index);
            }
            // si il y a un vainqueur, on retourne son indice
            return result;
        }, []);
        console.log(maxIndicies)
        this.setState({ finalWinner: maxIndicies })
    }

    // Affichage conditionnel de la main
    displayHandOrNot = (cardValue, player, isBot) => {
        // Vérifier qui est le joueur actif
        // Si le joueur actif n'est pas une IA, le recto des cartes sera affiché
        if (player === this.state.currentPlayer && isBot === false) {
            return cardValue;
        }
        // si le joueur actif EST une IA, le verso de la carte sera affiché
        else if (typeof cardValue === "number") {
            return ""
        } // si le joueur actif est une IA et que l'un de ses carte est manquante, on n'affiche pas cette carte
        else {
            return ""
        }
    }

    // AFFICHER VAINQUEUR
    displayWinner = () => {
        // si il y a plusieurs vainqueurs : égalité
        if (this.state.winner.length !== 1) {
            return "Egalité !"
        } // si un seul vainqueur : on récupère son identité, puis on affiche sa victoire
        else {
            var result = parseInt(this.state.winner, 10);
            result = result + 1;
            return 'Player ' + result + ' wins !'
        }
    }
    // FINAL WINNER
    displayFinalWinner = () => {
        console.log(this.state.finalWinner)
        if (this.state.finalWinner.length !== 1) {
            return "Matchs nul! Egalité entre plusieurs joueurs."
        } // si un seul vainqueur : on récupère son identité, puis on affiche sa victoire
        else {
            var result = parseInt(this.state.finalWinner, 10);
            result = result + 1;
            return 'Player ' + result + ' wins the game! Congratulations!'
        }
    }

    // supprime la valeur de la carte sur laquelle on clique
    deleteCard = (currentPlayer, cardNumber) => {
        // on initie le _deck
        let _deck;
        // on regarde qui est le joueur actuel, puis on lui attribue son deck
        switch (currentPlayer) {
            case 1:
                _deck = this.state.handP1;
                break;
            case 2:
                _deck = this.state.handP2;
                break;
            case 3:
                _deck = this.state.handP3;
                break;
            case 4:
                _deck = this.state.handP4;
                break;
            default:
                _deck = [];
        }

        // on créé une variable qui va retirer la carte sur laquelle on clique
        let newDeck = _deck.filter((card) => {
            return card.value !== cardNumber;
        })
        // on remplace l'ancienne main par la nouvelle, à laquelle on a retiré la carte choisi
        switch (currentPlayer) {
            case 1:
                this.setState({ handP1: newDeck })
                break;

            case 2:
                this.setState({ handP2: newDeck })
                break;

            case 3:
                this.setState({ handP3: newDeck })
                break;
            case 4:
                this.setState({ handP4: newDeck })
                break;
            default:
        }
    }

    // Nombre random + retirer nombre random de handDealer + ajouter nombre random to dealercard + stocker valeurs si égalité 
    dealerDrawCard = () => {
        const updatedDealer = this.state.handDealer;
        // choisir un nombre entre -5 et 15
        var dealerValue = Math.floor(Math.random() * (10 - (-5) + 1) - 5);

        // vérifier si la carte généré est encore dans le paquet du croupier
        const index = updatedDealer.findIndex(e => e.value === dealerValue);

        // Si la carte généré n'est pas dans le paquet de carte, on recommence
        if (index === undefined) {
            this.dealerDrawCard();
        }

        // On retire la carte du paquet du croupier
        const card = updatedDealer.splice(index, 1);

        // On met à jour notre state : le paquet du croupier devient l'ancien paquet moins la carte généré, la main devient la carte générée
        this.setState({
            handDealer: updatedDealer,
            dealerCard: card
        })
    }

    render() {
        const _player1 = this.state.player1;
        const _player2 = this.state.player2;
        const _player3 = this.state.player3;
        const _player4 = this.state.player4;
        const _hand1 = this.state.handP1;
        const _hand2 = this.state.handP2;
        const _hand3 = this.state.handP3;
        const _hand4 = this.state.handP4;
        const _gameStarted = this.state.gameStarted;
        const _currentPlayer = this.state.currentPlayer;
        const _result = this.state.resultComparison;
        return (
            <div className="game">
                
                <Music url='https://www.youtube.com/embed/VmkSRC-i3AU' />
                {/* affichage des scores */}
                <DisplayScore
                    player1={this.state.p1Score}
                    player2={this.state.p2Score}
                    player3={this.state.p3Score}
                    player4={this.state.p4Score}
                    nbPlaces={this.state.numberPlayers + this.state.numberBot}
                />

                {/* affichage  du bouton pour commencer la partie */}
                {_gameStarted === false ? <div className='start_game' onClick={this.startGame}>Start game</div> : null}

                {/* main du croupier */}
                {_gameStarted === true && _currentPlayer !== 0 ?
                    <div>
                        {this.state.dealerCard.map((card) => {
                            return ((card.value <= 0 ?
                                // valeur du croupier négative
                                <div className="cardMinus card"><div>{card.value}</div></div>
                                :
                                // valeur du croupier positive
                                <div className="cardPlus card"><div>{card.value}</div></div>))
                        })}
                    </div>
                    : null}

                {/* Affichage des cartes jouées */}
                {_currentPlayer !== 0 ?
                    <div className="board">
                        <div className="card" style={{ backgroundImage: "url('" + (typeof _result[0] !== "number" ? "" : _player1.char) + "')" }}>{_result[0]}</div>
                        <div className="card" style={{ backgroundImage: "url('" + (typeof _result[1] !== "number" ? "" : _player2.char) + "')" }}>{_result[1]}</div>
                        <div className="card" style={{ backgroundImage: "url('" + (typeof _result[2] !== "number" ? "" : _player3.char) + "')" }}>{_result[2]}</div>
                        <div className="card" style={{ backgroundImage: "url('" + (typeof _result[3] !== "number" ? "" : _player4.char) + "')" }}>{_result[3]}</div>
                    </div>
                    : null}

                {/* Affichage du vainqueur du round */}
                {_currentPlayer === 0 && _gameStarted === true && this.state.count !== 15 ?
                    <div className='display_winner' onClick={() => this.setState({ currentPlayer: 1 })}>
                        {this.displayWinner()} <br /><p>Next Round</p>
                    </div> : null}

                {/* Affichage du vainqueur de la partie */}
                {this.state.count === 15 && _gameStarted === true ?
                    <div className='display_winner'>
                        {this.displayFinalWinner()} <br /><p onClick={() => { this.setState({ gameStarted: false }) }}>Start again ?</p>
                    </div> : null}

                {/* affichage des mains de chaque joueur 
                Les cartes des IAs seront retournées*/}
                {_currentPlayer === 1 ?
                    <div className="player">
                        <div className='avatar' style={{ backgroundImage: "url('" + _player1.avatar + "')" }}></div>
                        <div className="hand">
                            {_hand1.map((card) => {
                                return (
                                    // si la valeur de la carte est : "", on ne l'affiche pas 
                                    (card.value !== "" ?
                                        <div className='card' style={{ backgroundImage: "url('" + (_player1.isBot === true ? _player1.verso : _player1.char) + "')" }} onClick={() => this.playCard(card.value, 1, _player1.isBot, _hand1)}>
                                            {this.displayHandOrNot(card.value, 1, _player1.isBot)}
                                        </div> : null)
                                )
                            })}
                        </div>
                    </div> : null}


                {_currentPlayer === 2 ?
                    <div className="player">
                        <div className='avatar' style={{ backgroundImage: "url('" + _player2.avatar + "')" }}></div>
                        <div className="hand">

                            {_hand2.map((card) => {
                                return (
                                    (card.value !== "" ?
                                        <div className='card' style={{ backgroundImage: "url('" + (_player2.isBot === true ? _player2.verso : _player2.char) + "')" }} onClick={() => this.playCard(card.value, 2, _player2.isBot, _hand2)}>
                                            {this.displayHandOrNot(card.value, 2, _player2.isBot)}
                                        </div> : null)
                                )
                            })}
                        </div>
                    </div> : null}


                {_currentPlayer === 3 ?
                    <div className="player">
                        <div className='avatar' style={{ backgroundImage: "url('" + _player3.avatar + "')" }}></div>
                        <div className="hand">

                            {_hand3.map((card) => {
                                return (
                                    (card.value !== "" ?
                                        <div className='card' style={{ backgroundImage: "url('" + (_player3.isBot === true ? _player3.verso : _player3.char) + "')" }} onClick={() => this.playCard(card.value, 3, _player3.isBot, _hand3)}>
                                            {this.displayHandOrNot(card.value, 3, _player3.isBot)}
                                        </div> : null)
                                )
                            })}
                        </div>
                    </div> : null}


                {_currentPlayer === 4 ?
                    <div className="player">
                        <div className='avatar' style={{ backgroundImage: "url('" + _player4.avatar + "')" }}></div>
                        <div className="hand">
                            {_hand4.map((card) => {
                                return (
                                    (card.value !== "" ?
                                        <div className='card' style={{ backgroundImage: "url('" + (_player4.isBot === true ? _player4.verso : _player4.char) + "')" }} onClick={() => this.playCard(card.value, 4, _player4.isBot, _hand4)}>
                                            {this.displayHandOrNot(card.value, 4, _player4.isBot)}
                                        </div> : null)
                                )
                            })}
                        </div>
                    </div> : null}


                {/* Bouton retour vers menu principal */}
                <BackToMenu />

            </div>
        );
    }
}