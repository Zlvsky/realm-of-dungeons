import React, { useCallback } from "react";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";

function Hero() {
  const draw = useCallback((g: any) => {
    g.clear();
    g.beginFill(0xff3300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(0, 2);
    g.lineTo(0, 2);
    g.lineTo(0, 935);
    g.lineTo(1314, 935);
    g.lineTo(1314, 2);
    g.lineTo(0, 2);
    g.endFill();
  }, []);
  return (
      <Graphics draw={draw} />
    
  );
}

export default Hero;
