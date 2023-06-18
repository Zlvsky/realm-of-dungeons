import { Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface ISingleStat {
  position: [number, number];
  stat: string;
}
function BattleStats({ statistics, position }: any) {
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

  return (
    <Container position={position}>
      <SingleStat position={[0, 0]} stat={"strength"} />
      <SingleStat position={[140, 0]} stat={"condition"} />
      <SingleStat position={[260, 0]} stat={"dexterity"} />
      <SingleStat position={[0, 80]} stat={"intelligence"} />
      <SingleStat position={[140, 80]} stat={"wisdom"} />
      <SingleStat position={[260, 80]} stat={"charisma"} />
    </Container>
  );
}

export default BattleStats;