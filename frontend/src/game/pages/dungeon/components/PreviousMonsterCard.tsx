import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

import checkMark from "../../../../assets/images/hud/check.png";

const FRAME_WIDTH = 250;

const CheckMark = () => {
  return (
    <Sprite
      image={checkMark}
      position={[250 / 2, -15]}
      anchor={[0.5, 0]}
      width={30}
      height={30}
    />
  );
};

function PreviousMonsterCard({ dungeons }: any) {
  const currentMonster = dungeons.monsters[dungeons.currentMonster];

  const MonsterInfo = () => {
    return (
      <Container position={[0, 250]}>
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.clear();
            g.beginFill(0x252525);
            g.drawRect(0, 0, FRAME_WIDTH, 30);
            g.endFill();
          }}
        />
        <Text
          text={`LEVEL ${currentMonster.level}`}
          x={FRAME_WIDTH / 2}
          anchor={0.5}
          y={15}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 18,
              fill: ["#ffffff"],
            })
          }
        />
        <Text
          text={currentMonster.name}
          y={60}
          x={FRAME_WIDTH / 2}
          anchor={0.5}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "Almendra",
              fontSize: 22,
              fill: ["#ffffff"],
            })
          }
        />
      </Container>
    );
  };

  return (
    <Container position={[205, 290]}>
      <Sprite
        image={currentMonster.img}
        position={[0, 0]}
        width={FRAME_WIDTH}
        height={FRAME_WIDTH}
      />
      <MonsterInfo />
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.clear();
          g.lineStyle(3, 0x525252);
          g.drawRect(0, 0, FRAME_WIDTH, 350);
          g.endFill();
        }}
      />
      <CheckMark />
    </Container>
  );
}

export default PreviousMonsterCard;
