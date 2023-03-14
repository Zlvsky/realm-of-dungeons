import React, { useCallback } from "react";
import { Stage, Container, Sprite, Text, Graphics } from "@pixi/react";

function Hero({ scale }: any) {
  const draw = useCallback((g: any) => {
    g.clear();
    g.beginFill(0xff3300);
    g.lineStyle(4, 0xffd900, 1);
    g.moveTo(0, 0);
    g.lineTo(0, 0);
    g.lineTo(0, 935);
    g.lineTo(1510, 935);
    g.lineTo(1515, 0);
    g.endFill();
  }, []);
  return (
      <Graphics draw={draw} />
    
  );
}

export default Hero;
