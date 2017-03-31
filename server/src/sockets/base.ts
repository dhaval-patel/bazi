/// <reference path="../../typings/index.d.ts" />

import SocketIO  = require('socket.io');

class BaseSocket {
    constructor(private _socket: SocketIO.Socket) {

    }

    get socket() : SocketIO.Socket {
        return this._socket;
    }
        
    get playerId(): string {
        return (<any>this._socket).playerId;
    }

    set playerId (playerId: string) {
        (<any>this._socket).playerId = playerId;
    }

    set activeGameId (gameId: string) {
        (<any>this._socket).activeGameId = gameId;
    }

    get activeGameId (): string {
        return (<any>this._socket).activeGameId;
    }

    public onDisconnect() : BaseSocket {
        return this;
    }

    public emitMessage (message, data: any): BaseSocket {
        this.socket.emit(message, data);
        return this;
    }
}

export { BaseSocket };