import Phaser from "phaser";

export class LoadingScene extends Phaser.Scene {

  constructor() {
    super("loading-scene");
  }

  preload() {
    this.load.baseURL = "assets/";

    // key: 'doux'
    // path from baseURL to file: 'sprites/doux.png'
    this.load.spritesheet("doux", "doux.png", {
      frameHeight: 24,
      frameWidth: 24,
    });
  }

  create(): void {
    console.log("Loading scene was created");
    this.scene.start('level-1');
  }
}
