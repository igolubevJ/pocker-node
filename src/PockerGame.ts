

export default class PockerGame {
  constructor() {
  }

  async RunAsync(): Promise<void> {
    // todo: card shuffle
    const deck = this.GenerateDeck();

    console.log(JSON.stringify(deck));
    console.log(`Cards in deck: ${deck.length}`);
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

    return cards;
  }
}
