import { Injectable } from '@angular/core';
import { SocketService } from './socket.service';
import { ICreateGame, IJoinGame, IGetCard, IPlayMove } from './../../../../common/interfaces';
import { Command } from './../../../../common/enums';

@Injectable()
class GameService {
    constructor (private _socketService: SocketService) {
        this._socketService
            .registerMessage(Command.CREATE_GAME)
            .registerMessage(Command.JOIN_GAME)
            .registerMessage(Command.GET_LIST_GAME)
            .registerMessage(Command.GET_LIST_PLAYER_GAME)
            .registerMessage(Command.GET_GAME)
            .registerMessage(Command.START_GAME)
            .registerMessage(Command.GET_LIST_CARD_PLAYER_GAME)
            .registerMessage(Command.GET_LATEST_HAND_GAME)
            .registerMessage(Command.GET_LIST_HAND_GAME)
            .registerMessage(Command.GET_LIST_CARD_GAME);
    }

    createGame (data: ICreateGame) {
        this._socketService.emitMessage(Command.CREATE_GAME, data);
    }

    createGameSuccess () {
        return this._socketService.createMessageObservable(Command.CREATE_GAME);
    }

    joinGame (data: IJoinGame) {
        this._socketService.emitMessage(Command.JOIN_GAME, data);
    }

    joinGameSuccess () {
        return this._socketService.createMessageObservable(Command.JOIN_GAME);
    }

    getGames () {
        this._socketService.emitMessage(Command.GET_LIST_GAME, {});
    }

    getGamesSuccess () {
        return this._socketService.createMessageObservable(Command.GET_LIST_GAME);
    }

    getPlayers (gameId: string): void {
        this._socketService.emitMessage(Command.GET_LIST_PLAYER_GAME, { gameId });
    }

    getPlayersSuccess () {
        return this._socketService.createMessageObservable(Command.GET_LIST_PLAYER_GAME);
    }

    getGame (gameId: string) {
        this._socketService.emitMessage(Command.GET_GAME, { id: gameId });
    }

    getGameSuccess () {
        return this._socketService.createMessageObservable(Command.GET_GAME);
    }

    startGame (gameId) {
        return this._socketService.emitMessage(Command.START_GAME, { gameId });
    }

    startGameSuccess () {
        return this._socketService.createMessageObservable(Command.START_GAME);
    }

    getCardsPlayerGame (data: IGetCard) {
        return this._socketService.emitMessage(Command.GET_LIST_CARD_PLAYER_GAME, data)
    }

    getCardsPlayerGameSuccess () {
        return this._socketService.createMessageObservable(Command.GET_LIST_CARD_PLAYER_GAME);
    }

    startHand (gameId: string) {
        return this._socketService.emitMessage(Command.START_HAND_GAME, { gameId });
    }

    playMove (data: IPlayMove) {
        return this._socketService.emitMessage(Command.PLAY_MOVE_GAME, data);
    }

    getLatestHand (gameId: string) {
        return this._socketService.emitMessage(Command.GET_LATEST_HAND_GAME, { gameId });
    }

    getLatestHandSuccess () {
        return this._socketService.createMessageObservable(Command.GET_LATEST_HAND_GAME);
    }

    getHands (gameId: string ){
        return this._socketService.emitMessage(Command.GET_LIST_HAND_GAME, { id: gameId });
    }

    getHandsSuccess () {
        return this._socketService.createMessageObservable(Command.GET_LIST_HAND_GAME);
    }

    getCards (gameId: string ){
        return this._socketService.emitMessage(Command.GET_LIST_CARD_GAME, { id: gameId });
    }

    getCardsSuccess () {
        return this._socketService.createMessageObservable(Command.GET_LIST_CARD_GAME);
    }
}

export { GameService }