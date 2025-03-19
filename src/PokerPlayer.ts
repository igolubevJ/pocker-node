import { BehaviorSubject } from 'rxjs';

export default class PockerPlayer {
  private _playerName: string;
  private _hand: BehaviorSubject<string[]>;

  constructor(playerName: string) {
    this._playerName = playerName;
    this._hand = new BehaviorSubject<string[]>([]);
  }

  public get Hand() {
    return this._hand.value;
  }

  public set Hand(value: string[]) {
    this._hand.next(value);
  }

  public get Name() {
    return this._playerName;
  }
}
