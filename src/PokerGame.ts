import { ShuffleArray, WaitForSecondsAsync } from './Utils';
import PokerPlayer from './PokerPlayer';
import { Hand } from 'pokersolver';

type PlayerWinnerInfo = {
  player: PokerPlayer,
  description: string,
};


export default class PokerGame {
  constructor() {
  }

  async RunAsync(): Promise<void> {
    const players: PokerPlayer[] = [
      new PokerPlayer('player_a'),
      new PokerPlayer('pocker_b'),
    ];
    
    let round: number = 0;
    let gameWinner: PokerPlayer = null;

    while(gameWinner === null) {
      this.StepLog(`Round: ${round} started.`);

      await this.ProcessGameAsync(players);

      gameWinner = this.DetectGameWinner(players);

      await WaitForSecondsAsync(3);
      round++;
    }

    // todo: implement game close and rewards winner

  }

  async ProcessGameAsync(players: PokerPlayer[]): Promise<void> {
    const deck = this.GenerateDeck();

    players.forEach(player => player.Hand = this.TakeCardsFromDeck(deck, 2))
  
    const tableCards: string[] = [];

    const streets: (() => Promise<PokerPlayer>)[] = [
      () => this.PreflopAsync(),
      () => this.FlopAsync(),
      () => this.TurnAsync(),
      () => this.RiverAsync(),
      () => this.ShowdownAsync(players, tableCards),
    ];

    for (const street of streets) {
      const streetWinner = await street();
      await WaitForSecondsAsync(1);
      if (streetWinner != null) {
        // todo: money tranaction to winner
        break;
      }
    }
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

  ResolveWinnerPlayers(
    players: PokerPlayer[], 
    tableCards: string[]
  ) : PlayerWinnerInfo[] {
    const hands: any[] = [];
    const handsPlayersMap = new Map<string, any>();

    players.forEach((player) => {
      const playerFullHand = [...player.Hand, ...tableCards];
      const slovedHand = Hand.solve(playerFullHand);
      console.log(`Player '${player.Name}' solved hand: '${slovedHand.descr}'`);
      hands.push(slovedHand);
      handsPlayersMap.set(player.Name, slovedHand);
    });

    const winnerHands = Hand.winners(hands);

    if (winnerHands.length === 1) {
      const winnerHand = winnerHands[0];
      let playerWinner: PokerPlayer = null;

      for (const [k, v] of handsPlayersMap) {
        if (v === winnerHand) {
          playerWinner = players.find((player) => player.Name === k)
          break;
        }
      }

      if (!playerWinner) {
        throw new Error('DetectWinnerHand() cannot find resolve winner!');
      }

      return [{
        player: playerWinner,
        description: winnerHand.descr,
      }];
    } else {
      // standoff
      return players.map((player) => ({ player, description: "STANDOFF" }))
    }
  }

  // Game state ----------------------------------------------------
  
  async PreflopAsync(): Promise<PokerPlayer> {
    this.StepLog('PREFLOP');
    return null;
  }

  async FlopAsync(): Promise<PokerPlayer> {
    this.StepLog('FLOP');
    return null;
  }

  async TurnAsync(): Promise<PokerPlayer> {
    this.StepLog('TURN');
    return null;
  }

  async RiverAsync(): Promise<PokerPlayer> {
    this.StepLog('RIVER');
    return null;
  }

  async ShowdownAsync(players: PokerPlayer[], tableCards: string[]): Promise<PokerPlayer> {
    this.StepLog('SHOWDOWN');

    const winners = this.ResolveWinnerPlayers(players, tableCards);

    this.StepLog(`Winners`);
    winners.forEach((winner) => {
      console.log(`${winner.player.Name} => ${winner.description}`)
    });

    return null;
  }

  // Logger ---------------------------------------------------------
  
  StepLog(message: string) {
    console.log('*** *** *** *** *** *** *** *** *** ***')
    console.log('\t' + message)
    console.log('\n')    
  }
}
