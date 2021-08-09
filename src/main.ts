declare global {
  interface Window {
    sizeChanged: () => void;
    game: Phaser.Game;
  }
}

import { Level1, LoadingScene } from "./scenes";

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  roundPixels: true,
  parent: "content",
  audio: {
    disableWebAudio: true,
  },
  physics: {
    default: "arcade",
    arcade: {
      // gravity: { y: 200 },
    },
  },
  render: {
    pixelArt: true,
  },
  backgroundColor: '#351f1b',
  scale: {
    mode: Phaser.Scale.ScaleModes.NONE,
    width: 800,
    height: 800,
  },
  callbacks: {
    postBoot: () => {},
  },
  autoFocus: true,
  scene: [LoadingScene, Level1],
};

window.sizeChanged = () => {
  if (window.game.isBooted) {
    setTimeout(() => {
      window.game.scale.resize(window.innerWidth, window.innerHeight);

      window.game.canvas.setAttribute(
        "style",
        `display: block; width: ${window.innerWidth}px; height: ${window.innerHeight}px;`
      );
    }, 100);
  }
};

window.onresize = () => window["sizeChanged"]();

window.game = new Phaser.Game(config);

export default window.game;
