import React, { useCallback, useRef, useEffect } from "react";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";

function Quests() {
  const graph = useRef<any>(null);
  const draw = useCallback((g: any) => {
    g.clear();
    g.beginFill(0x223300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(0, 2);
    g.lineTo(0, 2);
    g.lineTo(0, 935);
    g.lineTo(1314, 935);
    g.lineTo(1314, 2);
    g.lineTo(0, 2);
    g.endFill();
  }, []);

  return <Graphics draw={draw} ref={graph} />;
}

export default Quests;
