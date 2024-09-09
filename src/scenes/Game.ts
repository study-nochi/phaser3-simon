import { Scene } from "phaser";
import { ASSET_KEYS } from "../constants/assets";
import { GAME_STATE } from "../constants/state";
import Simon from "../simon";
import sleep from "../utils/sleep";

export class Game extends Scene {
  #buttons: Phaser.GameObjects.Rectangle[] = [];
  #gameState: GAME_STATE;
  #simonGame: Simon;

  constructor() {
    super("Game");
  }

  init() {
    this.#buttons = [];
    this.#gameState = GAME_STATE.INITIAL;
    this.#simonGame = new Simon();
  }

  preload() {
    Object.values(ASSET_KEYS).forEach((assetKey, index) => {
      this.load.audio(assetKey, `assets/audio/simonSound${index + 1}.mp3`);
    });
  }

  create() {
    const button1 = this.#createButton(
      20,
      20,
      0xdb0a8b,
      0xf535aa,
      0,
      ASSET_KEYS.SOUND1
    );
    const button2 = this.#createButton(
      230,
      20,
      0x08c418,
      0x16f529,
      1,
      ASSET_KEYS.SOUND2
    );
    const button3 = this.#createButton(
      20,
      230,
      0xe6e600,
      0xffff33,
      2,
      ASSET_KEYS.SOUND4
    );
    const button4 = this.#createButton(
      230,
      230,
      0x0066cc,
      0x1589ff,
      3,
      ASSET_KEYS.SOUND1
    );

    this.#buttons = [button1, button2, button3, button4];
    this.#playerSequence().catch(() => undefined);
  }

  #createButton(
    x: number,
    y: number,
    color: number,
    hoverCover: number,
    buttonId: number,
    audioAssetKey: ASSET_KEYS
  ) {
    const button = this.add
      .rectangle(x, y, 200, 200, color)
      .setOrigin(0)
      .setAlpha(0.4)
      .setInteractive();

    button.setDataEnabled();
    button.data.set({ color, hoverCover, id: buttonId, audioAssetKey });

    button.on(Phaser.Input.Events.POINTER_OVER, () => {
      if (this.#gameState === GAME_STATE.WAITING_FOR_INPUT) {
        button.fillColor = hoverCover;
        button.setAlpha(1);
      }
    });
    button.on(Phaser.Input.Events.POINTER_OUT, () => {
      if (this.#gameState === GAME_STATE.WAITING_FOR_INPUT) {
        button.fillColor = color;
        button.setAlpha(0.4);
      }
    });
    button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      if (this.#gameState === GAME_STATE.WAITING_FOR_INPUT) {
        this.#simonGame.checkPlayerMove(button.data.get("id"));

        button.fillColor = color;
        button.setAlpha(0.4);

        if (this.#simonGame.isGameOver) {
          this.#gameState = GAME_STATE.DONE;
          console.log("Game is over");
          return;
        }

        if (this.#simonGame.isPlayerSequenceComplete) {
          this.#gameState = GAME_STATE.PLAYING_PATTERN;
          this.#simonGame.generateNextSequenceElement();
          console.log(this.#simonGame.sequence);
          this.#playerSequence().catch(() => undefined);
        }
      }
    });
    return button;
  }

  async #playerSequence(): Promise<void> {
    await sleep(1000);
    const currentSequence = this.#simonGame.sequence;

    currentSequence.forEach(async (index) => {
      this.#buttons[index].fillColor =
        this.#buttons[index].data.get("hoverCover");
      this.#buttons[index].setAlpha(1);
      this.sound.play(this.#buttons[index].data.get("audioAssetKey"));
      // todo playe audio
      await sleep(1000);
      this.#buttons[index].fillColor = this.#buttons[index].data.get("color");
      this.#buttons[index].setAlpha(0.4);
      await sleep(400);
    });

    this.#gameState = GAME_STATE.WAITING_FOR_INPUT;
  }
}
