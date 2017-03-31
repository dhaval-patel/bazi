import { Server } from "http";
import SocketIO  = require('socket.io');
import { BaseSocket } from './base';
import { PlayerSocket } from './player';
import { Command } from './../../../common/enums';
import { GameSocket } from './game';

class Socket {
    socketServer : SocketIO.Server;
    socketMap: { [socketId: string]: BaseSocket[] } = {};

    constructor(private server: Server) {
        this.socketServer = SocketIO(this.server);

        this.socketServer
            .on(Command.CONNECTION, this.onConnection.bind(this));
    }

    onConnection(socket: SocketIO.Socket): void {
        console.log('Got a connection :: ', socket.id);

        socket.on(Command.DISCONNECT, () => {
            this.onDisconnect(socket);
        });

        this.registerSocketCommands(socket);
    }
    
    onDisconnect(socket: SocketIO.Socket): void {
        console.log('Got Disconnection', socket.id);

        var sockets = this.socketMap[socket.id];
        
        if (sockets) {
            sockets.forEach(socket => {
                socket.onDisconnect();
            });
        }

        delete this.socketMap[socket.id];
    }

    registerSocketCommands(socket: SocketIO.Socket): void {
        var playerSocket = new PlayerSocket(socket);
        var gameSocket = new GameSocket(socket);

        this.socketMap[socket.id] = [playerSocket, gameSocket];
    }
}

export { Socket }