import { Actor } from "./actor";

export class Player extends Actor {
  private keyW: Phaser.Input.Keyboard.Key;
  private keyA: Phaser.Input.Keyboard.Key;
  private keyS: Phaser.Input.Keyboard.Key;
  private keyD: Phaser.Input.Keyboard.Key;
  private keyShift: Phaser.Input.Keyboard.Key;
  private keySpace: Phaser.Input.Keyboard.Key;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, "doux", 0);

    // KEYS
    this.keyW = this.scene.input.keyboard.addKey("W");
    this.keyA = this.scene.input.keyboard.addKey("A");
    this.keyS = this.scene.input.keyboard.addKey("S");
    this.keyD = this.scene.input.keyboard.addKey("D");
    this.keyShift = this.scene.input.keyboard.addKey("Shift");
    this.keySpace = this.scene.input.keyboard.addKey("Space");

    // PHYSICS
    this.getBody().setSize(30, 30);
    this.getBody().setOffset(8, 0);

    this.setScale(1);

    this.anims.create({
      key: "idle",
      repeat: -1,
      frameRate: 6,
      frames: this.anims.generateFrameNames("doux", { start: 0, end: 3 }),
    });

    this.anims.create({
      key: "walk",
      repeat: -1,
      frameRate: 10,
      frames: this.anims.generateFrameNames("doux", { start: 4, end: 9 }),
    });

    this.anims.create({
      key: "crouch",
      repeat: 0,
      frameRate: 10,
      frames: this.anims.generateFrameNames("doux", { start: 18, end: 23 }),
    });

    this.anims.create({
      key: "jump",
      repeat: 0,
      frameRate: 1,
      frames: this.anims.generateFrameNames("doux", { start: 9, end: 10 }),
    });

    this.anims.create({
      key: "damage",
      repeat: 2,
      frameRate: 1,
      frames: this.anims.generateFrameNames("doux", { start: 14, end: 16 }),
    });

    this.anims.play("idle", true);
  }

  update(): void {
    this.getBody().setVelocity(0);

    if (this.keyW?.isDown) {
      this.body.velocity.y = -110;
      this.anims.play("walk", true);
    } else if (Phaser.Input.Keyboard.JustUp(this.keyW)) {
      this.anims.play("idle", true);
    }

    if (this.keyA?.isDown) {
      this.body.velocity.x = -110;
      this.checkFlip();
      this.getBody().setOffset(48, 15);
      this.anims.play("walk", true);
    } else if (Phaser.Input.Keyboard.JustUp(this.keyA)) {
      this.anims.play("idle", true);
    }

    if (this.keyShift?.isDown) {
      this.anims.play("crouch", true);
    } else if (Phaser.Input.Keyboard.JustUp(this.keyShift)) {
      this.anims.play("idle", true);
    }

    if (this.keyS?.isDown) {
      this.body.velocity.y = 110;
      this.anims.play("walk", true);
    } else if (Phaser.Input.Keyboard.JustUp(this.keyS)) {
      this.anims.play("idle", true);
    }

    if (this.keyD?.isDown) {
      this.body.velocity.x = 110;
      this.checkFlip();
      this.getBody().setOffset(15, 15);
      this.anims.play("walk", true);
    } else if (Phaser.Input.Keyboard.JustUp(this.keyD)) {
      this.anims.play("idle", true);
    }

    if (this.keySpace?.isDown) {
      this.body.velocity.y = -11;
      this.anims.play("jump", true);
    } else if (Phaser.Input.Keyboard.JustUp(this.keySpace)) {
      this.anims.play("idle", true);
    }
  }
}
