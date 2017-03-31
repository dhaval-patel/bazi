class GameType {
    static MINDI = 'MINDI';

    static getConfig (type: GameType): { noOfPlayers: number} {
        switch (type) {
            case 'MINDI': {
                return {
                    noOfPlayers: 2
                }
            }
        }
    }
}

export { GameType }