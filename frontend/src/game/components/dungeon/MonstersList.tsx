import { Container, Graphics, Sprite } from "@pixi/react";
import { BlurFilter } from "pixi.js";


import checkMark from "../../../assets/images/hud/check.png";

const positions = [
  {
    x: 0,
    y: 0,
  },
  {
    x: 0,
    y: 100,
  },
  {
    x: 0,
    y: 200,
  },
  {
    x: 0,
    y: 300,
  },
  {
    x: 0,
    y: 400,
  },
  {
    x: 100,
    y: 0,
  },
  {
    x: 100,
    y: 100,
  },
  {
    x: 100,
    y: 200,
  },
  {
    x: 100,
    y: 300,
  },
  {
    x: 100,
    y: 400,
  },
];

const CheckMark = ({ index, currentMonster }: any) => {
    if (currentMonster <= index) return null;

    return (
      <Sprite
        image={checkMark}
        position={[70 / 2, -15]}
        anchor={[0.5, 0]}
        width={30}
        height={30}
      />
    );
}

const MonsterFrame = ({ monster, index, currentMonster }: any) => {
  const blurFilter = new BlurFilter(6);
  const blur = currentMonster < index ? [blurFilter] : null
  const framePosition = positions[index];

  return (
    <Container position={[framePosition.x, framePosition.y]}>
      <Sprite
        image={monster.avatar}
        position={[0, 0]}
        width={70}
        height={70}
        filters={blur}
      />
      <Graphics
        x={0}
        y={0}
        draw={(g) => {
          g.clear();
          g.lineStyle(3, 0x525252);
          g.drawRect(0, 0, 70, 70);
          g.endFill();
        }}
      />
      <CheckMark index={index} currentMonster={currentMonster} />
    </Container>
  );
};

function MonstersList({ dungeon, enemies }: any) {
  return (
    <Container position={[0, 200]}>
      {enemies?.map((monster: any, index: number) => {
        return (
          <MonsterFrame
            monster={monster}
            index={index}
            currentMonster={dungeon.currentMonster}
            key={index}
          />
        );
      })}
    </Container>
  );
}

export default MonstersList;
