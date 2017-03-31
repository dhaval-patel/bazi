import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PlayerService } from './../../services/player.service';
import { GameService } from './../../services/game.service';
import { IJoinGame, IPlayer } from './../../../../../common/interfaces';

@Component({
    selector: 'my-create-game',
    templateUrl: './app/components/joingame/joingame.component.html'
})
class JoinGameComponent implements OnInit, OnDestroy {
    private _observers: any[] = [];
    game: IJoinGame;
    players: IPlayer[] = [];

    constructor (private _route: ActivatedRoute, private _router: Router, private _playerService: PlayerService, private _gameService: GameService) {
        this.game = {
            playerId: this._playerService.currentPlayer.id,
            playerName: 'Dhaval',
            gameId: ''
        };
    }

    ngOnInit () {
        this._route.params.forEach(params => {
            this.game.gameId = params['gameId'];
        });

        this._observers.push(...[   this._gameService.joinGameSuccess().subscribe(this.joinGameSuccess.bind(this)),
                                    this._gameService.getPlayersSuccess().subscribe(this.getPlayersSuccess.bind(this))
                                ]);

        this.getPlayers(this.game.gameId);
    }

    joinGame () {
        this._gameService.joinGame(this.game);
    }

    joinGameSuccess (data: IJoinGame) {
        this._router.navigate(['/startgame', data.gameId]);
    }

    getPlayers (gameId: string) {
        this._gameService.getPlayers(gameId);
    }

    getPlayersSuccess (data: IPlayer[]) {
        this.players.length = 0;
        this.players.push(...data);
    }

    ngOnDestroy() {
        this._observers.forEach(observer => observer.unsubscribe());
    }
}

export { JoinGameComponent }