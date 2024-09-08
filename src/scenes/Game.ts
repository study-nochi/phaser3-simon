import { Scene } from "phaser";
import { ASSET_KEYS } from "../constants/assets";

export class Game extends Scene {
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
    this.add.image(512, 384, "background");
    this.add.image(512, 350, "logo").setDepth(100);
    this.add
      .text(
        512,
        490,
        "Make something fun!\nand share it with us:\nsupport@phaser.io",
        {
          fontFamily: "Arial Black",
          fontSize: 38,
          color: "#ffffff",
          stroke: "#000000",
          strokeThickness: 8,
          align: "center",
        }
      )
      .setOrigin(0.5)
      .setDepth(100);
  }
}
