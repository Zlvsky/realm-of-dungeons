import { Container, Graphics, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface IHeroSingleStat {
    position: [number, number];
    icon: string;
    level: number;
    stat: "MELEE" | "DISTANCE" | "MAGIC" | "RESISTANCE" | string;
    progress: any;
}

function ProgressStat({ position, icon, level, stat, progress }: IHeroSingleStat) {
  const levelPercentage =
    (progress.experience - progress.previousLevelExperience) /
    (progress.levelExperience - progress.previousLevelExperience);

  return (
    <Container position={position}>
      <Sprite image={icon} width={55} height={55} x={0} y={0} />
      <Container position={[70, 0]}>
        <Text
          text={stat}
          x={0}
          y={0}
          style={
            new TextStyle({
              align: "left",
              fontFamily: "MedievalSharp",
              fontSize: 24,
              fill: ["#898989"],
            })
          }
        />
        <Text
          text={level.toString()}
          x={420}
          y={0}
          anchor={[1,0]}
          style={
            new TextStyle({
              align: "right",
              fontFamily: "MedievalSharp",
              fontSize: 24,
              fill: ["#D1D1D1"],
            })
          }
        />
      </Container>
      <Container position={[70, 40]}>
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.clear();
            g.lineStyle(2, 0x1b1b1b);
            g.drawRect(0, 0, 420, 12);
            g.endFill();
          }}
        />
        <Graphics
          x={0}
          y={0}
          draw={(g) => {
            g.clear();
            g.beginFill(0x933824);
            g.drawRect(0, 0, 250 * levelPercentage, 12);
            g.endFill();
          }}
        />
      </Container>
    </Container>
  );
}

export default ProgressStat;