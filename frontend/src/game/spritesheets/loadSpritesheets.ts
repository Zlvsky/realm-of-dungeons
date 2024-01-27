import { Assets } from "pixi.js";

const loadSpritesheets = () => {
    Assets.load([
        "/spritesheets/npc/npc.json",
    ]).then(() => {
        console.log("loaded")
    })
}

export default loadSpritesheets;