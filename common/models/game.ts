import { Base } from './base';
import { GameType, Suit } from './../enums';
import { Player } from './player';
import { Hand } from './hand';
import { Move } from './move';
import { Card } from './card';
import { Deck } from './../enums';

import { ICreateGame, IGame, IPlayer, IHand, ICard } from './../interfaces';

class Game extends Base {
    private _players: Player[] = [];
    private _hands: Hand[] = [];
    private _started: boolean = false;
    private _cards: Card[] = [];

    constructor(_id: string, private _type: GameType, private _name: string) {
        super(_id);
    }

    get name (): string {
        return this._name;
    }

    get players(): Player[] {
        return this._players;
    }

    get type(): GameType {
        return this._type;
    }

    set players (players: Player[]) {
        this.players.length = 0;
        this.players.push(...players);
    }

    get cards() : Card[] {
        return this._cards;
    }

    set cards (cards: Card[]) {
        this._cards.length = 0;
        this._cards.push(...cards);
    }

    serialize () : IGame {
        return {
            id: this.id,
            name: this.name,
            type: this.type
        };
    }

    serializePlayers (): IPlayer[] {
        return this._players.map(player => player.serialize());
    }

    serializeHands (): IHand[] {
        return this._hands.map(hand => hand.serialize());
    }

    serializeCards () : ICard[] {
        return this._cards.map(card => card.serialize());
    }

    addPlayer(player: Player): Game {
        this._players.push(player);
        return this;
    }

    removePlayer(player: Player): Game {
        var index = this._players.indexOf(player);

        if (index !== -1) {
            this._players.splice(index, 1);
        }

        return this;
    }

    removePlayerById(playerId: string): Game {
        let player = this._players.filter(i => i.id === playerId)[0];
        
        if (player) {
            return this.removePlayer(player);
        } else {
            return this;
        }
    }

    getPlayerById(playerId: string): Player {
        return this._players.filter(i => i.id === playerId)[0];
    }

    addHands(hand: Hand): Game {
        this._hands.push(hand);
        return this;
    }

    startGame (): Game {
        this._started = true;
        this.createCards();
        this.distributeCards();
        return this;
    }

    endGame (): Game {
        this._started = false;
        return this;
    }
    
    addHand (hand: Hand): Game {
        this._hands.push(hand);
        return this;
    }

    addMove (move: Move): Game {
        this._hands[this._hands.length - 1].addMove(move);
        return this;
    }

    getLatestHand (): Hand {
        return this._hands[this._hands.length - 1];
    }

    getCardById (cardId: string): Card {
        return this._cards.filter(card => card.id === cardId)[0];
    }

    private distributeCards() {
        let config = GameType.getConfig(this.type);
        let noOfCardsPerplayer = 52 / config.noOfPlayers;

        for (let i = 0; i < 13; i++) {
            this._players[0].addCard(this._cards[i*config.noOfPlayers]);
            this._players[1].addCard(this._cards[i*config.noOfPlayers + 1]);
        //     this._players[2].addCard(this._cards[i*4 + 2]);
        //     this._players[3].addCard(this._cards[i*4 + 3]);
        }         
    }

    private createCards(): Game {
        this._cards
            .push(
                ...Deck.Cards
                    .map(card => new Card(Date.now().toString(), card.suit, card.rank, card.weight)
                )
            );
        
        return this;
    }
}

export { Game }