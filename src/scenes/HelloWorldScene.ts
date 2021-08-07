import Phaser from "phaser";

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super({ key: "hello-world", active: true });
  }

  preload() {
    this.load.image("bg", "/assets/back.png");
    this.load.image("mid", "/assets/middle.png");

    this.load.spritesheet("doux", "/assets/doux.png", {
      frameHeight: 24,
      frameWidth: 24,
    });
  }

  create() {
    const bg = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "bg"
    );

    let scaleX = this.cameras.main.width / bg.width;
    let scaleY = this.cameras.main.height / bg.height;
    let scale = Math.max(scaleX, scaleY);
    bg.setScale(scale).setScrollFactor(0);

    // const mid = this.add.tileSprite(
    //   0,
    //   this.sys.game.canvas.height,
    //   this.sys.game.canvas.width,
    //   this.sys.game.canvas.height,
    //   "mid"
    // );

    const doux = this.add.sprite(100, 100, "doux", 4);
    doux.setScale(2);
    this.anims.create({
      key: "walk",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNames("doux", { start: 4, end: 9 }),
    });

    doux.play("walk");
    // emitter.startFollow(logo)
  }
}
