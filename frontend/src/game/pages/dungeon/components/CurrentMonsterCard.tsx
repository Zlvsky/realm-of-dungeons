import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

const FRAME_WIDTH = 300;

function CurrentMonsterCard({ dungeon, enemies }:any ) {
    const currentMonster = enemies[dungeon.currentMonster];

    if (!currentMonster || currentMonster.length === 0) return null;

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
              text={`LEVEL ${currentMonster.level}`}
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
    }

    const MonsterDescription = () => {
        return (
          <Text
            text={currentMonster.description}
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
          image={currentMonster.avatar}
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
      </Container>
    );
}

export default CurrentMonsterCard;