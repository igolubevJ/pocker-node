import { BehaviorSubject } from 'rxjs';

export default class PockerPlayer {
  private _hand: BehaviorSubject<string[]>;

  constructor() {
    this._hand = new BehaviorSubject<string[]>([]);
  }

  public get Hand() {
    return this._hand.value;
  }

  public set Hand(value: string[]) {
    this._hand.next(value);
  }
}

