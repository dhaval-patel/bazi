import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { IPlayerConnect } from './../../../../../common/interfaces';
import { PlayerService } from './../../services/player.service';

@Component({
    selector: 'my-connect-player',
    templateUrl: './app/components/connectplayer/connectplayer.component.html'
})
class ConnectPlayerComponent implements OnInit, OnDestroy {
    private _observers: any[] = [];

    private _player: IPlayerConnect = {};

    constructor (private _router: Router, private _playerService: PlayerService) {}

    ngOnInit () {
        this._observers.push(...[this._playerService.connectPlayerSuccess().subscribe(this.getConnectPlayer.bind(this))]);
    }

    connectPlayer () {
        this._playerService.connectPlayer(this._player);
    }

    getConnectPlayer (data) {
        this._playerService.currentPlayer = data;
        this._router.navigate(['/creategame']);
    }

    ngOnDestroy() {
        this._observers.forEach(observer => observer.unsubscribe());
    }
}

export { ConnectPlayerComponent }