import { Base } from './base';
import { Card } from './card';
import { Player } from './player';

import { IMove } from './../../common/interfaces'; 

class Move extends Base {
    constructor (_id: string, private _player: Player, private _card: Card) {
        super(_id);
    }

    serialize (): IMove {
        return {
            id: this.id,
            player: this._player.serialize(),
            card: this._card.serialize()
        };
    }
}

export { Move }