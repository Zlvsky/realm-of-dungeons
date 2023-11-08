import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { BlurFilter, TextStyle } from "pixi.js";

const FRAME_WIDTH = 250;

function NextMonsterCard({ dungeon }: any) {
  const currentMonster = dungeon.enemies[dungeon.currentMonster + 1];

  const blurFilter = new BlurFilter(15);

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
          text={`LEVEL ???`}
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
          text={"???"}
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

  if (!currentMonster) return null;

  return (
    <Container position={[854, 290]}>
      <Sprite
        image={currentMonster.avatar}
        position={[0, 0]}
        width={FRAME_WIDTH}
        height={FRAME_WIDTH}
        filters={[blurFilter]}
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
    </Container>
  );
}

export default NextMonsterCard;
