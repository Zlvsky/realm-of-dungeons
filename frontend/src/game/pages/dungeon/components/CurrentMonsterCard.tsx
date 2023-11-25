import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

import checkMark from "../../../../assets/images/hud/check.png";

const FRAME_WIDTH = 300;

const CheckMark = () => {
  return (
    <Sprite
      image={checkMark}
      position={[FRAME_WIDTH / 2, -20]}
      anchor={[0.5, 0]}
      width={40}
      height={40}
    />
  );
};

function CurrentMonsterCard({ dungeon, enemies }:any ) {
    const currentMonster = dungeon.currentMonster === 10 ? 9 : dungeon.currentMonster;
    const currentEnemy = enemies[currentMonster];

    if (!currentEnemy || currentEnemy.length === 0) return null;

    const MonsterInfo = () => {
        return (
          <Container position={[0, 300]}>
            <Graphics
              x={0}
              y={0}
              draw={(g) => {
                g.clear();
                g.beginFill(0x252525);
                g.drawRect(0, 0, FRAME_WIDTH, 40);
                g.endFill();
              }}
            />
            <Text
              text={`LEVEL ${currentEnemy.level}`}
              x={FRAME_WIDTH / 2}
              anchor={0.5}
              y={20}
              style={
                new TextStyle({
                  align: "center",
                  fontFamily: "MedievalSharp",
                  fontSize: 22,
                  fill: ["#ffffff"],
                })
              }
            />
            <Text
              text={currentEnemy.name}
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
    }

    const MonsterDescription = () => {
        return (
          <Text
            text={currentEnemy.description}
            y={390}
            x={10}
            style={
              new TextStyle({
                align: "left",
                fontFamily: "Almendra",
                fontSize: 18,
                fill: ["#ffffff"],
                wordWrap: true,
                wordWrapWidth: 280,
              })
            }
          />
        );
    }


    return (
      <Container position={[505, 220]}>
        <Sprite
          image={currentEnemy.avatar}
          position={[0, 0]}
          width={FRAME_WIDTH}
          height={FRAME_WIDTH}
        />
        <MonsterInfo />
        <MonsterDescription />
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.clear();
            g.lineStyle(3, 0x525252);
            g.drawRect(0, 0, FRAME_WIDTH, 500);
            g.endFill();
          }}
        />
        {(dungeon.currentMonster === 10) && <CheckMark />}
      </Container>
    );
}

export default CurrentMonsterCard;