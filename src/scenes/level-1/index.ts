import Phaser from "phaser";

import {Player} from "../../classes/player";

export class Level1 extends Phaser.Scene {
    private player!: Player;

  constructor() {
    super("level-1");
    
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(2);
  }

  create(): void {
    this.player = new Player(this, 100,100);
    this.initCamera();
  }

  update(): void{
      this.player.update();
  }
}
