import React, { useCallback } from "react";
import { Stage, Container, Sprite, Text, Graphics, TilingSprite } from "@pixi/react";
import BgPattern from "../../../assets/images/dark_wall.png" 
import HeroEquipment from "./components/HeroEquipment";

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
    <Container position={[0, 2]}>
      <TilingSprite
        image={BgPattern}
        width={1315}
        height={935}
        tilePosition={{ x: 0, y: 0 }}
      />
      <HeroEquipment />
    </Container>
  );
}

export default Hero;
