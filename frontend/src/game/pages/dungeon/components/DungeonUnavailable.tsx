import { useCallback } from "react"
import { Container, Graphics, Sprite, Text } from "@pixi/react";

import cavernBg from "../.././../../assets/images/game-world/dungeons/cavern/cavernDungeon.png";
import { TextStyle } from "pixi.js";

const canvasWidth = 1316;
const canvasHeight = 937;
const rectWidth = 500;
const rectHeight = 100;

const getCavernInfo = (realm: string) => {
  switch (realm) {
    case "CAVERNS":
      return {
        description: "Caverns dungeon is unlocked by reaching 5 level",
        background: cavernBg,
      };
    case "CRYPT":
      return {
        description: "Crypt dungeon is unlocked by reaching 15 level",
        background: cavernBg,
      };
  }
};

function DungeonUnavailable({ realm }: any) {
  const dungeonInfo = getCavernInfo(realm);

  const startX = (canvasWidth - rectWidth) / 2;
  const startY = (canvasHeight - rectHeight) / 2;

  const questFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x1f1f1f, 0.8);
    g.lineStyle(3, 0x1f1f1f, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  return (
    <Container position={[0, 2]}>
      <Sprite image={dungeonInfo?.background} width={1316} height={935} />
      <Container position={[startX, startY]}>
        <Graphics draw={questFrame} zIndex={10} />
        <Text
          text={dungeonInfo?.description}
          anchor={0.5}
          x={rectWidth / 2}
          y={50}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 22,
              letterSpacing: 1,
              fill: ["#ffffff"],
            })
          }
        />
      </Container>
    </Container>
  );
}

export default DungeonUnavailable;
