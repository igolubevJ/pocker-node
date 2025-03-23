import PokerGame from "./PokerGame";
import { GameParams } from "./Params";

// sb = 100
// bb = 200

const gameParams: GameParams = {
  sbRate: 0.1,
  bbRate: 0.2,
  stack: 1000,
};

const game = new PokerGame(gameParams);
game.RunAsync();
