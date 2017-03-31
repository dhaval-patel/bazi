import { Base } from './base';
import { Move } from './move';
import { IHand } from './../../common/interfaces';

class Hand extends Base {
    private _moves: Move[] = [];

    constructor (_id: string) {
        super(_id);
    }

    set moves (moves: Move[]) {
        this._moves.length = 0;
        this._moves.push(...moves);
    }

    serialize (): IHand {
        return {
            id: this.id,
            moves: this._moves.map(move => move.serialize())
        }
    }

    addMove (move: Move): Hand {
        this._moves.push(move);
        return this;
    }
}

export { Hand }