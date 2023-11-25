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

function PreviousMonsterCard({ dungeon, enemies }: any) {
  const previousMonster = dungeon.currentMonster === 10 ? 8 : dungeon.currentMonster - 1;
  const previousEnemy = enemies[previousMonster];

  if (!previousEnemy || previousEnemy.length === 0) return null;

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
          text={`LEVEL ${previousEnemy.level}`}
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
          text={previousEnemy.name}
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
        image={previousEnemy.avatar}
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
