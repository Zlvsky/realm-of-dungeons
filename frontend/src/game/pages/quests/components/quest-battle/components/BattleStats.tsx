import { Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface ISingleStat {
  position: [number, number];
  stat: string;
}
function BattleStats({ statistics, armor, position }: any) {
  const SingleStat = ({ position, stat }: ISingleStat) => {
    return (
      <Container position={position}>
        <Text
          text={`${stat.toUpperCase()}`}
          x={0}
          y={0}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              letterSpacing: 1,
              fontSize: 17,
              fill: ["#898989"],
            })
          }
        />
        <Text
          text={statistics[stat]}
          x={0}
          y={30}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 18,
              fill: ["#D1D1D1"],
            })
          }
        />
      </Container>
    );
  };

  const ArmorStat = ({ position }: any) => {
    if (!armor) return null;
    return (
      <Container position={position}>
        <Text
          text={`ARMOR`}
          x={0}
          y={0}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              letterSpacing: 1,
              fontSize: 17,
              fill: ["#898989"],
            })
          }
        />
        <Text
          text={armor}
          x={0}
          y={30}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "MedievalSharp",
              fontSize: 18,
              fill: ["#D1D1D1"],
            })
          }
        />
      </Container>
    );
  };

  return (
    <Container position={position}>
      <SingleStat position={[0, 0]} stat={"melee"} />
      <SingleStat position={[120, 0]} stat={"distance"} />
      <SingleStat position={[260, 0]} stat={"magic"} />
      <SingleStat position={[0, 80]} stat={"luck"} />
      <SingleStat position={[120, 80]} stat={"resistance"} />
      <ArmorStat position={[260, 80]} />
    </Container>
  );
}

export default BattleStats;
