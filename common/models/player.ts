import { Base } from './base';
import { IPlayer, ICard } from './../interfaces';
import { Card } from './card';

class Player extends Base {
    private _cards: Card[] = [];
    constructor (_id: string, private _name: string) {
        super(_id);
    }

    get name (): string {
        return this._name;
    }

    set cards (cards: Card[]) {
        this._cards.length = 0;
        this._cards.push(...cards);
    }

    serialize (): IPlayer {
        return {
            id: this.id,
            name: this.name
        };
    }

    serializeCards (): ICard[] {
        return this._cards.map(card => { return { id: card.id, suit: card.suit, rank: card.rank, weight: card.weight, played: card.played }; });
    }

    addCard (card: Card): Player {
        this._cards.push(card);
        return this;
    }

    getCardById(cardId: string): Card {
        return this._cards.filter(i => i.id === cardId)[0];
    }   
}

export { Player };