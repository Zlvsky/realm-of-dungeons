import { Container, Sprite, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface ISingleStat {
  position: [number, number];
  stat: "DEFENSE" | "LUCK";
  level: number;
  icon: string;
}

const DynamicStat = ({ position, stat, level, icon }: ISingleStat) => {
  return (
    <Container position={position}>
      <Sprite image={icon} width={55} height={55} x={0} y={0} />
      <Container position={[70, 0]}>
        <Text
          text={`${stat.toUpperCase()}`}
          x={0}
          y={0}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              letterSpacing: 1,
              fontSize: 24,
              fill: ["#898989"],
            })
          }
        />
        <Text
          text={level.toString()}
          x={0}
          y={30}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 24,
              fill: ["#D1D1D1"],
            })
          }
        />
      </Container>
    </Container>
  );
};

export default DynamicStat;