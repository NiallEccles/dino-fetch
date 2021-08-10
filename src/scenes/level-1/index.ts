import Phaser from "phaser";

import { Player } from "../../classes/player";

export class Level1 extends Phaser.Scene {
  private player!: Player;

  private map!: Phaser.Tilemaps.Tilemap;
  private tileset!: Phaser.Tilemaps.Tileset;
  private wallsLayer!: Phaser.Tilemaps.TilemapLayer;
  private groundLayer!: Phaser.Tilemaps.TilemapLayer;

  constructor() {
    super("level-1");
  }

  private initCamera(): void {
    this.cameras.main.setSize(this.game.scale.width, this.game.scale.height);
    this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
    this.cameras.main.setZoom(4);
  }

  private initMap(): void {
    this.map = this.make.tilemap({ key: 'dungeon', tileWidth: 16, tileHeight: 16 });
    this.tileset = this.map.addTilesetImage('dungeon', 'tiles');
    this.groundLayer = this.map.createLayer('Ground', this.tileset, 0, 0);
    this.wallsLayer = this.map.createLayer('Walls', this.tileset, 0, 0);

    this.wallsLayer.setCollisionByProperty({ collides: true }); 
    // this.showDebugWalls();
  
    this.wallsLayer.setCollisionBetween(100, 120);
    this.physics.world.setBounds(0, 0, this.wallsLayer.width, this.wallsLayer.height);
  }

  private showDebugWalls(): void {
    const debugGraphics = this.add.graphics().setAlpha(0.7);
    this.wallsLayer.renderDebug(debugGraphics, {
      tileColor: new Phaser.Display.Color(243, 234, 48, 255),
      collidingTileColor: new Phaser.Display.Color(243, 234, 48, 255),
    });
  }

  create(): void {
    this.initMap();
    this.player = new Player(this, 400, 200);
    this.physics.add.collider(this.player, this.wallsLayer);
    this.initCamera();
  }

  update(): void {
    this.player.update();
  }
}
