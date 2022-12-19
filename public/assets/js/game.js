const CharacterSelect = require('../../scenes/CharacterSelect');
const CharacterCreation = require("../../scenes/CharacterCreation");

class BootScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'BootScene',
      active: true
    });
  }

  preload() {
  }

  create() {
    this.socket = io();

    this.scene.start('CharacterSelect');
  }
}

class WorldScene extends Phaser.Scene {
  constructor() {
    super({
      key: 'WorldScene'
    });
  }

  create() {
    
  }

  update() {
  }
}

var config = {
  type: Phaser.AUTO,
  parent: "content",
  width: 1280,
  height: 720,  
  scene: [BootScene, WorldScene, CharacterSelect, CharacterSelect],
};
var game = new Phaser.Game(config);