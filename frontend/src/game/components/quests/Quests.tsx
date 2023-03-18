import React, { useCallback, useRef, useEffect } from "react";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";
import QuestsBg from "../../.././assets/images/game-world/quests.png";
import { TextStyle } from "pixi.js";


function Quests() {
  const graph = useRef<any>(null);
  const questFrame = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x29221c, 0.9);
    g.lineStyle(4, 0x29221c, 1);
    g.moveTo(250, 50);
    g.lineTo(250, 50);
    g.lineTo(1065, 50);
    g.lineTo(1065, 900);
    g.lineTo(250, 900);
    g.lineTo(250, 50);
    g.endFill();
  }, []);

  return (
    <Container position={[0, 2]}>
      <Sprite image={QuestsBg} width={1316} height={935} />
      <Graphics draw={questFrame} zIndex={0} />
      <Text
        x={400}
        y={72}
        text={"AVAILABLE QUESTS"}
        style={
          new TextStyle({
            align: "center",
            // fontFamily: "sans-serif",
            fontSize: 56,
            fill: ["#C02E07"], // gradient
            // stroke: "#96663E",
            // strokeThickness: 0,
            // letterSpacing: 0,
            dropShadow: true,
            // wordWrap: true,
            // wordWrapWidth: 440,
          })
        }
      />
    </Container>
  );

  // return <Graphics draw={draw} ref={graph} />;
}

export default Quests;
