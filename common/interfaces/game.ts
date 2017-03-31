import { GameType, Suit } from './../enums';
import { IPlayer } from './player';

interface ICreateGame {
    id? : string;
    type: GameType;
    name: string;
}

interface IJoinGame {
    gameId: string;
    playerId: string;
    playerName: string;
}

interface ILeaveGame {
    gameId: string;
    playerId: string;
}

interface IStartGame {
    gameId: string
}

interface IEndGame {
    gameId: string
}

interface IHandStart {
    id?: string;
    gameId: string;
}

interface IPlayMove {
    id?: string;
    gameId: string;
    playerId: string;
    cardId: string
}

interface IGame {
    id: string,
    name: string,
    type: GameType
}

interface IHandEnd {
    gameId: string
}

interface ICard {
    id?: string,
    suit: Suit,
    rank: string,
    weight: number,
    played: boolean;
}

interface IGetCard {
    gameId: string,
    playerId: string
}

interface IMove {
    id: string,
    player: IPlayer
    card: ICard
}

interface IHand {
    id: string,
    moves: IMove[]
}


export { ICreateGame, IJoinGame, ILeaveGame, IStartGame, IEndGame, IHandStart, IPlayMove, IHandEnd, IGame, ICard, IGetCard, IMove, IHand }