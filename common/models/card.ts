import { Base } from './base';
import { Suit } from './../enums';

import { ICard } from './../../common/interfaces';


class Card extends Base  {
    constructor (   _id: string, 
                    private _suit: Suit, 
                    private _rank: string, 
                    private _weight: number,
                    private _played: boolean = false ) {
        super(_id);
    }

    get suit (): Suit {
        return this._suit;
    }

    get rank (): string {
        return this._rank;
    }

    get weight (): number {
        return this._weight;
    }

    set played (played: boolean) {
        this._played = played;
    }

    serialize (): ICard {
        return {
            id: this.id,
            suit: this._suit,
            rank: this._rank,
            weight: this._weight,
            played: this._played
        };
    }
}

export { Card, Suit }