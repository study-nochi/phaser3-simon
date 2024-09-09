import { SIMON_ERROR } from "./constants/error";
import getRandomInclusive from "./utils/getRandomInclusive";

export default class Simon {
  #currentSequence: number[] = [];
  #playerMoves: number[] = [];
  #isGameOver: boolean = false;

  constructor() {
    this.#initalizeGame();
  }

  get sequence(): number[] {
    return [...this.#currentSequence];
  }

  get isGameOver(): boolean {
    return this.#isGameOver;
  }

  get isPlayerSequenceComplete(): boolean {
    return this.#playerMoves.length === this.#currentSequence.length;
  }

  resetGame() {
    this.#initalizeGame();
  }

  generateNextSequenceElement() {
    if (this.#isGameOver) {
      throw new Error(SIMON_ERROR.INVALID_MOVE_GAME_IS_OVER);
    }
    this.#currentSequence.push(getRandomInclusive(0, 3));
    this.#playerMoves = [];
  }

  checkPlayerMove(x: number) {
    if (this.#isGameOver) {
      throw new Error(SIMON_ERROR.INVALID_MOVE_GAME_IS_OVER);
    }

    if (this.#playerMoves.length === this.#currentSequence.length) return;

    const index = this.#playerMoves.length - 1;

    this.#playerMoves.push(x);
    this.#isGameOver =
      this.#playerMoves[index] !== this.#currentSequence[index];
  }

  #initalizeGame() {
    this.#currentSequence = [];
    this.#playerMoves = [];

    this.generateNextSequenceElement();
  }
}
