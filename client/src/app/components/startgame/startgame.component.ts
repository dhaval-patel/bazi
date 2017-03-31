import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PlayerService } from './../../services/player.service';
import { GameService } from './../../services/game.service';
import { IJoinGame, IPlayer, IGame, IStartGame } from './../../../../../common/interfaces';

@Component({
    selector: 'my-start-game',
    templateUrl: './app/components/startgame/startgame.component.html'
})
class StartGameComponent implements OnInit, OnDestroy {
    private _observers: any[] = [];
    players: IPlayer[] = [];
    game: IGame;

    constructor (   private _route: ActivatedRoute, 
                    private _router: Router, 
                    private _playerService: PlayerService, 
                    private _gameService: GameService) {
    }

    ngOnInit () {
        let gameId;
        
        this._route.params.forEach(params => {
            gameId = params['gameId'];
        });

        this._observers.push(...[this._gameService.getGameSuccess().subscribe(this.getGameSuccess.bind(this)), 
                                    this._gameService.getPlayersSuccess().subscribe(this.getPlayersSuccess.bind(this)),
                                    this._gameService.startGameSuccess().subscribe(this.startGameSuccess.bind(this))]);

        this.getGame(gameId);
        this.getPlayers(gameId)
    }
    
    getGame (gameId: string): void {
        this._gameService.getGame(gameId);
    }

    getGameSuccess (data: IGame): void {
        this.game = data;
    }

    getPlayers (gameId: string) {
        this._gameService.getPlayers(gameId);
    }

    getPlayersSuccess (data: IPlayer[]) {
        this.players.length = 0;
        this.players.push(...data);
    }

    startGame (gameId): void {
        this._gameService.startGame(gameId);
    }

    startGameSuccess (data: IStartGame) {
        this._router.navigate(['/playgame', data.gameId]);
    }

    ngOnDestroy() {
        this._observers.forEach(observer => observer.unsubscribe());
    }
}

export { StartGameComponent }