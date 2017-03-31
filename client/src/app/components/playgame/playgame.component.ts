import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { PlayerService } from './../../services/player.service';
import { GameService } from './../../services/game.service';
import { IJoinGame, IPlayer, IGame, IStartGame, ICard, IHand } from './../../../../../common/interfaces';

import { Game, Player, Card, Hand, Move } from './../../../../../common/models';

@Component({
    selector: 'my-play-game',
    templateUrl: './app/components/playgame/playgame.component.html'
})
class PlayGameComponent implements OnInit, OnDestroy {
    private _observers: any[] = [];
    players: IPlayer[] = [];
    game: Game;
    cards: ICard[] = [];
    latestHand: IHand;

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
                                    this._gameService.getCardsPlayerGameSuccess().subscribe(this.getCardsPlayerGameSuccess.bind(this)),
                                    this._gameService.getLatestHandSuccess().subscribe(this.getLatestHandSuccess.bind(this)),
                                    this._gameService.getCardsSuccess().subscribe(this.getCardsGameSucces.bind(this)),
                                    this._gameService.getHandsSuccess().subscribe(this.getHandsGameSuccess.bind(this))]);

        this.getGame(gameId);
        this.getLatestHand(gameId);
    }
    
    getGame (gameId: string): void {
        this._gameService.getGame(gameId);
    }

    getGameSuccess (data: IGame): void {
        this.game = new Game(data.id, data.type, data.name);
        this.getPlayers(this.game.id);
    }

    getPlayers (gameId: string) {
        this._gameService.getPlayers(gameId);
    }

    getPlayersSuccess (data: IPlayer[]) {
        data.forEach(player => {
            this.game.addPlayer(new Player(player.id, player.name));
        });
        
        this.getCardsPlayerGame(this.game.id, this._playerService.currentPlayer.id);

        console.log(this.game);
    }

    getCardsPlayerGame (gameId: string, playerId: string) {
        this._gameService.getCardsPlayerGame({ gameId, playerId });
    }

    getCardsPlayerGameSuccess (data: ICard[]) {
        let player = this.game.getPlayerById(this._playerService.currentPlayer.id);
        player.cards = data.map(card => new Card(card.id, card.suit, card.rank, card.weight, card.played));
        this.getCardsGame(this.game.id);
    }

    getCardsGame (gameId: string) {
        this._gameService.getCards(gameId);
    }

    getCardsGameSucces (data: ICard[]) {
        this.game.cards = data.map(card => new Card(card.rank, card.suit, card.rank, card.weight, card.played));
        this.getHandsGame(this.game.id);
    }

    getHandsGame (gameId: string) {
        this._gameService.getHands(gameId);
    }

    getHandsGameSuccess (data: IHand[]) {
        data.forEach(hd => {
            let hand = new Hand(hd.id);
            hand.moves = hd.moves.map(move => new Move(move.id, this.game.getPlayerById(move.player.id), this.game.getCardById(move.card.id)));
            this.game.addHand(hand);
        });
    }

    getLatestHand (gameId: string) {
        this._gameService.getLatestHand(gameId);
    }

    getLatestHandSuccess (data: IHand) {
        this.latestHand = data;
    }
    
    startHand () {
        this._gameService.startHand(this.game.id);
    }

    playMove (cardId: string) {
        this._gameService.playMove({ gameId: this.game.id, playerId: this._playerService.currentPlayer.id, cardId });
    }

    ngOnDestroy() {
        this._observers.forEach(observer => observer.unsubscribe());
    }
}

export { PlayGameComponent }