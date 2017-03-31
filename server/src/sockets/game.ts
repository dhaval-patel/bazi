import SocketIO  = require('socket.io');
import { 
    ICreateGame, 
    IJoinGame, 
    ILeaveGame, 
    IStartGame, 
    IEndGame, 
    IHandStart, 
    IPlayMove, 
    IHandEnd, 
    IPlayerConnect, 
    IGame,
    IGetCard,
    IHand
} from './../../../common/interfaces';
import { BaseSocket } from './base';
import { PlayerSocket } from './player';
import { Command } from './../../../common/enums';
import { Game, Player, Hand, Move, Card } from './../../../common/models';

class GameSocket extends BaseSocket {
    static Games: { [id: string]: Game } = {};

    constructor (_socket : SocketIO.Socket) {
        super(_socket);

        this.socket
            .on(Command.CREATE_GAME, this.onCreate.bind(this))
            .on(Command.JOIN_GAME, this.onJoin.bind(this))
            .on(Command.LEAVE_GAME, this.onLeave.bind(this))
            .on(Command.START_GAME, this.onStart.bind(this))
            .on(Command.END_GAME, this.onEnd.bind(this))
            .on(Command.START_HAND_GAME, this.onHandStart.bind(this))
            .on(Command.PLAY_MOVE_GAME, this.onPlayMove.bind(this))
            .on(Command.END_HAND_GAME, this.onHandEnd.bind(this))
            .on(Command.GET_LIST_GAME, this.onGetGames.bind(this))
            .on(Command.GET_LIST_PLAYER_GAME, this.onGetGamePlayers.bind(this))
            .on(Command.GET_GAME, this.onGetGame.bind(this))
            .on(Command.GET_LIST_CARD_PLAYER_GAME, this.onGetCardsPlayerGame.bind(this))
            .on(Command.GET_LIST_HAND_GAME, this.onGetHandsGame.bind(this))
            .on(Command.GET_LIST_CARD_GAME, this.onGetCardsGame.bind(this));
    }

    private onCreate (data: ICreateGame): void {
        data.id = Date.now().toString();
        let game = new Game(data.id, data.type, data.name);
        GameSocket.Games[game.id] = game;

        this.emitMessage(Command.CREATE_GAME, data);

        GameSocket.broadcastGameList();
    }

    private onJoin (data: IJoinGame) : void {
        let player = new Player(data.playerId, data.playerName);

        let game = GameSocket.Games[data.gameId];

        if (game) {
            game.addPlayer(player);
            this.activeGameId = game.id;
            this.emitMessage(Command.JOIN_GAME, data);
            GameSocket.emitMessageToPlayers(game, Command.GET_LIST_PLAYER_GAME, game.serializePlayers());
        }
    }

    private onLeave (data: ILeaveGame): void {
        let game = GameSocket.Games[data.gameId];

        if (game) {
            game.removePlayerById(data.playerId);
            GameSocket.emitMessageToPlayers(game, Command.LEAVE_GAME, data); 
        }
    }

    private onStart  (data: IStartGame): void {
        let game = GameSocket.Games[data.gameId];

        if (game) {
            game.startGame();
            GameSocket.emitMessageToPlayers(game, Command.START_GAME, data);
        }
    }

    private onEnd (data: IEndGame): void {
        let game = GameSocket.Games[data.gameId];

        if (game) {
            game.endGame();
            GameSocket.emitMessageToPlayers(game, Command.END_GAME, data);
            delete GameSocket.Games[game.id];
        }
    }

    private onHandStart (data: IHandStart): void {
        let game = GameSocket.Games[data.gameId];

        if (game) {
            data.id = Date.now().toString();
            game.addHand(new Hand(data.id));

            GameSocket.emitMessageToPlayers(game, Command.START_HAND_GAME, data);
        }
    }

    private onPlayMove (data: IPlayMove): void {
        let game = GameSocket.Games[data.gameId];

        if (game) {
            data.id = Date.now().toString();
            let player = game.getPlayerById(data.playerId);
            let card = player.getCardById(data.cardId);
            game.addMove(new Move(data.id, player, card));

            let latestHand = game.getLatestHand()
            
            if (latestHand) {
                GameSocket.emitMessageToPlayers(game, Command.GET_LATEST_HAND_GAME, latestHand.serialize());
            }
        }
    }

    private onHandEnd (data: IHandEnd): void {
        let game = GameSocket.Games[data.gameId];

        if (game) {
            GameSocket.emitMessageToPlayers(game, Command.END_HAND_GAME, data);
        }
    }

    public onDisconnect() : GameSocket {
        super.onDisconnect();

        if (this.activeGameId && this.playerId) {
            let game = GameSocket.Games[this.activeGameId];
            game.removePlayerById(this.playerId);

            GameSocket.emitMessageToPlayers(game, Command.GET_LIST_PLAYER_GAME, game.serializePlayers());
        }

        return this;
    }

    private static emitMessageToPlayers(game: Game, message: string, data: any): void {
        game.players.forEach(player => {
            let playerSocket = PlayerSocket.getPlayerSocketFromId(player.id);
            
            if (playerSocket) {
                playerSocket.emitMessage(message, data);
            }
        });
    }

    private onGetGames(): void {
        let games = GameSocket.getListGames();
        this.socket.emit(Command.GET_LIST_GAME, games);
    }

    private static getListGames(): IGame[] {
        let games: IGame[] = [];

        Object.keys(GameSocket.Games).forEach(gameId => {
            let game = GameSocket.Games[gameId];
            games.push(game.serialize());
        });

        return games;
    }

    private static broadcastGameList(): void {
        let games = GameSocket.getListGames();
        PlayerSocket.broadcastMessage(Command.GET_LIST_GAME, games);
    }

    private onGetGamePlayers(data: IJoinGame) : void {
        let game = GameSocket.Games[data.gameId];
        
        if (game) {
            this.socket.emit(Command.GET_LIST_PLAYER_GAME, game.serializePlayers());
        }
    }

    private onGetGame (data: IGame) {
        let game = GameSocket.Games[data.id];

        if (game) {
            this.emitMessage(Command.GET_GAME, game.serialize());
        }
    }

    private onGetCardsPlayerGame (data: IGetCard) {
        let game = GameSocket.Games[data.gameId];
        let player = game.getPlayerById(data.playerId);
        this.emitMessage(Command.GET_LIST_CARD_PLAYER_GAME, player.serializeCards());
    }

    private onGetHandsGame (data: IGame) {
        let game = GameSocket.Games[data.id];
        this.emitMessage(Command.GET_LIST_HAND_GAME, game.serializeHands());
    }

    private onGetCardsGame (data: IGame) {
        let game = GameSocket.Games[data.id];
        this.emitMessage(Command.GET_LIST_CARD_GAME, game.serializeCards());
    }
}

export { GameSocket }