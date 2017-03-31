/// <reference path="../../../../typings/globals/socket.io-client/index.d.ts" />

import {Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import * as io from 'socket.io-client';

import {Hero} from "../../models/hero";
import {HeroService} from "../../services/hero.service";



@Component({
    selector: 'my-dashboard',
    templateUrl: './app/components/dashboard/dashboard.component.html',
    styleUrls: ['./app/components/dashboard/dashboard.component.css']
})

export class DashboardComponent implements OnInit {
    heroes: Hero[] = [];
    private host: string = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port;
    socket: SocketIOClient.Socket;
    player: {id?: string, name: string} = { name: 'dhaval' };
    game: {type: string, id?: string} = { type: 'MINDI' };

    constructor(
        private router: Router,
        private heroService: HeroService) {
    }

    ngOnInit() {
        // this.heroService.getHeroes()
        //     .then(heroes => this.heroes = heroes);
        // this.name = name;
        let socketUrl = this.host + "/";
        this.socket = io.connect();
        this.socket.on('connect', () => {
            console.log('connection established');
            this.playerConnect();
        }).on('connect_error', () => {
            console.log('connection error');
        });

        this.socket.on('player_connect', this.playerConnectSuccess.bind(this));
        this.socket.on('game_create', this.gameCreateSuccess.bind(this));
        this.socket.on('game_join', this.gameJoinSuccess.bind(this));
    }

    gotoDetail(hero: Hero) {
        let link = ['/detail', hero._id];
        this.router.navigate(link);
    }

    playerConnect (): void {
        this.socket.emit("player_connect", this.player);
    }

    playerConnectSuccess (data): void {
        this.player.id = data.id;
        this.gameCreate();
    }

    gameCreate (): void {
        this.socket.emit('game_create', this.game);
    }

    gameCreateSuccess (data): void {
        this.game.id = data.id;
        this.gameJoin();
    }

    gameJoin (): void {
        this.socket.emit('game_join', {gameId: this.game.id, playerId: this.player.id, name: this.player.name});
    }

    gameJoinSuccess (): void {
        console.log('Joined Successfully');
    }
}