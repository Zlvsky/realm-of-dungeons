import io from "socket.io-client";
import Card from "../helpers/card";
import Dealer from "../helpers/dealer";
import Zone from "../helpers/zone";

export default class CharacterCreation extends Phaser.Scene {
  constructor() {
    super({
      key: "CharacterCreation",
    });
  }

  preload() {
    this.load.image("creationscene", "../assets/map/creationscene.jpg");
  }

  create() {
    let image = this.add.image(
      this.cameras.main.width / 2,
      this.cameras.main.height / 2,
      "creationscene"
    );
    let scaleX = this.cameras.main.width / image.width;
    let scaleY = this.cameras.main.height / image.height;
    let scale = Math.max(scaleX, scaleY);
    image.setScale(scale).setScrollFactor(0);

    
  }

  update() {}
}
