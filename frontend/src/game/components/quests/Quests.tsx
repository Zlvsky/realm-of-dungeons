import React, { useCallback } from "react";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";

function Quests({ scale }: any) {
  const draw = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x223300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(0, 10);
    g.lineTo(0, 10);
    g.lineTo(0, 935);
    g.lineTo(1400, 935);
    g.lineTo(1510, 10);
    g.endFill();
  }, []);
  return (
      <Graphics draw={draw} />
  );
}

export default Quests;
