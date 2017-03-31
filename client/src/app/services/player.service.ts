import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';

import { IPlayerConnect } from './../../../../common/interfaces/index';

import { Command } from './../../../../common/enums';

@Injectable()
class PlayerService {
    private _currentPlayer: IPlayerConnect;

    get currentPlayer () : IPlayerConnect {
        return this._currentPlayer;
    }

    set currentPlayer (player: IPlayerConnect) {
        this._currentPlayer = player;
    }

    constructor (private _socketService: SocketService) {
        this._socketService.registerMessage(Command.CONNECT_PLAYER);
    }

    connectPlayer (data : IPlayerConnect) {
        this._socketService.emitMessage(Command.CONNECT_PLAYER, data);
    }

    connectPlayerSuccess () {
        return this._socketService.createMessageObservable(Command.CONNECT_PLAYER);
    }
}

export { PlayerService }