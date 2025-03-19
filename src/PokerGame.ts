import { ShuffleArray } from './Utils'
import PokerPlayer from './PokerPlayer';

export default class PokerGame {
  constructor() {
  }

  async RunAsync(): Promise<void> {
    const players: PokerPlayer[] = [
      new PokerPlayer('player_a'),
      new PokerPlayer('pocker_b'),
    ];
    
    let gameWinner: PokerPlayer = null;

    while(gameWinner === null) {
      await this.ProcessGameAsync(players);

      gameWinner = this.DetectGameWinner(players);
    }

    // todo: implement game close and rewards winner

  }

  async ProcessGameAsync(players: PokerPlayer[]): Promise<void> {
    const deck = this.GenerateDeck();

    players.forEach(player => player.Hand = this.TakeCardsFromDeck(deck, 2))
  }

  GenerateDeck() {
    const cards: string[] = [];

    const ranks: string[] = [
      '2', '3', '4', '5',
      '6', '7', '8', '9',
      'T', 'J', 'Q', 'K', 'A'
    ];

    const suits: string[] = [
      's', 'c', 'h', 'd',
    ];

    for (const rank of ranks) {
      for (const suit of suits) {
        cards.push(`${rank}${suit}`);
      }
    }

    return ShuffleArray(cards);
  }

  TakeCardsFromDeck(deck: string[], count: number) : string[] {
    if (deck.length < count) {
      throw new Error('GetCardsFromDeck() not enough cards in deck')
    }

    const cards: string[] = [];

    for (let i = 0; i < count; i++) {
      cards.push(deck.pop());
    }

    return cards;
  }

  DetectGameWinner(players: PokerPlayer[]): PokerPlayer {
    // todo: implement logic
    return null;
  }

  // Game state ----------------------------------------------------
  
  async PreflopAsync(): Promise<PokerPlayer> {
    return null;
  }

  async FlopAsync(): Promise<PokerPlayer> {
    return null;
  }

  async TurnAsync(): Promise<PokerPlayer> {
    return null;
  }

  async RiverAsync(): Promise<PokerPlayer> {
    return null;
  }

  async ShowdownAsync(): Promise<PokerPlayer> {
    return null;
  }
}
