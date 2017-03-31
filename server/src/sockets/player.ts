import SocketIO  = require('socket.io');

import { BaseSocket } from './base';
import { Command } from './../../../common/enums';

import { IPlayerConnect } from './../../../common/interfaces';

class PlayerSocket extends BaseSocket {
    static Players: {[playerId: string]: PlayerSocket} = {};

    constructor (_socket : SocketIO.Socket) {
        super(_socket);

        this.socket.on(Command.CONNECT_PLAYER, this.onPlayerConnect.bind(this));
    }

    private onPlayerConnect(data : IPlayerConnect): void {
        data.id = this.playerId = Date.now().toString();
        this.socket.emit(Command.CONNECT_PLAYER, data);

        PlayerSocket.Players[this.playerId] = this;
    }

    public onDisconnect() : PlayerSocket {
        super.onDisconnect();
        delete PlayerSocket.Players[this.playerId];
        return this;
    }

    static getPlayerSocketFromId(playerId: string) {
        return PlayerSocket.Players[playerId];
    }

    static broadcastMessage (message: string, data): void {
        Object.keys(PlayerSocket.Players).forEach(playerId => {
            var playerSocket = PlayerSocket.Players[playerId];
            playerSocket.emitMessage(message, data);
        });
    }
}

export { PlayerSocket };