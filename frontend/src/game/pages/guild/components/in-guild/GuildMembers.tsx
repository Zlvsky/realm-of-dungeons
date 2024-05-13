import { Container, Graphics, Text } from "@pixi/react";
import { TextStyle } from "pixi.js";
import { useCallback } from "react";
import { GuildProp } from "../../../../../interfaces/GuildInterface";

const rectWidth = 370;
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

const getMemberText = () => {
  
}

function GuildMembers({ guild }: GuildProp) {
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
    <Container position={[940, 100]}>
      <Graphics draw={createFrame} />
      <Text
        text={"Members"}
        x={rectWidth / 2}
        y={30}
        anchor={[0.5, 0]}
        style={HeaderStyle}
      />
      {guild.members.map((member) => {
        return (
          <Container>
            
          </Container>
        )
      })}
    </Container>
  );
}

export default GuildMembers;
