import { Container, Graphics, Sprite } from "@pixi/react";
import { BlurFilter } from "pixi.js";


import checkMark from "../../../../assets/images/hud/check.png";


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
  return (
    <Container position={[100 * index, 0]}>
      <Sprite
        image={monster.img}
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

function MonstersList({ dungeons }: any) {
  return (
    <Container position={[170, 100]}>
      {dungeons.monsters.map((monster: any, index: number) => {
        return (
          <MonsterFrame
            monster={monster}
            index={index}
            currentMonster={dungeons.currentMonster}
            key={index}
          />
        );
      })}
    </Container>
  );
}

export default MonstersList;
