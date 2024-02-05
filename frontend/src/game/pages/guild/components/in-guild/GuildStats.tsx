import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useCallback } from "react";
import { GuildProp } from "../../../../../interfaces/GuildInterface";

const rectWidth = 350;
const rectHeight = 500;

const HeaderStyle = new TextStyle({
  align: "center",
  fontFamily: "Almendra",
  fontSize: 26,
  letterSpacing: 1,
  fill: ["#ffffff"],
});

const textStyle = new TextStyle({
  align: "center",
  fontFamily: "Almendra",
  fontSize: 26,
  letterSpacing: 1,
  fill: ["#bcbcbc"],
});

function GuildStats({ guild }: GuildProp) {
  const createFrame = useCallback((g: any) => {
    g.clear();

    g.beginFill(0x2c2c2c, 0.3);
    g.lineStyle(1, 0x656565, 1);

    g.moveTo(0, 0);
    g.lineTo(rectWidth, 0);
    g.lineTo(rectWidth, rectHeight);
    g.lineTo(0, rectHeight);
    g.lineTo(0, 0);

    g.endFill();
  }, []);

  return (
    <Container position={[50, 100]}>
      <Graphics draw={createFrame} />
      <Text text={"Guild Level"} x={30} y={30} style={HeaderStyle} />
      <Text
        text={guild.statistics.level.toString()}
        x={30}
        y={60}
        style={textStyle}
      />
      <Text text={"Treasury Level"} x={30} y={120} style={HeaderStyle} />
      <Text
        text={guild.statistics.goldLevel.toString()}
        x={30}
        y={150}
        style={textStyle}
      />
      <Text text={"Library Level"} x={30} y={210} style={HeaderStyle} />
      <Text
        text={guild.statistics.xpLevel.toString()}
        x={30}
        y={240}
        style={textStyle}
      />
    </Container>
  );
}

export default GuildStats;