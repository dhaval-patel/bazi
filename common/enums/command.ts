class Command {
    static CONNECTION: string = 'connection';
    static DISCONNECT: string = 'disconnect';
    static CONNECT_PLAYER: string = 'player_connect';

    // User
    static GET_PLAYER: string = 'player_get';
    static POST_PLAYER: string = "player_post";

    // Game
    static CREATE_GAME: string = 'game_create';
    static JOIN_GAME: string = 'game_join';
    static LEAVE_GAME: string = 'game_leave';
    static START_GAME: string = 'game_start';
    static END_GAME: string = 'game_end';
    static START_HAND_GAME: string = 'game_hand_start';
    static END_HAND_GAME: string = 'game_hand_end';
    static GAME_HAND_MOVE: string = 'game_hand_move';

    static GET_LIST_GAME: string = 'get_list_game';
    static GET_LIST_PLAYER_GAME: string = 'get_list_player_game';
    static GET_GAME = 'get_game';
    static PLAY_MOVE_GAME: string = 'play_move_game';
    static GET_LIST_CARD_PLAYER_GAME: string = 'get_list_card_player_game';
    static GET_LATEST_HAND_GAME = 'get_latest_hand_game';
    static GET_LIST_HAND_GAME: string = 'get_list_hand_game';
    static GET_LIST_CARD_GAME: string = 'get_list_card_game';
}

export { Command }