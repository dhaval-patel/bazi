import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { PlayerService } from './../../services/player.service';
import { GameService } from './../../services/game.service';
import { ICreateGame, IGame } from './../../../../../common/interfaces';

@Component({
    selector: 'my-create-game',
    templateUrl: './app/components/creategame/creategame.component.html'
})
class CreateGameComponent implements OnInit, OnDestroy {
    private _observers: any[] = [];
    game: ICreateGame = {
        type: 'MINDI',
        name: 'Practice Game'
    };

    games: IGame[] = [];

    constructor (private _router: Router, private _playerService: PlayerService, private _gameService: GameService) {}

    ngOnInit () {
        this._observers.push(...[this._gameService.createGameSuccess().subscribe(this.createGameSuccess.bind(this)),
                                this._gameService.getGamesSuccess().subscribe(this.getGameSuccess.bind(this))]);

        this._gameService.getGames();
    }

    createGame () {
        this._gameService.createGame(this.game);
    }

    createGameSuccess (data) {
        this.joinGame(data.id);
    }

    getGameSuccess (data: IGame[]) : void {
        this.games.length = 0;
        this.games.push(...data);
    }

    joinGame (gameId: string): void {
        this._router.navigate(['/joingame', gameId]);
    }

    ngOnDestroy() {
        this._observers.forEach(observer => observer.unsubscribe());
    }
}

export { CreateGameComponent }