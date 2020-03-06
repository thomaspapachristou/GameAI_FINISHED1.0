import React, { Component } from 'react';
// import './App.css';

export default class Test extends Component {
    constructor() {
        super();

        this.state = {
            handP1: [],
            handP2: [],
            handP3: [],
            currentPlayer: 0
        };
    }

    startGame = () => {
        // Générer Main 1
        let _handP1 = [{ value: 1 }, { value: 2 }, { value: 3 }]
        // Générer Main 2
        let _handP2 = [{ value: 1 }, { value: 2 }, { value: 3 }]
        // Générer Main 3
        let _handP3 = [{ value: 1 }, { value: 2 }, { value: 3 }]

        // SetState
        this.setState({
            handP1: _handP1,
            handP2: _handP2,
            handP3: _handP3,
            currentPlayer: 1
        })
        console.log(this.state);
    }

    displayHandOrNot = (cardValue, player) => {

        // Vérier si je joueur est le joueur actif

        if (player === this.state.currentPlayer) {
            return cardValue;
        } else {
            return "X"
        }
    }

    playCard = (cardNumber, player) => {

        if (player !== this.state.currentPlayer) {
            return;
        }

        let nextPlayer;

        if (this.state.currentPlayer === 3) {
            nextPlayer = 1;

        } else {
            nextPlayer = this.state.currentPlayer + 1;
        }
        this.setState({ currentPlayer: nextPlayer });

        //alert(cardNumber, player);

        this.deleteCard(player, cardNumber);
    }

    deleteCard = (currentPlayer, cardNumber) => {

        let _deck;
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
            default:
                _deck = [];
        }


        let newDeck = _deck.filter((card) => {
            return card.value !== cardNumber;
        })

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

            default:

        }

        console.log(newDeck);
    }


    render() {
        return (
            <div className="App">
                <button onClick={this.startGame}>Start game</button>

                <hr />
                <h2>Main du joueur 1</h2>
                {this.state.currentPlayer === 1 ? <p>A toi de jouer </p> : <p>Attend ton tour</p>}

                {
                    this.state.handP1.map((card) => {
                        return (
                            <button onClick={() => this.playCard(card.value, 1)}>
                                {this.displayHandOrNot(card.value, 1)}
                            </button>
                        )
                    })
                }


                <hr />
                <h2>Main du joueur 2</h2>
                {this.state.currentPlayer === 2 ? <p>A toi de jouer </p> : <p>Attend ton tour</p>}

                {
                    this.state.handP2.map((card) => {
                        return (
                            <button onClick={() => this.playCard(card.value, 2)}>
                                {this.displayHandOrNot(card.value, 2)}
                            </button>
                        )
                    })
                }

                <hr />
                <h2>Main du joueur 3</h2>
                {this.state.currentPlayer === 3 ? <p>A toi de jouer </p> : <p>Attend ton tour</p>}

                {
                    this.state.handP3.map((card) => {
                        return (
                            <button onClick={() => this.playCard(card.value, 3)}>
                                {this.displayHandOrNot(card.value, 3)}
                            </button>
                        )
                    })
                }

            </div>
        );
    }
}
// RAW Paste Data