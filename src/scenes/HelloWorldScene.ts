import Phaser from "phaser";
export class HelloWorldScene extends Phaser.Scene {

  constructor() {
    super({ key: "hello-world", active: true });
  }

  preload() {
    this.load.image("bg", "/assets/back.png");

    this.load.spritesheet("doux", "/assets/doux.png", {
      frameHeight: 24,
      frameWidth: 24,
    });

    this.load.image("shadow", "/assets/shadow.png");
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

    const doux = this.add.sprite(100, 100, "doux", 4);
    doux.setScale(2);
    this.anims.create({
      key: "walk",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNames("doux", { start: 4, end: 9 }),
    });

    const shadow = this.add.image(doux.x, doux.y + 2, "shadow");
    shadow.setScale(doux.scale);

    doux.play("walk");
  }
}
