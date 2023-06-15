import { Container, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";

interface ISingleStat {
  position: [number, number];
  stat: string;
  col: number;
}
function BattleStats({ statistics, position }: any) {
  const SingleStat = ({ position, stat, col }: ISingleStat) => {
    return (
      <Container position={position}>
        <Text
          text={`${stat.toUpperCase()}`}
          x={0}
          y={0}
          style={
            new TextStyle({
              align: "center",
              fontFamily: "sans-serif",
              fontWeight: "200",
              fontSize: 16,
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
              fontFamily: "sans-serif",
              fontWeight: "200",
              fontSize: 16,
              fill: ["#D1D1D1"],
            })
          }
        />
      </Container>
    );
  };

  return (
    <Container position={position}>
      <SingleStat position={[0, 0]} stat={"strength"} col={1} />
      <SingleStat position={[140, 0]} stat={"condition"} col={2} />
      <SingleStat position={[260, 0]} stat={"dexterity"} col={1} />
      <SingleStat position={[0, 80]} stat={"intelligence"} col={1} />
      <SingleStat position={[140, 80]} stat={"wisdom"} col={2} />
      <SingleStat position={[260, 80]} stat={"charisma"} col={2} />
    </Container>
  );
}

export default BattleStats;
