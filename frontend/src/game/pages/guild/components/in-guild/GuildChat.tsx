import { Container, Graphics } from "@pixi/react";
import { useCallback } from "react";
import { GuildProp } from "../../../../../interfaces/GuildInterface";

const rectWidth = 1260;
const rectHeight = 250;

function GuildChat({ guild }: GuildProp) {
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
    <Container position={[50, 670]}>
      <Graphics draw={createFrame} />
    </Container>
  );
}

export default GuildChat;
