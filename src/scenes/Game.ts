import { Scene } from "phaser";
import { ASSET_KEYS } from "../constants/assets";
import { GAME_STATE } from "../constants/state";
import Simon from "../simon";

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
    this.#simonGame = new Simon()
  }

  preload() {
    Object.values(ASSET_KEYS).forEach((assetKey, index) => {
      this.load.audio(assetKey, `assets/audio/simonSound${index + 1}.mp3`);
    });
    // this.load.audio("a", "assets/audio/simonSound1.mp3");
  }

  create() {
    const button1 = this.#createButton(20, 20, 0xdb0a8b, 0xf535aa);
    const button2 = this.#createButton(230, 20, 0x08c418, 0x16f529);
    const button3 = this.#createButton(20, 230, 0xe6e600, 0xffff33);
    const button4 = this.#createButton(230, 230, 0x0066cc, 0x1589ff);

    this.#buttons = [button1, button2, button3, button4];
  }

  #createButton(x: number, y: number, color: number, hoverCover: number) {
    const button = this.add
      .rectangle(x, y, 200, 200, color)
      .setOrigin(0)
      .setAlpha(0.4)
      .setInteractive();

    button.on(Phaser.Input.Events.POINTER_OVER, () => {
      button.fillColor = hoverCover;
      button.setAlpha(1);
    });
    button.on(Phaser.Input.Events.POINTER_OUT, () => {
      button.fillColor = color;
      button.setAlpha(0.4);
    });
    button.on(Phaser.Input.Events.POINTER_DOWN, () => {
      console.log("pointer down");
    });
    return button;
  }
}
