import { Card, Suit } from './../models';

class Deck {
    static Cards: Card[] = [
        new Card('0', Suit.CLUBS, '2', 0),
        new Card('1', Suit.CLUBS, '3', 1),
        new Card('2', Suit.CLUBS, '4', 2),
        new Card('3', Suit.CLUBS, '5', 3),
        new Card('4', Suit.CLUBS, '6', 4),
        new Card('5', Suit.CLUBS, '7', 5),
        new Card('6', Suit.CLUBS, '8', 6),
        new Card('7', Suit.CLUBS, '9', 7),
        new Card('8', Suit.CLUBS, '10', 8),
        new Card('9', Suit.CLUBS, 'J', 9),
        new Card('10', Suit.CLUBS, 'Q', 10),
        new Card('11', Suit.CLUBS, 'K', 11),
        new Card('12', Suit.CLUBS, 'A', 12),

        new Card('13', Suit.DIAMONDS, '2', 0),
        new Card('14', Suit.DIAMONDS, '3', 1),
        new Card('15', Suit.DIAMONDS, '4', 2),
        new Card('16', Suit.DIAMONDS, '5', 3),
        new Card('17', Suit.DIAMONDS, '6', 4),
        new Card('18', Suit.DIAMONDS, '7', 5),
        new Card('19', Suit.DIAMONDS, '8', 6),
        new Card('20', Suit.DIAMONDS, '9', 7),
        new Card('21', Suit.DIAMONDS, '10', 8),
        new Card('22', Suit.DIAMONDS, 'J', 9),
        new Card('23', Suit.DIAMONDS, 'Q', 10),
        new Card('24', Suit.DIAMONDS, 'K', 11),
        new Card('25', Suit.DIAMONDS, 'A', 12),

        new Card('26', Suit.HEARTS, '2', 0),
        new Card('27', Suit.HEARTS, '3', 1),
        new Card('28', Suit.HEARTS, '4', 2),
        new Card('29', Suit.HEARTS, '5', 3),
        new Card('30', Suit.HEARTS, '6', 4),
        new Card('31', Suit.HEARTS, '7', 5),
        new Card('32', Suit.HEARTS, '8', 6),
        new Card('33', Suit.HEARTS, '9', 7),
        new Card('34', Suit.HEARTS, '10', 8),
        new Card('35', Suit.HEARTS, 'J', 9),
        new Card('36', Suit.HEARTS, 'Q', 10),
        new Card('37', Suit.HEARTS, 'K', 11),
        new Card('38', Suit.HEARTS, 'A', 12),

        new Card('39', Suit.SPADES, '2', 0),
        new Card('40', Suit.SPADES, '3', 1),
        new Card('41', Suit.SPADES, '4', 2),
        new Card('42', Suit.SPADES, '5', 3),
        new Card('43', Suit.SPADES, '6', 4),
        new Card('44', Suit.SPADES, '7', 5),
        new Card('45', Suit.SPADES, '8', 6),
        new Card('46', Suit.SPADES, '9', 7),
        new Card('47', Suit.SPADES, '10', 8),
        new Card('48', Suit.SPADES, 'J', 9),
        new Card('49', Suit.SPADES, 'Q', 10),
        new Card('50', Suit.SPADES, 'K', 11),
        new Card('51', Suit.SPADES, 'A', 12)
    ]; 
}

export { Deck }