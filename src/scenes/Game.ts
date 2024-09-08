import { Scene } from "phaser";
import { ASSET_KEYS } from "../constants/assets";

export class Game extends Scene {
  #buttons: Phaser.GameObjects.Rectangle[] = [];

  constructor() {
    super("Game");
  }

  preload() {
    Object.values(ASSET_KEYS).forEach((assetKey, index) => {
      this.load.audio(assetKey, `assets/audio/simonSound${index + 1}.mp3`);
    });
    // this.load.audio("a", "assets/audio/simonSound1.mp3");
  }

  create() {
    const button1 = this.#createButton(20, 20, 0xdb0a8b);
    const button2 = this.#createButton(230, 20, 0x08c418);
    const button3 = this.#createButton(20, 230, 0xe6e600);
    const button4 = this.#createButton(230, 230, 0x0066cc);

    this.#buttons = [button1, button2, button3, button4];
  }

  #createButton(x: number, y: number, color: number) {
    return this.add.rectangle(x, y, 200, 200, color).setOrigin(0).setAlpha(0.4);
  }
}
