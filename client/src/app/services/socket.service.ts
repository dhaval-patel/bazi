/// <reference path="../../../typings/globals/socket.io-client/index.d.ts" />

import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';

class SocketService {
    private _host: string = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;
    private _socket: SocketIOClient.Socket;
    private _messageObserversMap: { [ message: string ]: any[] } = {};

    constructor () {
        this._socket = io.connect(this._host + '/');
    }

    emitMessage (message: string, data: any): SocketService {
        this._socket.emit(message, data);
        return this;
    }

    registerMessage(message: string) : SocketService {
        this._socket.on(message, (data) => {
            this._messageObserversMap[message].forEach(observer => {
                observer.next(data);
            });
        });

        return this;
    }

    createMessageObservable (message) : Observable<any> {
        let observable = new Observable(observer => {
            let map = this._messageObserversMap[message];

            if (!map) {
                map = this._messageObserversMap[message] = [];
            }

            map.push(observer);

            return () => {
                map.splice(map.indexOf(observable), 1);
            };
        });

        return observable;
    }
}

export { SocketService };